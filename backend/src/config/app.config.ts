//


const appConfig = {
    port: process.env.PORT || 4212,
    node_env: process.env.NODE_ENV || 'development',
    client_origin: process.env.CLIENT_ORIGIN || 'http://localhost:4211/',
    jwtSecretKey: process.env.JWT_SECRET_KEY || '1111',
    jwtExpiryInterval: process.env.JWT_EXPIRY_INTERVAL || 22000  // in hr
}

export default appConfig;