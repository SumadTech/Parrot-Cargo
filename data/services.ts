import type { StaticImageData } from "next/image";

import heroAirCargo from "@/public/images/home/serives.png";
import heroSeaCargo from "@/public/images/home/serives.png";
import heroWarehouse from "@/public/images/home/serives.png";

export type ServiceItem = {
  key: "airFreight" | "seaFreight" | "customsClearance" | "projectCargo";
  slug: string;
  image: StaticImageData;
};

export const services: ServiceItem[] = [
  {
    key: "airFreight",
    slug: "air-freight-services",
    image: heroAirCargo,
  },
  {
    key: "seaFreight",
    slug: "sea-freight-services",
    image: heroSeaCargo,
  },
  {
    key: "customsClearance",
    slug: "customs-clearance",
    image: heroAirCargo,
  },
  {
    key: "projectCargo",
    slug: "project-cargo-handling",
    image: heroWarehouse,
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}