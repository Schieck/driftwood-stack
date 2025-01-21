'use client';

import { GridItemProps } from "@/components/atom/GridItem";
import DriftwoodGridSection from "@/components/organism/DriftwoodGridSection";
import HeroSection from "@/components/organism/HeroSection";

export default function IndexPage() {
  return (
    <>
    <HeroSection
      title={"Dominate Your Workflow"}
      onActionClick={() => window.location.href = "/docs"}
      imageUrl={"/hero-image.svg"} // Replace with actual hero image path
      description={"Unleash the power of Driftwood Stack to craft AI-powered MVPs, POCs, and Micro-SaaS apps faster than your competitors can say 'deployment.' Your secret weapon for innovation starts here."}    />
    <DriftwoodGridSection fetchData={function (page: number): Promise<GridItemProps[]> {
        return Promise.resolve([{}, {}, {}, {}, {}, {},{}, {}, {}, {}, {}, {},{}, {}, {}, {}, {}, {},{}, {}, {}, {}, {}, {},{}, {}, {}, {}, {}, {},{}, {}, {}, {}, {}, {}] as GridItemProps[]);
      } } />
    </>
    );
}