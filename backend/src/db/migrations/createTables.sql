-- Users table creation
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(500) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    dob TIMESTAMP NOT NULL,
    gender CHAR(1) CHECK (gender IN ('m','f','o')),
    role VARCHAR(20) CHECK (role IN ('super_admin', 'artist_manager', 'artist')),
    address VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NULL
);

-- Artist table creation
CREATE TABLE artists (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    dob TIMESTAMP NOT NULL,
    gender CHAR(1) CHECK (gender IN ('m','f','o')),
    address VARCHAR(255) NOT NULL,
    first_release_year YEAR,
    no_of_albums_released INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Music table creation 
CREATE TABLE music (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    album_name VARCHAR(255) NOT NULL,
    genre VARCHAR(20) CHECK (genre IN ('mb', 'country', 'classic', 'rock', 'jazz')),
    artist_id INT REFERENCES artists(id) ON DELETE CASCADE,  
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
