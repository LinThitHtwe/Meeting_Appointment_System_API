import dotenv from "dotenv";

dotenv.config();

module.exports = {
  development: {
    username: "postgres",
    password: process.env.DB_PASSWORD,
    database: "ace_meeting_room_appointment_system",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  test: {},
  production: {},
};
