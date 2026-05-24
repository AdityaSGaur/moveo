import { Hero } from "@/components/home/Hero";
import { SmartSearch } from "@/components/home/SmartSearch";
import { FeaturedGrid } from "@/components/home/FeaturedGrid";
import { PopularRoutes } from "@/components/home/PopularRoutes";
import { LiveShowtimes } from "@/components/home/LiveShowtimes";
import { RecommendedSection } from "@/components/home/RecommendedSection";
import { CommunitySection } from "@/components/home/CommunitySection";
import { PartnersSection } from "@/components/home/PartnersSection";
import { WhyMoveo } from "@/components/home/WhyMoveo";
import { CTABanner } from "@/components/home/CTABanner";

import { DiscoverDestinations } from "@/components/home/DiscoverDestinations";
import { FAQSection } from "@/components/home/FAQSection";
import { BigCTA } from "@/components/home/BigCTA";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      
      {/* Floating SmartSearch module positioned overlapping the Hero section slightly */}
      <section className="relative z-20 -mt-24 px-4 md:px-12 lg:px-24 max-w-6xl mx-auto w-full mb-16">
        <SmartSearch />
      </section>



      <FeaturedGrid />
      <PopularRoutes />
      <DiscoverDestinations />
      <LiveShowtimes />
      <RecommendedSection />
      
      <CommunitySection />
      <FAQSection />
      <PartnersSection />
      <WhyMoveo />
      
      <BigCTA />
      <CTABanner />
    </main>
  );
}
