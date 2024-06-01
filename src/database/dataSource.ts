import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from 'src/modules/auth/entities/auth.enity';
import { Address } from 'src/modules/auth/entities/adress.enity';
import { Shelter } from 'src/modules/shelter/entities/shelter.entity';
const env = String(process.env.ENV);

export const dataSourceConfig = (): DataSourceOptions => {
  return {
    type: 'postgres',
    ...(env === 'production'
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
          ssl: false,
        }),
    entities: [User, Address, Shelter],
  };
};

const datasource = new DataSource(dataSourceConfig());

export default datasource;
