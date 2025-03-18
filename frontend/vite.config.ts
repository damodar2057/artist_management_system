import { defineConfig } from 'vite'
import { resolve } from 'path'


export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                login: resolve(__dirname, 'src/pages/login.html'),
                register: resolve(__dirname, 'src/pages/register.html'),
                dashboard: resolve(__dirname, 'src/pages/dashboard.html'),
            }

        },
    },
    server: {
        allowedHosts: ['test.supertruck.ai']
    }
})