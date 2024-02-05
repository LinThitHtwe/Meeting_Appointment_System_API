import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(
  "ace_meeting_room_appointment_system",
  "postgres",
  process.env.DB_PASSWORD,
  {
    dialect: "postgres",
    host: "localhost",
    port: 6000,
    // dialectOptions: {
    //   ssl: {
    //     require: true,
    //     rejectUnauthorized: false,
    //   },
    // },
    sync: { alter: true },
  }
);

sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Tables created!");
  })
  .catch((err) => {
    console.error("Error creating tables:", err);
  });

export const testDbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Db Connnected");
  } catch (error) {
    console.error("Unable to connect--", error);
  }
};
