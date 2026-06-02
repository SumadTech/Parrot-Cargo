import { PageHero } from "@/components/sections/hero/page-hero";
import heroImage from "@/public/images/hero/SeaFreightPage.webp";

export default function ContactPage() {
  return (
    <main>
      <PageHero
        title="Contact Us"
        description="Get in touch with Parrot Cargo for quotes, cargo support, freight inquiries, and logistics solutions."
        image={heroImage}
      />
    </main>
  );
}