import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/db";
class Department extends Model {}
Department.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    deletedAt: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "department",
    tableName: "department",
    timestamps: true,
    paranoid: true,
    underscored: true,
  }
);

export default Department;
