import { prisma } from "@/lib/db";
import { requireAdmin } from "./require-admin";

export async function adminGetCourses() {
  await requireAdmin();

  const data = await prisma.course.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      smallDescription: true,
      level: true,
      duration: true,
      price: true,
      fileKey: true,
      slug: true,
    },
  });

  return data;
}

// we want to order by time stamp

export type AdminCourseType = Awaited<ReturnType<typeof adminGetCourses>>[0];
