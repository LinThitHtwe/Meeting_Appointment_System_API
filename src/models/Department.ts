import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../../config/db";

export type DepartmentAttributes = InferAttributes<Department>;
export type DepartmentCreationAttribute = InferCreationAttributes<Department>;

class Department extends Model<
  DepartmentAttributes,
  DepartmentCreationAttribute
> {
  declare id?: number;
  declare name: string;
  declare deletedAt?: string | object;
}
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
