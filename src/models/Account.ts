import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/db";
import Department from "./Department";
class Account extends Model {}
Account.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    staff_id: {
      type: DataTypes.CHAR(4),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    departmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "department",
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
    modelName: "account",
    tableName: "account",
    timestamps: true,
    paranoid: true,
    underscored: true,
  }
);
Account.belongsTo(Department, { foreignKey: "department_id" });
Department.hasMany(Account, { foreignKey: "department_id" });

export default Account;
