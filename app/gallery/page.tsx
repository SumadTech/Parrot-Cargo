import { PageHero } from "@/components/sections/hero/page-hero";
import heroImage from "@/public/images/hero/wareHouse.jpg";

export default function GalleryPage() {
  return (
    <main>
      <PageHero
        title="Gallery"
        description="View Parrot Cargo operations, shipments, warehouses, cargo handling, and logistics activities."
        image={heroImage}
      />
    </main>
  );
}