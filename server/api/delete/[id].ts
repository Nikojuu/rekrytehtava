import prisma from "../../utils/db";

export default defineEventHandler(async (event) => {
  const todoId = getRouterParam(event, "id");

  if (!todoId) {
    return createError({
      statusCode: 400,
      statusMessage: "Todo ID is required",
    });
  }

  try {
    await prisma.todo.delete({
      where: {
        id: parseInt(todoId),
      },
    });

    return { message: "Todo deleted successfully" };
  } catch (error) {
    console.error("Error deleting todo:", error);
    return createError({
      statusCode: 500,
      statusMessage: "Failed to delete todo",
    });
  }
});
