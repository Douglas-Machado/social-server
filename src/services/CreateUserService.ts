import { prismaClient } from "../../prisma/seed";

interface ICreateUserParams {
  name: string;
  jobTitle: string;
}

class CreateUserService {
  async execute({ name, jobTitle }: ICreateUserParams) {
    console.log(name, jobTitle);
    await prismaClient.user.create({
      data: {
        name: name,
        jobTitle: jobTitle,
      },
    });
    // console.log(result);
  }
}

export { CreateUserService };
