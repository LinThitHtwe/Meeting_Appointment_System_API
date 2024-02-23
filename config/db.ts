import { Options, Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID, NODE_ENV } = process.env;

const isProduction = NODE_ENV === "production";

const developmentConfig: Options = {
  dialect: "postgres",
  host: "localhost",
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  sync: { alter: true },
};

const productionConfig: Options = {
  dialect: "postgres",
  host: PGHOST || "",
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
    connection: {
      options: `project=${ENDPOINT_ID}`,
    },
  },
  sync: { alter: true },
};

const sequelize = new Sequelize(
  isProduction ? PGDATABASE || "" : "ace_meeting_room_appointment_system",
  isProduction ? PGUSER || "" : "postgres",
  isProduction ? PGPASSWORD : process.env.DB_PASSWORD,
  isProduction ? productionConfig : developmentConfig
);

export { sequelize };

export const testDbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Db Connected");
  } catch (error) {
    console.error("Unable to connect--", error);
  }
};
