import { DataSource, DataSourceOptions } from "typeorm";
import { User } from "src/modules/auth/entities/auth.enity";
import { Address } from "src/modules/auth/entities/adress.enity";
import { EnvConfig } from "src/config";
import { Partner } from "src/modules/partner/entities/partner.entity";
import { FileEntity } from "src/modules/partner/entities/file.entity"

export const dataSourceConfig = (): DataSourceOptions => {
  return {
    type: "postgres",
    ...(EnvConfig.ENV === "production"
      ? {
          url: EnvConfig.database.URL,
          synchronize: false,
          ssl: {
            rejectUnauthorized: false, 
          },
        }
      : {
          host: EnvConfig.database.HOST_DB,
          port: +EnvConfig.database.PORT_DB,
          username: EnvConfig.database.USER_DB,
          password: EnvConfig.database.PASSWORD_DB,
          database: EnvConfig.database.NAME_DB,
          synchronize: true,
          ssl: false
        /*  ssl: {
            rejectUnauthorized: false, 
          },*/
        }),
    entities: [
      User,
      Address,
      Partner,
      FileEntity
    ],
  };
};

const datasource = new DataSource(dataSourceConfig());

export default datasource;
