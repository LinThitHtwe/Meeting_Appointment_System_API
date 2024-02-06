import { CreateOptions, FindOptions, Identifier } from "sequelize";
import Room, { RoomAttributes } from "../models/Room";

const findAll = (options?: FindOptions<RoomAttributes>) =>
  Room.findAll(options);

const findByPk = (
  identifier: Identifier,
  options?: FindOptions<RoomAttributes>
) => Room.findByPk(identifier, options);

const create = (
  data: { name: string; description: string },
  options?: CreateOptions<RoomAttributes>
) => Room.create(data, options);

const update = (
  data: { name: string; departmentId?: number },
  options?: CreateOptions<RoomAttributes> | any
) =>
  Room.update(data, {
    where: options?.where || {},
    returning: true,
    individualHooks: true,
    ...options,
  });

export default { findAll, findByPk, create, update };
