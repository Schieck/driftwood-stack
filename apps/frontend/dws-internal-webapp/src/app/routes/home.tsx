import { FilterManager } from "@/components/organism/FilterManager";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Driftwood Stack" },
    { name: "description", content: "Internal app for configuration and back-door experience." },
  ];
}

export default function Home() {
  return (
    <>
      <div>
        <FilterManager />
      </div>
    </>
  );
}