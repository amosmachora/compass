"use client";

import { UserButton, useSession } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface Courses {
  topic : string,
  level : string,
  resources : [],
  id : string
}

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
    <div className="flex flex-cols-4 gap-8">
      <main>
        <Card className="">
          <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
        <p>Card Content</p>
          </CardContent>
          <CardFooter>
        <p>Card Footer</p>
          </CardFooter>
        </Card>        
      </main>
    </div>

  );
}
