import { buttonVariants } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CoursesPage() {
    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Your Courses</h1>

                <Link href={"/admin/courses/create"} className={buttonVariants()}>
                Create Course
                </Link>
            </div>

            <div>here you will see all of the courses</div>
        </>
    )
}