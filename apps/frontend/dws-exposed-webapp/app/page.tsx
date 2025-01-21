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

  // Data states
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Optional pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const ITEMS_PER_PAGE = 12;

  // Current search query
  const [searchQuery, setSearchQuery] = useState<string>("log"); // Default

  /**
   * Fetch driftwood data from the backend
   */
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // If your API supports offset/limit:
      // const offset = (currentPage - 1) * ITEMS_PER_PAGE;
      // const response = await apiService.searchDriftwood(searchQuery, { offset, limit: ITEMS_PER_PAGE });

      const response = await apiService.searchDriftwood(searchQuery);
      setData(response.results || []);
      // setTotalItems(response.total || 0);
    } catch (err) {
      setError("Failed to load data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [searchQuery /*, currentPage */]);

  // Trigger data fetch on mount and whenever searchQuery changes
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Search callback (invoked by the HeroSection's GoInput)
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to page 1 if you have pagination
  };

  // “Get Started” callback
  const handleGetStarted = () => {
    window.location.href = "/docs";
  };

  // Page change callback (if using pagination)
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <HeroSection
        lottieOptions={heroLottie}
        title="Dominate Your Workflow"
        description="Unleash the power of Driftwood Stack to craft AI-powered MVPs, POCs, and Micro-SaaS apps faster than your competitors can say 'deployment.' Your secret weapon for innovation starts here."
        onSearch={handleSearch}
        onGetStarted={handleGetStarted}
        isLoading={loading} // for optional UI feedback
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
