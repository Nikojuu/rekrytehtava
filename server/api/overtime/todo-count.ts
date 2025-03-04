import prisma from "~/server/utils/db";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const search = (query.search as string) || "";

    // Build where clause conditionally based on search parameter
    const whereClause = search
      ? {
          OR: [
            { title: { contains: search } },
            { description: { contains: search } },
          ],
        }
      : {};

    const count = await prisma.overtimeTodos.count({
      where: whereClause,
    });

    return { count };
  } catch (error) {
    console.error("Error counting todos:", error);
    return createError({
      statusCode: 500,
      statusMessage: "Error counting todos",
    });
  }
});
