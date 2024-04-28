"use client";

import { NewPath } from "@/components/NewPath";
import { PathCard } from "@/components/PathCard";
import { api } from "@/convex/_generated/api";
import { UserButton, useSession } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { isLoaded, session, isSignedIn } = useSession();

  const router = useRouter();
  const paths = useQuery(api.paths.getPaths);

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    router.push("/sign-in");
    return null;
  }

  return (
    <main className="flex flex-col">
      <div className="p-5 flex flex-col">
        <NewPath />
      </div>
      <div className="grid grid-cols-3 gap-5">
        {paths?.map((path) => <PathCard path={path} key={path._id} />)}
      </div>
    </main>
  );
}
