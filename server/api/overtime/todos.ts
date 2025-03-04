import prisma from "~/server/utils/db";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const page = parseInt(query.page as string) || 1;
    const limit = parseInt(query.limit as string) || 10;
    const sortOrder = (query.sortOrder as string) === "asc" ? "asc" : "desc";
    const search = (query.search as string) || "";
    const skip = (page - 1) * limit;

    const whereClause = search
      ? {
          OR: [
            { title: { contains: search } },
            { description: { contains: search } },
          ],
        }
      : {};

    const overTimeTodos = await prisma.overtimeTodos.findMany({
      where: whereClause,
      orderBy: {
        createdAt: sortOrder,
      },
      skip,
      take: limit,
    });

    return overTimeTodos;
  } catch (error) {
    console.error("Error fetching todos:", error);
    return createError({
      statusCode: 500,
      statusMessage: "Error fetching todos",
    });
  }
});
