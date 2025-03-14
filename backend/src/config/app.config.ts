//


const appConfig = {
    port: process.env.PORT || 3000,
    node_env: process.env.NODE_ENV || 'development',
    client_origin: process.env.CLIENT_ORIGIN || 'http://localhost:5174/',
    jwtSecretKey: process.env.JWT_SECRET_KEY || '647159a87bcde6dbeb83c29531ee14380e669f8bcf8ad7bef469bd54797202f1e0eb58d7b39c1872caebd764282d1d5ae672adafa115bdc335159ab3f76ae367',
    jwtExpiryInterval: process.env.JWT_EXPIRY_INTERVAL || 12  // in hr
}

export default appConfig;