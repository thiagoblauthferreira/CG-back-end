import { DataSource, DataSourceOptions } from "typeorm";
import { User } from "src/modules/auth/entities/auth.enity";
import { Address } from "src/modules/auth/entities/adress.enity";
import { EnvConfig } from "src/config";
import { Shelter } from "src/modules/shelter/entities/shelter.entity";
import { Management } from "src/modules/management/entities/management.entity";
import { NeedItem } from "src/modules/need/entities/needItems.entity";
import { NeedVolunteers } from "src/modules/need/entities/needVolunteers.entity";
import { Schedule } from "src/modules/schedule/schedule.module";

export const dataSourceConfig = (): DataSourceOptions => {
  return {
    type: "postgres",
          host: EnvConfig.database.HOST_DB,
          port: EnvConfig.database.PORT_DB,
          username: EnvConfig.database.USER_DB,
          password: EnvConfig.database.PASSWORD_DB,
          database: EnvConfig.database.NAME_DB,
          synchronize: true,
          ssl: false,/*{
            rejectUnauthorized: false, 
          },*/
        
    entities: [
      User,
      Address, 
      Management,
      NeedItem,
      NeedVolunteers,
      Shelter,
      Schedule
    ],
  };
};

const datasource = new DataSource(dataSourceConfig());

export default datasource;
