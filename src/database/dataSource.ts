import "dotenv/config";
import { DataSource, DataSourceOptions } from "typeorm";
import { User } from "src/modules/auth/entities/auth.enity";
import { Address } from "src/modules/auth/entities/adress.enity";
const env = String(process.env.ENV);

export const dataSourceConfig = (): DataSourceOptions => {
  return {
    type: "postgres",
    ...(env === "production"
      ? {
          url: process.env.DATABASE_URL,
          synchronize: false,
          ssl: {
            rejectUnauthorized: false, 
          },
        }
      : {
          host: process.env.HOST_DB,
          port: +process.env.PORT_DB,
          username: process.env.USER_DB,
          password: process.env.PASSWORD_DB,
          database: process.env.NAME_DB,
          synchronize: true,
          ssl: {
            rejectUnauthorized: false, 
          },
        }),
    entities: [
      User,
      Address
    ],
  };
};

const datasource = new DataSource(dataSourceConfig());

export default datasource;
