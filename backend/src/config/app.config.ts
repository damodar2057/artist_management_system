//


const appConfig = {
    port: process.env.PORT || 3000,
    node_env: process.env.NODE_ENV || 'development',
    client_origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000'
}

export default appConfig;