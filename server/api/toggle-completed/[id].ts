import prisma from "../../utils/db";

export default defineEventHandler(async (event) => {
  const todoId = getRouterParam(event, "id");
  const body = await readBody(event);

  if (!todoId) {
    return createError({
      statusCode: 400,
      statusMessage: "Todo ID is required",
    });
  }

  try {
    await prisma.todo.update({
      where: {
        id: parseInt(todoId),
      },
      data: {
        completed: body.completed,
      },
    });

    return { message: "Todo updated successfully" };
  } catch (error) {
    console.error("Error updating todo:", error);
    return createError({
      statusCode: 500,
      statusMessage: "Failed to update todo",
    });
  }
});
