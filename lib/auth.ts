import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/db";
import { env } from "./env"
import { emailOTP } from "better-auth/plugins"
import { resend } from "./resend";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    socialProviders: {
        github: {
            clientId: env.AUTH_GITHUB_CLIENT_ID,
            clientSecret: env.AUTH_GITHUB_SECRET,
        }
    },

    plugins: [
            emailOTP({ 
                async sendVerificationOTP({ email, otp, type }) { 
                    await resend.emails.send({
                        from: 'liatLMS <onboarding@resend.dev>',
                        to: [email],
                        subject: 'liatLMS - Verify your email',
                        html:`<p>Your OTP id <strong>${otp}<strong></p>`,
                    });
                // if (type === "sign-in") { 
                //     // Send the OTP for sign in
                // } else if (type === "email-verification") { 
                //     // Send the OTP for email verification
                // } else { 
                //     // Send the OTP for password reset
                // } 
            }, 
        }) 
    ]
});