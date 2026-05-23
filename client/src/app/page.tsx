import { Hero } from "@/components/home/Hero";
import { SmartSearch } from "@/components/home/SmartSearch";
import { FeaturedGrid } from "@/components/home/FeaturedGrid";
import { CommunitySection } from "@/components/home/CommunitySection";
import { TestimonialBlock } from "@/components/home/TestimonialBlock";
import { PartnersSection } from "@/components/home/PartnersSection";
import { CTABanner } from "@/components/home/CTABanner";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      
      {/* Floating SmartSearch module positioned overlapping the Hero section slightly */}
      <section className="relative z-20 -mt-24 px-4 md:px-12 lg:px-24 max-w-6xl mx-auto w-full mb-24">
        <SmartSearch />
      </section>

      <FeaturedGrid />
      <CommunitySection />
      <TestimonialBlock />
      <PartnersSection />
      <CTABanner />
    </main>
  );
}
