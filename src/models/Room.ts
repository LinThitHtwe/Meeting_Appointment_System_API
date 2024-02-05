import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/db";
import Department from "./Department";
class Room extends Model {}
Room.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    department_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "department",
        key: "id",
      },
    },
  },
  { sequelize, modelName: "room", tableName: "room", timestamps: true }
);
Room.belongsTo(Department, { foreignKey: "department_id" });
Department.hasMany(Room, { foreignKey: "department_id" });

export default Room;
