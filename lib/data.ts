import { prisma } from "@/lib/prisma";

export const getImage = async () => {
  try {
    const result = await prisma.uplode.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return result;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

export const getImageById = async (id: string) => {
  try {
    const result = await prisma.uplode.findUnique({
      where: { id },
    });
    return result;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};
