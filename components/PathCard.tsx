import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Path } from "@/types/global_types";
import Link from "next/link";
import { NewResource } from "./NewResource";

export const PathCard = ({ path }: { path: Path }) => {
  return (
    <Link href={`/${path._id}`}>
      <Card>
        <CardHeader>
          <CardTitle>{path.name}</CardTitle>
          <CardDescription>{path.description}</CardDescription>
        </CardHeader>
        <CardContent>{/* SOME CONTENT */}</CardContent>
        <CardFooter className="flex justify-between">
          <NewResource path={path} />
          <Button>Learn</Button>
        </CardFooter>
      </Card>
    </Link>
  );
};
