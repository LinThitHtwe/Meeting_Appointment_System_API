import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { sequelize } from "../../config/db";
import Account from "./Admin";
import Room from "./Room";
import Department from "./Department";

export type AppointmentAttributes = InferAttributes<Appointment>;
export type AppointmentCreationAttribute = InferCreationAttributes<Appointment>;

class Appointment extends Model<AppointmentAttributes, AppointmentCreationAttribute> {
  declare id?: number;
  declare date: Date;
  declare startTime: string;
  declare endTime: string;
  declare description: string;
  declare staffId: number;
  declare isDeleted?: boolean;
  declare code: string;
  declare roomId: number;
  declare departmentId: number;
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
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    staffId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    roomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    departmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
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

Appointment.belongsTo(Room, { foreignKey: "roomId" });
Room.hasMany(Appointment);
Appointment.belongsTo(Department, { foreignKey: "departmentId" });
Department.hasMany(Appointment);

export default Appointment;
