import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../../config/db";
import Department from "./Department";

export type AccountAttributes = InferAttributes<Account>;
export type AccountCreationAttribute = InferCreationAttributes<Account>;

class Account extends Model<AccountAttributes, AccountCreationAttribute> {
  declare id: number;
  declare staffId: number;
  declare name: string;
  declare departmentId: number;
  declare deletedAt: string | object;
}
Account.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    staffId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isFourDigit(value: number) {
          if (value && (value < 1000 || value > 9999)) {
            throw new Error("staffId must be a 4-digit number");
          }
        },
      },
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
