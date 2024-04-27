"use client";

import { UserButton, useSession } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Home() {
  const { isLoaded, session, isSignedIn } = useSession();

  const router = useRouter();

  if (!isLoaded) {
    // Add logic to handle loading state
    return null;
  }

  if (!isSignedIn) {
    router.push("/sign-in");
    return null;
  }

  return (
    <main className="">
      <nav className="flex justify-end p-5">
        <UserButton />
      </nav>
    </main>
  );
}
