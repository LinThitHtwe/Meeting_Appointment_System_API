import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../../config/db";
import Department from "./Department";

export type RoomAttributes = InferAttributes<Room>;
export type RoomCreationAttribute = InferCreationAttributes<Room>;

class Room extends Model<RoomAttributes, RoomCreationAttribute> {
  declare id: number;
  declare name: string;
  declare departmentId: number;
  declare deletedAt: string | object;
}
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
    modelName: "room",
    tableName: "room",
    timestamps: true,
    paranoid: true,
    underscored: true,
  }
);
Room.belongsTo(Department, { foreignKey: "department_id" });
Department.hasMany(Room, { foreignKey: "department_id" });

export default Room;
