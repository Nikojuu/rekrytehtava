import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker/locale/fi";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    // Delete all existing todos first
    await prisma.overtimeTodos.deleteMany({});
    console.log("Deleted all existing todos");

    // Generate 50 random todos
    const todosToCreate = Array.from({ length: 50 }, () => ({
      title: faker.hacker.phrase().split(".")[0], // Use sentence without period
      description: faker.lorem.paragraph(2),
      completed: faker.datatype.boolean({ probability: 0.3 }), // 30% chance of being completed
      createdAt: faker.date.between({
        from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        to: new Date(),
      }),
    }));

    const result = await prisma.overtimeTodos.createMany({
      data: todosToCreate,
    });

    return {
      success: true,
      message: `Successfully generated ${result.count} todos (deleted previous entries)`,
    };
  } catch (error) {
    console.error("Error generating todos:", error);
    return {
      success: false,
      message: "Failed to generate todos",
      error: error instanceof Error ? error.message : String(error),
    };
  }
});
