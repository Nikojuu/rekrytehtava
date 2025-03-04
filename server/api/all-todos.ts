import prisma from "../utils/db";

export default defineEventHandler(async (event) => {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return todos;
  } catch (error) {
    console.error("Error fetching todos:", error);
    return createError({
      statusCode: 500,
      statusMessage: "Error fetching todos",
    });
  }
});
