"use client"
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ui/themeToggle";

import { authClient } from "@/lib/auth-client";
import { LogoutButton } from "./(auth)/login/_components/LogoutButton";


export default function Home() {
  const { data: session } = authClient.useSession()
  
  // async function signOut() {
  //   await authClient.signOut({
  //     fetchOptions: {
  //       onSuccess: () => {
  //         router.push("/"); // redirect to login page
  //         toast.success('Signed out successfully')
  //       },
  //     },
  //   });
  // }
  
  return (
    <div className="p-24">
      <ThemeToggle />
      {session ? (
        <div>
        <p>{session.user.name}</p>
          <LogoutButton/>
          </div>
      ) : (
         <Button>Login</Button>
      )}
    </div>
  );
}
