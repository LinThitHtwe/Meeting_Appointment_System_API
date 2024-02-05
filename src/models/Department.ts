import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/db";
class Department extends Model {}
Department.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    modelName: "department",
    tableName: "department",
    timestamps: true,
  }
);

export default Department;
