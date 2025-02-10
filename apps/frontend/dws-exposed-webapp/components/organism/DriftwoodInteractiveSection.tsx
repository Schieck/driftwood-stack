'use client'

import React, { useState, useCallback } from "react";
import debounce from "lodash.debounce";
import DriftwoodGridSection from "@/components/organism/DriftwoodGridSection";
import GoInput from "@/components/molecule/GoInput";
import GetStartedButton from "@/components/molecule/GetStartedButton";
import Link from "next/link";
import { apiService } from "@/services/api";
import { siteConfig } from "@/config/site";


const DriftwoodInteractiveSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const ITEMS_PER_PAGE = 12;

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.searchDriftwood(searchQuery);
      setData(response.results || []);
    } catch (err) {
      setError("Failed to load data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  const debouncedSearch = useCallback( () =>
    debounce(() => {
      setCurrentPage(1);
      fetchData();
    }, 800),
    [fetchData]
  );

  const handleSearchSubmit = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
    fetchData();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchData();
  };

  return (
    <div className="flex flex-col items-center ">
        <div className="flex w-3/4 flex-col-reverse gap-3 p-6 sm:h-1/3 sm:max-w-[60vw] sm:flex-row sm:pt-12">
            <div className="sm:w-1/4">
                <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
                <GetStartedButton />
                </Link>
            </div>
            <div className="sm:w-full">
                <GoInput
                value={searchQuery}
                onChange={(value) => {
                    setSearchQuery(value);
                    debouncedSearch();
                }}
                onSubmit={handleSearchSubmit}
                placeholder="Search among driftwoods..."
                isLoading={loading}
                />
            </div>
        </div>

        <DriftwoodGridSection
            data={data}
            loading={loading}
            error={error}
            itemsPerPage={ITEMS_PER_PAGE}
            totalItems={totalItems}
            currentPage={currentPage}
            onPageChange={handlePageChange}
        />
    </div>
  );
}


export default DriftwoodInteractiveSection
