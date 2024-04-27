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
    <div>
      <Card>
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
    </div>

  );
}
