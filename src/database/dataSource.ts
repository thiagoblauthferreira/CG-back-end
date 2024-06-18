import { DataSource, DataSourceOptions } from "typeorm";
import { User } from "src/modules/auth/entities/auth.enity";
import { Address } from "src/modules/auth/entities/adress.enity";
import { Shelter } from "src/modules/shelter/entities/shelter.entity";
import { NeedItem } from "src/modules/need/entities/needItems.entity";
import { NeedVolunteers } from "src/modules/need/entities/needVolunteers.entity";
import { EnvConfig } from "src/config";


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
          ssl: false,
          ssl: {
            rejectUnauthorized: false, 
          },
        }),
    entities: [
      User,
      Address,
      Shelter,
      NeedItem,
      NeedVolunteers
    ],
  };
};

const datasource = new DataSource(dataSourceConfig());

export default datasource;
