import { PageHero } from "@/components/sections/hero/page-hero";
import heroImage from "@/public/images/hero/hero-air-cargo.png";

export default function BlogsPage() {
  return (
    <main>
      <PageHero
        title="Blogs"
        description="Read updates and insights about cargo services, freight forwarding, logistics, and global trade."
        image={heroImage}
      />
    </main>
  );
}