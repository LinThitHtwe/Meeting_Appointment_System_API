import { z } from "zod";
import departmentRepository from "../repository/department.repository";
import { DepartmentAttributes } from "../models/Department";
import { CreateOptions, FindOptions } from "sequelize";

export const storeDepartmentInputSchema = z.object({
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

export const getAllDepartments = async (
  options?: FindOptions<DepartmentAttributes>
) => {
  try {
    const departments = await departmentRepository.findAll(options);
    return departments;
  } catch (error) {
    throw error;
  }
};

export const getDepartmentById = async (id: number) => {
  try {
    const department = await departmentRepository.findByPk(id);
    return department;
  } catch (error) {
    throw error;
  }
};

export const createDepartment = async (
  input: z.infer<typeof storeDepartmentInputSchema>,
  options?: CreateOptions<DepartmentAttributes>
) => {
  try {
    const newDepartment = await departmentRepository.create(
      {
        name: input.name,
        description: input.description,
      },
      options
    );
    return newDepartment;
  } catch (error) {
    throw error;
  }
};

export const updateDepartment = async (
  input: z.infer<typeof storeDepartmentInputSchema>,
  options?: CreateOptions<DepartmentAttributes> | any
) => {
  try {
    const updatedDepartment = departmentRepository.update(
      { name: input.name },
      options
    );
    return updatedDepartment;
  } catch (error) {
    throw error;
  }
};
