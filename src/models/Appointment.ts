import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { sequelize } from "../../config/db";
import Account from "./Admin";
import Room from "./Room";
import Department from "./Department";

export type AppointmentAttributes = InferAttributes<Appointment>;
export type AppointmentCreationAttribute = InferCreationAttributes<Appointment>;

class Appointment extends Model<AppointmentAttributes, AppointmentCreationAttribute> {
  declare id?: number;
  declare date: string | object;
  declare startTime: string | object;
  declare endTime: string | object;
  declare description: string;
  declare staffId: number;
  declare departmentId: number;
  declare isDeleted?: boolean;
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
    departmentId: {
      // Define departmentId field
      type: DataTypes.INTEGER,
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
// Appointment.belongsTo(Account, { foreignKey: "account_id" });
Appointment.belongsTo(Department, {
  foreignKey: "departmentId", // Set the foreign key
  constraints: true,
  onDelete: "CASCADE",
});

// Account.hasMany(Appointment, { foreignKey: "account_id" });
// Appointment.belongsTo(Room, { foreignKey: "room_id" });
// Room.hasMany(Appointment, { foreignKey: "room_id" });

export default Appointment;
