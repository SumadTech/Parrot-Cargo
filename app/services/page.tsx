import { PageHero } from "@/components/sections/hero/page-hero";
import heroImage from "@/public/images/hero/SeaFreightPage.webp";

export default function ServicesPage() {
  return (
    <main>
      <PageHero
        title="Services"
        description="Explore air freight, sea freight, customs clearance, cargo handling, warehousing, and transport solutions."
        image={heroImage}
      />
    </main>
  );
}