import { Hero } from "@/components/home/Hero"
import { MissionSection } from "@/components/home/MissionSection"
import { FeaturedStories } from "@/components/home/FeaturedStories"
import { CTABanner } from "@/components/home/CTABanner"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <MissionSection />
      <FeaturedStories />
      <CTABanner />
    </div>
  );
}
