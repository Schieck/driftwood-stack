"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Options as LottieOptions } from "react-lottie";

import HeroSection from "@/components/organism/HeroSection";
import DriftwoodGridSection from "@/components/organism/DriftwoodGridSection";
import { apiService } from "@/services/api";

export default function IndexPage() {
  const heroLottie: LottieOptions = {
    loop: true,
    autoplay: true,
    animationData: require("@/public/driftwood-animation.json"),
    rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
  };

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const ITEMS_PER_PAGE = 12;

  const [searchQuery, setSearchQuery] = useState<string>("");

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

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <HeroSection
        lottieOptions={heroLottie}
        title="Dominate Your Workflow"
        description="Unleash the power of open-source with Driftwood Stack. To craft AI-powered MVPs, POCs, Micro-SaaS, web3, and anything; faster than your competitors can say 'deployment.'"
        subDescription="Your secret weapon for innovation starts here."
        onSearch={handleSearch}
        isLoading={loading}
      />

      <DriftwoodGridSection
        data={data}
        loading={loading}
        error={error}
        itemsPerPage={ITEMS_PER_PAGE}
        totalItems={totalItems}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
}
