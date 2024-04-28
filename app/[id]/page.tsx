"use client";

import { NewResource } from "@/components/NewResource";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";

const Path = ({ params }: { params: { id: Id<"paths"> } }) => {
  const path = useQuery(api.paths.getPath, { pathId: params.id });

  const pathResources = useQuery(api.resources.getPathResources, {
    pathId: params.id,
  });

  console.log(pathResources);

  return (
    <main className="p-5">
      <div className="flex">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            {path?.name}
          </h1>
          <p className="text-sm text-muted-foreground">{path?.description}</p>
        </div>
        {path && <NewResource path={path} />}
      </div>
      {/* @ts-ignore */}
      {pathResources && <DataTable columns={columns} data={pathResources} />}
    </main>
  );
};

export default Path;
