"use server"

import { requireAdmin } from "@/app/data/admin/require-admin";
import arcjet, { detectBot, fixedWindow } from "@/lib/arcjet";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import { courseSchema, courseSchemaType } from "@/lib/zodSchema";
import { request } from "@arcjet/next";
import { describe } from "zod/v4/core";

const aj = arcjet.withRule(
  detectBot({
  mode: "LIVE",
  allow: [],
})
).withRule(
  fixedWindow({
    mode: "LIVE",
    window: "1m",
    max: 5
  })
)

export async function CreateCourse(
    values: courseSchemaType
): Promise<ApiResponse> {

    const session = await requireAdmin()

    try {

        const req = await request();

        // Call Arcjet protect
        const decision = await aj.protect(req, {
            fingerprint: session.user.id
        });

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return {
                    status: 'error',
                    message: 'You have been blocked due to rate limiting'
                }
            } else {
                return{
                    status: 'error',
                    message: 'You are a bot!, if this is a mistake contact our support'
                }
            }
        }

        const validation = courseSchema.safeParse(values);

        if (!validation.success) {
            return ({
                status: 'error',
                message: 'Invalid Form Data'
            })
        }   

        await prisma.course.create({
            data: {
                ...validation.data,
                userId: session?.user.id 
            }, 
        })

        return {
            status: 'success',
            message:'Course created succesfully'
        }
    } catch (error) {
        return { 
            status: 'error',
            message: 'Failed to create course'
        }
    }
}
