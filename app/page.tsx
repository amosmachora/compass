"use client"; // Make sure this component runs on the client side

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@clerk/nextjs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Define interfaces for Course and Resource
interface Resource {
  URL: string;
  freeOrPaid: string;
  time?: string; // Optional
  price?: string; // Optional
}

interface Course {
  id: string;
  topic: string;
  level: string;
  resources: Resource[];
}

// Asynchronous function to fetch courses
const fetchCourses = async (): Promise<Course[]> => {
  const response = await fetch("http://localhost:4000/courses");
  if (!response.ok) {
    throw new Error("Failed to fetch courses"); // Handle error if the response is not OK
  }

  const data = await response.json(); // Parse the JSON data
  if (!data.courses) {
    throw new Error("Unexpected data structure"); // Handle unexpected structure
  }

  return data.courses; // Ensure we return the correct data
};

const Home = () => {
  const { isLoaded, isSignedIn } = useSession();
  const router = useRouter();

  // Set initial state to an empty array to avoid undefined issues
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Track loading status
  const [error, setError] = useState<string | null>(null); // Track errors

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const fetchedCourses = await fetchCourses(); // Fetch data
        setCourses(fetchedCourses); // Set state with the fetched data
        setIsLoading(false); // Data is loaded
      } catch (err) {
        setError((err as Error).message); // Set error message if there's an error
        setIsLoading(false); // No longer loading
      }
    };

    loadCourses(); // Call the async function to fetch data
  }, []); // Runs once on component mount

  if (!isLoaded) {
    return <p>Loading session...</p>; // Loading state for session
  }

  if (!isSignedIn) {
    router.push("/sign-in"); // Redirect to sign-in if not signed in
    return null; // Avoid rendering the rest of the component
  }

  if (isLoading) {
    return <p>Loading courses...</p>; // Loading state while fetching courses
  }

  if (error) {
    return <p>Error: {error}</p>; // Display the error message if an error occurred
  }

  return (
    <main>
      <div className="grid grid-cols-1 gap-8"> {/* Adjust grid layout as needed */}
        {courses.map((course) => (
          <Card key={course.id}>
            <CardHeader>
              <CardTitle>{course.topic}</CardTitle>
              <CardDescription>{course.level}</CardDescription>
            </CardHeader>
            <CardContent>
              {course.resources.map((resource, index) => (
                <div key={index}>
                  <p>
                    <strong>URL:</strong> <a href={resource.URL}>{resource.URL}</a> {/* Display and link to resource */}
                  </p>
                  <p>
                    <strong>Free or Paid:</strong> {resource.freeOrPaid} {/* Display whether resource is free or paid */}
                  </p>
                  {resource.price && (
                    <p>
                      <strong>Price:</strong> {resource.price} {/* Display price if available */}
                    </p>
                  )}
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <p>Additional Information</p> {/* Optional footer content */}
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
};

export default Home; // Export the component
