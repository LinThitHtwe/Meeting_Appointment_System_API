import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

// export const sequelize = new Sequelize(
//   "ace_meeting_room_appointment_system",
//   "postgres",
//   process.env.DB_PASSWORD,
//   {
//     dialect: "postgres",
//     host: "localhost",
//     port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
//     dialectOptions: {
//       ssl: {
//         require: true,
//         rejectUnauthorized: false,
//       },
//     },
//     sync: { alter: true },
//   }
// );

export const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
  dialect: "postgres",
  host: PGHOST,
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
});

// const sql = postgres({
//   host: PGHOST,
//   database: PGDATABASE,
//   username: PGUSER,
//   password: PGPASSWORD,
//   port: 5432,
//   ssl: 'require',
//   connection: {
//     options: `project=${ENDPOINT_ID}`,
//   },
// });

export const testDbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Db Connnected");
  } catch (error) {
    console.error("Unable to connect--", error);
  }
};
