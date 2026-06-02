import { PageHero } from "@/components/sections/hero/page-hero";
import aboutHeroImage from "@/public/images/hero/hero-air-cargo.png";

export default function AboutPage() {
  return (
    <main>
      <PageHero
        title="About Parrot Cargo"
        description="Reliable cargo, freight forwarding, and logistics solutions connecting Africa with global markets."
        image={aboutHeroImage}
      />
    </main>
  );
}