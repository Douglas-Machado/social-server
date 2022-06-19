import { PrismaClient } from "@prisma/client";

export const prismaClient = new PrismaClient();

class CreateAdminUser {
  async create() {
    await prismaClient.user.create({
      data: {
        name: "Admin",
        jobTitle: "Admin",
      },
    });
  }
}

const createAdminUser = new CreateAdminUser();

createAdminUser.create();
