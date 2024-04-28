// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import { useSession } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const careerPaths = [
  "Software Development",
  "Data Science",
  "Web Development",
  "UI/UX Design",
  "Cybersecurity",
  "Marketing",
  "Finance",
  "Entrepreneurship",
  "Healthcare",
  "Education",
];

export default function InterestPage() {
  const { isLoaded, session, isSignedIn } = useSession();
  const router = useRouter();
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(!isLoaded);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000); 

    return () => clearTimeout(loadingTimeout);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isSignedIn) {
    router.push("/sign-in");
    return null;
  }

  const handleInterestChange = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Send the selected interests to your backend API
      const response = await fetch("/api/submit-interests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session.user.id,
          interests: selectedInterests,
        }),
      });

      if (response.ok) {
        // Interests submitted successfully
        console.log("Interests submitted successfully");
        router.push("/dashboard");
      } else {
        // Error submitting interests
        console.error("Error submitting interests");
      }
    } catch (error) {
      console.error("Error submitting interests:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Select Your Career Interests
      </h1>
      <div className="grid grid-cols-3 gap-6 mb-8">
        {careerPaths.map((interest) => (
          <div
            key={interest}
            className={`rounded-lg cursor-pointer p-6 flex justify-center items-center transition-colors duration-300 ${
              selectedInterests.includes(interest)
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
            onClick={() => handleInterestChange(interest)}
          >
            {interest}
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <button
          className={`bg-blue-500 text-white px-6 py-3 rounded-md transition-opacity duration-300 ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          }`}
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Interests"}
        </button>
      </div>
    </div>
  );
}