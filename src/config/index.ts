import "dotenv/config";

export const EnvConfig = {
    database: {
        HOST_DB: process.env.HOST_DB,
        PORT_DB: +process.env.PORT_DB,
        USER_DB: process.env.USER_DB,
        PASSWORD_DB: process.env.PASSWORD_DB,
        NAME_DB: process.env.NAME_DB,
        URL: process.env.URL_DATABASE,        
    },
    OPENCAGE: {
        API_KEY: process.env.OPENCAGE_API_KEY
    }, 
    S3: {
        REGION: process.env.REGION,
        ACCESS_KEY_ID: process.env.ACCESSKEYID,
        SECRET_ACCESS_KEY: process.env.SECRETCCESSKEY,
        BUCKET: process.env.BUCKET,
        ACL: process.env.ACL
    },
    JWT_SECRET:{
        JWT_SECRET: process.env.JWT_SECRET
    },
    ENV: process.env.NODE_ENV,
}