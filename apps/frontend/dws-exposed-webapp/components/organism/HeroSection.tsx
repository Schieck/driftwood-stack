import GlassCard from "../atom/GlassCard";
import Player from "lottie-react";
import driftwoodAnimation from "@/public/driftwood-animation.json";

interface HeroSectionProps {
  title: string;
  description: string;
  subDescription?: string;
}

const lottieOptions = {
  loop: true,
  autoplay: true,
  animationData: require("@/public/driftwood-animation.json"),
  rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
};

/**
 * Static description content for the Hero Section.
 */
const HeroSectionDescriptions = ({
  description,
  subDescription,
}: {
  description: string;
  subDescription?: string;
}) => {
  return (
    <>
      <p className="flex font-light leading-relaxed">{description}</p>
      <br />
      {subDescription && (
        <p className="font-title text-lg font-extralight underline">&quot;{subDescription}&quot;</p>
      )}
    </>
  );
};

/**
 * Static Hero Section with a Lottie animation, text content,
 * and a “Get Started” button.
 *
 * @param {HeroSectionProps} props The properties for the HeroSection component.
 */
const HeroSection = ({
  title,
  description,
  subDescription,
}: HeroSectionProps) => {
  return (
    <section
      className="flex justify-center px-5 text-center sm:-mb-28 sm:h-[80vh] lg:px-20"
      aria-label="Hero Section"
    >
      <div className="flex flex-col items-center justify-center space-y-2">
        <div className="flex flex-col sm:h-1/2 sm:flex-row sm:gap-12 lg:px-20">
          {/* Text Content */}
          <div className="mt-6 flex flex-col justify-center px-1 py-3 sm:mt-0 sm:w-2/3 sm:items-start sm:p-0 sm:text-left">
            <h1 className="font-title text-3xl font-extrabold sm:text-4xl">{title}</h1>
            <div className="hidden p-3 sm:visible sm:flex sm:flex-col">
              <HeroSectionDescriptions
                description={description}
                subDescription={subDescription}
              />
            </div>
          </div>

          {/* Lottie Animation */}
          <div style={{ display: "flex", alignItems: "center", aspectRatio: "1" }}>
            <GlassCard>
              <Player animationData={driftwoodAnimation} loop={true} /> 
            </GlassCard>
          </div>
        </div>

        {/* Mobile View Descriptions */}
        <div className="visible pt-10 sm:hidden">
          <HeroSectionDescriptions description={description} subDescription={subDescription} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
