"use client"; 

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


interface Course {
  topic: string;
  level: string;
  resources: any;
  id: string;
}

interface MernCourse {
  topic: string;
  level: string;
  resources: any;
  id: string;
}

interface PythonCourse {
  topic: string;
  level: string;
  resources: any;
  id: string;
}

interface SpringbootCourse {
  topic: string;
  level: string;
  resources: any;
  id: string;
}

async function getCourses(): Promise<Course[]> {
  const resultDevops = await fetch("http://localhost:4000/courses"); 

  const dataDevops = await resultDevops.json();

  return dataDevops;
}

async function getMernCourses(): Promise<Course[]> {
  const resultMern = await fetch("http://localhost:4001/courses");

  const dataMern = await resultMern.json(); 
   
  return dataMern;
}

async function getPythonCourses(): Promise<Course[]> {
  const resultPython = await fetch("http://localhost:4002/courses");

  const dataPython = await resultPython.json(); 
   
  return dataPython;
}

async function getSpringbootCourses(): Promise<Course[]> {
  const resultSpringboot = await fetch("http://localhost:4003/courses");

  const dataSprinboot = await resultSpringboot.json(); 
   
  return dataSprinboot;
}


export default function Home() {

  const [courses, setCourses] = useState<Course[]>([]);
  const [merncourses, setMernCourses] = useState<MernCourse[]>([]);
  const [pythoncourses, setPythonCourses] = useState<PythonCourse[]>([]);
  const [springbootcourses, setSpringbootCourses] = useState<SpringbootCourse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const coursesData = await getCourses();
      setCourses(coursesData);
      setIsLoading(false);
    };

    fetchData();
  }, []); // Empty array ensures useEffect runs only once when the component mounts.



  useEffect(() => {
    const fetchData = async () => {
      const coursesMernData = await getMernCourses();
      setMernCourses(coursesMernData);
      setIsLoading(false);
    };

    fetchData();
  }, []);



  useEffect(() => {
    const fetchData = async () => {
      const coursesPythonData = await getPythonCourses();
      setPythonCourses(coursesPythonData);
      setIsLoading(false);
    };

    fetchData();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      const coursesSpringbootData = await getSpringbootCourses();
      setSpringbootCourses(coursesSpringbootData);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <main>
      <div className="grid grid-cols-3 gap-8">
        {courses.map((course) => (
          <Card key={course.id}>
            <CardHeader>
              <CardTitle>{course.topic}</CardTitle>
              <CardDescription>{course.level}</CardDescription>
            </CardHeader>
            <CardContent>
            <ol>
            {course.resources.map((resource: {name: string; URL: string ;  freeOrPaid: string ; price: string; }, index: React.Key) => (
              <li key={index}>
                <p>Course: {resource.name}</p>
                
                <Button className="bg-blue-500" variant="outline"><a href={resource.URL} target="_blank" rel="noopener noreferrer">
                <p>Click Here</p>
                </a> </Button>
                <p>Type: {resource.freeOrPaid}</p>
                {resource.price && <p>Price: {resource.price}</p>}
              </li>
            ))}
          </ol>
            </CardContent>
            <CardFooter>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
