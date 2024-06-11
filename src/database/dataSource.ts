import { DataSource, DataSourceOptions } from "typeorm";
import { User } from "src/modules/auth/entities/auth.enity";
import { Address } from "src/modules/auth/entities/adress.enity";
import { EnvConfig } from "src/config";
import { Shelter } from "src/modules/shelter/entities/shelter.entity";
import { Company } from "src/modules/company/entities/company.entity";
import { FileEntity } from "src/modules/company/entities/file.entity";

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
          port: EnvConfig.database.PORT_DB,
          username: EnvConfig.database.USER_DB,
          password: EnvConfig.database.PASSWORD_DB,
          database: EnvConfig.database.NAME_DB,
          synchronize: true,
          ssl: {
            rejectUnauthorized: false, 
          },
        }),
    entities: [
      User,
      Address,
      Company,
      FileEntity,
      Shelter
    ],
  };
};

const datasource = new DataSource(dataSourceConfig());

export default datasource;
