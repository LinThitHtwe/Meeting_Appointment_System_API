import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../../config/db";

export type WorkingHoursAttributes = InferAttributes<WorkingHours>;
export type WorkingHoursCreationAttribute =
  InferCreationAttributes<WorkingHours>;

class WorkingHours extends Model<
  WorkingHoursAttributes,
  WorkingHoursCreationAttribute
> {
  declare id?: number;
  declare startTime: string;
  declare endTime: string;
  declare isDeleted?: boolean;
  declare isActive: boolean;
}
WorkingHours.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "workingHours",
    tableName: "workingHours",
    timestamps: true,
    paranoid: true,
    underscored: true,
  }
);

export default WorkingHours;
