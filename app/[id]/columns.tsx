"use client";

import { Resource } from "@/types/global_types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export const columns: ColumnDef<Resource>[] = [
  {
    accessorKey: "URL",
    header: "URL",
    cell: ({ row }) => {
      return (
        <Link
          href={row.getValue("URL")}
          target="_blank"
          className="flex gap-x-3 items-center"
        >
          <p>{row.getValue("URL")}</p>
          <ExternalLink className="w-4 h-4" />
        </Link>
      );
    },
  },
  {
    accessorKey: "level",
    header: "Level",
  },
  {
    accessorKey: "time",
    header: "Time",
  },
  {
    accessorKey: "freeOrPaid",
    header: "Free or Paid",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
];
