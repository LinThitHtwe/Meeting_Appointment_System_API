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
  description: z
    .string()
    .max(255)
    .refine((data) => data.trim() !== "", {
      message: "Description cannot be blank or contain only whitespace",
    }),
});

export const getAllRooms = async () => {
  try {
    const rooms = await roomRepository.findAll();
    return rooms;
  } catch (error) {
    throw error;
  }
};

export const getRoomById = async (id: number) => {
  try {
    const room = await roomRepository.findByPk(id);
    return room;
  } catch (error) {
    throw error;
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
        description: input.description,
      },
      options
    );
    return newRoom;
  } catch (error) {
    throw error;
  }
};

export const updateRoom = async (
  input: z.infer<typeof storeRoomInputSchema>,
  options?: CreateOptions<RoomAttributes> | any
) => {
  try {
    const updatedRoom = roomRepository.update(
      { name: input?.name, description: input?.description },
      options
    );
    return updatedRoom;
  } catch (error) {
    throw error;
  }
};
