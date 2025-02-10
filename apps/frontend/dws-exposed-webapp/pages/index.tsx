import HeroSection from "@/components/organism/HeroSection";
import dynamic from "next/dynamic";

const DriftwoodInteractiveSection = dynamic(
  () => import("@/components/organism/DriftwoodInteractiveSection"),
  { ssr: false }
);

const IndexPage = () => {

  return (
    <>
      <HeroSection
        title="Dominate Your Workflow"
        description="Unleash the power of open-source with Driftwood Stack. To craft AI-powered MVPs, POCs, Micro-SaaS, web3, and anything; faster than your competitors can say 'deployment.'"
        subDescription="Your secret weapon for innovation starts here."
      />

      {/* Interactive Section */}
      <DriftwoodInteractiveSection />
    </>
  );
}


export default IndexPage