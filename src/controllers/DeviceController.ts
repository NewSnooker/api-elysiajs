import { Device, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const DeviceController = {
  create: async ({ body }: { body: Device }) => {
    try {
      const device = await prisma.device.create({
        data: body,
      });
      return { message: "success" };
    } catch (error) {
      console.error(error);
      return { message: "Internal server error" };
    }
  },
  list: async () => {
    try {
      const devices = await prisma.device.findMany({
        where: {
          status: "active",
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return { devices };
    } catch (error) {
      console.error(error);
      return { message: "Internal server error" };
    }
  },
  update: async ({
    body,
    params,
  }: {
    body: Device;
    params: { id: string };
  }) => {
    try {
      await prisma.device.update({
        where: {
          id: parseInt(params.id),
        },
        data: body,
      });
      return { message: "success" };
    } catch (error) {
      console.error(error);
      return { message: "Internal server error" };
    }
  },
  remove: async ({ params }: { params: { id: string } }) => {
    try {
      await prisma.device.update({
        where: {
          id: parseInt(params.id),
        },
        data: {
          status: "inactive",
        },
      });
      return { message: "success" };
    } catch (error) {
      console.error(error);
      return { message: "Internal server error" };
    }
  },
};
