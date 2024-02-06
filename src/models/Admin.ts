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
  declare id?: number;
  declare username: string;
  declare password: string;
  declare isDeleted?: boolean;
}
Account.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isDeleted: {
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
// Account.belongsTo(Department, { foreignKey: "department_id" });
// Department.hasMany(Account, { foreignKey: "department_id" });

export default Account;
