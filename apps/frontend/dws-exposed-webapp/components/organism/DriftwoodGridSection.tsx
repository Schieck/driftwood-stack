"use client";

import React from "react";
import { Pagination } from "@/components/ui/pagination";
import { GridItem, GridItemProps } from "@/components/atom/GridItem";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

interface DriftwoodGridSectionProps {
  data: any[];
  loading: boolean;
  error: string | null;
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

/**
 * DriftwoodGridSection displays a responsive grid of driftwood items.
 */
const DriftwoodGridSection: React.FC<DriftwoodGridSectionProps> = ({
  data,
  loading,
  error,
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  if (error) {
    return <div className="text-center text-destructive">{error}</div>;
  }

  return (
    <section
      className="flex justify-center px-6 text-center sm:h-screen sm:px-20"
      aria-label="Driftwood Grid Section"
    >
      <div className="w-full grid-cols-4 items-center sm:-mt-36">
        <div
          className={`grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-4
                      bg-muted p-4 dark:bg-accent`}
        >
          {loading
            ? Array.from({ length: itemsPerPage }).map((_, index) => (
                <GridItem key={index}>
                  <Skeleton className="size-32 rounded-md" />
                </GridItem>
              ))
            : data.map((item, idx) => (
                <GridItem key={item.id || idx} {...(item as GridItemProps)}>
                  <Image
                    alt="A Driftwood"
                    className="rounded-md"
                    src={"/" + item.image_path}
                    width={100}
                    height={100}
                  />
                </GridItem>
              ))}
        </div>

        {/* Example pagination usage (uncomment if needed) */}
        {/* 
        {!loading && totalItems > itemsPerPage && (
          <Pagination
            currentPage={currentPage}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={onPageChange}
          />
        )}
        */}
      </div>
    </section>
  );
};

export default DriftwoodGridSection;
