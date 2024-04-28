"use client"; // Make sure this is at the top of the component

import React, { useEffect, useState } from "react";
import { UserButton, useSession } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Sidebar from "@/components/ui/Sidebar";

interface Course {
  topic: string;
  level: string;
  resources: string[];
  id: string;
}

async function getCourses(): Promise<Course[]> {
  const result = await fetch("http://localhost:4000/courses");
  const data = await result.json();
  return data;
}

export default function Home() {
  const { isLoaded, session, isSignedIn } = useSession();
  const router = useRouter();

  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const coursesData = await getCourses();
      setCourses(coursesData);
      setIsLoading(false);
    };

    fetchData();
  }, []); // Empty array ensures useEffect runs only once when the component mounts.

  if (!isLoaded) {
    return <p>Loading...</p>; // Loading state while Clerk session loads
  }

  if (!isSignedIn) {
    router.push("/sign-in");
    return null;
  }

  if (isLoading) {
    return <p>Loading courses...</p>; // Loading state while fetching courses
  }

  return (
    <main>
      <div className="grid grid-cols-4 gap-8">
        {courses.map((course) => (
          <Card key={course.id}>
            <CardHeader>
              <CardTitle>{course.topic}</CardTitle>
              <CardDescription>{course.level}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{course.resources?.join(", ")}</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
