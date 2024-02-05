import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../../config/db";
import Account from "./Account";
import Room from "./Room";

export type AppointmentAttributes = InferAttributes<Appointment>;
export type AppointmentCreationAttribute = InferCreationAttributes<Appointment>;

class Appointment extends Model<
  AppointmentAttributes,
  AppointmentCreationAttribute
> {
  declare id: number;
  declare date: string | object;
  declare startTime: string | object;
  declare endTime: string | object;
  declare description: string;
  declare accountId: number;
  declare roomId: number;
  declare deletedAt: string | object;
}
Appointment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accountId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "account",
        key: "id",
      },
    },
    roomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "room",
        key: "id",
      },
    },
    deletedAt: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "appointment",
    tableName: "appointment",
    timestamps: true,
    paranoid: true,
    underscored: true,
  }
);
Appointment.belongsTo(Account, { foreignKey: "account_id" });
Account.hasMany(Appointment, { foreignKey: "account_id" });
Appointment.belongsTo(Room, { foreignKey: "room_id" });
Room.hasMany(Appointment, { foreignKey: "room_id" });

export default Appointment;
