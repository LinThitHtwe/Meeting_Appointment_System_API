import { FindOptions, Identifier } from "sequelize";
import Room, { RoomAttributes } from "../models/Room";

const findAll = (options?: FindOptions<RoomAttributes>) =>
  Room.findAll(options);

const findByPk = (
  identifier: Identifier,
  options?: FindOptions<RoomAttributes>
) => Room.findByPk(identifier, options);

export { findAll, findByPk };
