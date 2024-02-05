import { z } from "zod";
import roomRepository from "../repository/room.repository";
import { CreateOptions } from "sequelize";
import { RoomAttributes } from "../models/Room";

export const storeRoomInputSchema = z.object({
  name: z
    .string()
    .max(255)
    .refine((data) => data.trim() !== "", {
      message: "Name cannot be blank or contain only whitespace",
    }),
  departmentId: z.number(),
});

export const getAllRooms = async () => {
  try {
    const rooms = await roomRepository.findAll();
    return rooms;
  } catch (error) {
    return error;
  }
};

export const getRoomById = async (id: number) => {
  try {
    const room = await roomRepository.findByPk(id);
    return room;
  } catch (error) {
    return error;
  }
};

export const createRoom = async (
  input: z.infer<typeof storeRoomInputSchema>,
  options?: CreateOptions<RoomAttributes>
) => {
  try {
    const newRoom = await roomRepository.create(
      {
        name: input.name,
        departmentId: input.departmentId,
      },
      options
    );
    return newRoom;
  } catch (error) {
    return error;
  }
};
