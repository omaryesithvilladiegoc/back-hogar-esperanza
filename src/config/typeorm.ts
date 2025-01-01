import {registerAs} from "@nestjs/config"
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME, INTERNAL_URL_DATABASE } from "src/helpers/enviroment"
import {DataSourceOptions,DataSource} from "typeorm"

const config: DataSourceOptions = {
    type: 'postgres',
    url:INTERNAL_URL_DATABASE,
    // database: DB_NAME,
    // host: DB_HOST, 
    // port: Number(DB_PORT),
    // username: DB_USERNAME,
    // password: String(DB_PASSWORD),
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/*{.ts,.js}'],
    logging: true,
    synchronize: true,
    dropSchema: false
}

export default registerAs('typeorm', () => config);

export const connectionSource = new DataSource(config);