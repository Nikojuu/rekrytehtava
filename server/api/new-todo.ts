import prisma from "../utils/db";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    await prisma.todo.create({
      data: {
        title: body.title,
        description: body.description || "",
        completed: body.completed || false,
      },
    });

    return { message: "Todo created successfully" };
  } catch (error) {
    console.error("Error creating todo:", error);
    return createError({
      statusCode: 500,
      statusMessage: "Error creating todo",
    });
  }
});
