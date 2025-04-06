import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const UserController = {
  signIn: async ({
    body,
    jwt,
  }: {
    body: { username: string; password: string };
    jwt: any;
  }) => {
    try {
      const user = await prisma.user.findUnique({
        select: {
          id: true,
          username: true,
          level: true,
        },
        where: {
          username: body.username,
          password: body.password,
          status: "active",
        },
      });

      if (!user) {
        return { message: "Invalid username or password" };
      }

      // ใช้ jwt.sign() ที่ส่งมาจาก route
      const token = await jwt.sign(user);

      return {
        user,
        token,
      };
    } catch (error) {
      console.error(error);
      return { message: "Internal server error" };
    }
  },
  update: async ({
    body,
    set,
    request,
    jwt,
  }: {
    body: { username: string; password: string };
    set: any;
    request: any;
    jwt: any;
  }) => {
    try {
      const headers = request.headers.get("Authorization");
      const token = headers.split(" ")[1];
      const payload = await jwt.verify(token);
      const id = payload.id;
      const newData = {
        username: body.username,
        password: body.password,
      };

      const user = await prisma.user.findUnique({
        where: {
          id: id,
        },
      });

      if (!user) {
        set.status = 404;
        return { message: "User not found" };
      }

      await prisma.user.update({
        where: {
          id: id,
        },
        data: newData,
      });
      set.status = 200;
      return { message: "User updated successfully" };
    } catch (error) {
      console.error(error);
      return { message: "Internal server error" };
    }
  },
};
