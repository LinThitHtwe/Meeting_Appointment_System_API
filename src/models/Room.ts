import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../../config/db";

export type RoomAttributes = InferAttributes<Room>;
export type RoomCreationAttribute = InferCreationAttributes<Room>;

class Room extends Model<RoomAttributes, RoomCreationAttribute> {
  declare id?: number;
  declare name: string;
  declare description: string;
  declare isDeleted?: boolean;
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
    description: {
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
    modelName: "room",
    tableName: "room",
    timestamps: true,
    paranoid: true,
    underscored: true,
  }
);

// Room.belongsTo(Department, { foreignKey: "department_id" });
// Department.hasMany(Room, { foreignKey: "department_id" });

export default Room;
