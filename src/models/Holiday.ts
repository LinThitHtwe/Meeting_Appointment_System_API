import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../../config/db";

export type HolidayAttributes = InferAttributes<Holiday>;
export type HolidayCreationAttribute = InferCreationAttributes<Holiday>;

class Holiday extends Model<HolidayAttributes, HolidayCreationAttribute> {
  declare id?: number;
  declare date: Date;
  declare isDeleted?: boolean;
}
Holiday.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    date: { type: DataTypes.DATE, allowNull: false, unique: true },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "holiday",
    tableName: "holiday",
    timestamps: true,
    paranoid: true,
    underscored: true,
  }
);

export default Holiday;
