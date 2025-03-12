// backend/src/db/migration.ts

import migrationQueries from './queries/migrations.query';
import * as path from 'path';
import * as fs from 'fs';
import { DBTables } from 'src/common/constants/db-tables.enum';
import logger from 'src/common/logger/logger';
import db from 'src/db/index'

async function runMigrations(): Promise<void> {
    try {
        const pool = db.getInstance().getPool()
        // Check if the 'migrations' table exists
        const checkTableQuery = `
                SELECT to_regclass('public.migrations') AS table_exists;
            `;

        const checkTableResult = await pool.query(checkTableQuery);

        // If the table does not exist, create it
        if (!checkTableResult.rows[0].table_exists) {
            await pool.query(migrationQueries.createTable);
            logger.info("Migrations table created.");
        }

        // Get the list of all migration files
        const migrationsDir = path.join(__dirname, "migrations");
        const migrationFiles = fs.readdirSync(migrationsDir)
            .filter(file => file.endsWith('.sql'))
            .sort(); // Ensure migrations run in order

        // Fetch applied migrations
        const result = await pool.query(migrationQueries.findAll);
        const appliedMigrations = new Set(result.rows.map(row => row.name));

        // Check for pending migrations
        const pendingMigrations = migrationFiles.filter(file => !appliedMigrations.has(file));

        if (pendingMigrations.length === 0) {
            logger.info('No pending migrations to apply');
            process.exit(0)
        }

        logger.info(`Found ${pendingMigrations.length} pending migrations`);

        // Run pending migrations in a transaction
        const client = await pool.connect();

        try {
            await client.query('BEGIN');

            for (const file of pendingMigrations) {
                const migrationSQL = fs.readFileSync(path.join(migrationsDir, file), 'utf-8');

                await client.query(migrationSQL);
                await client.query(`INSERT INTO ${DBTables.MIGRATIONS} (name) VALUES ($1)`, [file]);

                logger.info(`Applied migration: ${file}`);
            }

            await client.query('COMMIT');
            logger.info('Migrations completed successfully!');
        } catch (error) {
            await client.query('ROLLBACK');
            logger.error('Migration failed, rolling back:', error);
            throw error;
        } finally {
            client.release();
        }
    } catch (error) {
        logger.error("Migration system failed:", error);
        throw error;
    }
}

runMigrations()