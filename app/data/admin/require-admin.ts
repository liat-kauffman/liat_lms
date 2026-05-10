import "server-only"

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function requireAdmin() {
    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if (!session) {
        return redirect("/login")
    }

    const user = await prisma.user.findUnique({
        where: {
            id: session.user.id,
        },
        select: {
            role: true,
        },
    })

    if (user?.role !== "admin") {
        return redirect("/not-admin")
    }

    return session
}
