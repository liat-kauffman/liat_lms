"use client"
import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export const LogoutButton = () => {
    const [signoutPending, startSignoutTransition] = useTransition()
    const router = useRouter();

  
  function signOut() {
    startSignoutTransition(async () => {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/"); // redirect to login page
            toast.success('Signed out successfully')
          },
        },
      });
    })
  }
    return (
        <Button onClick={signOut} disabled={signoutPending}>Logout</Button>
    )
}
