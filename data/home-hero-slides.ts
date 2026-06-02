import type { StaticImageData } from "next/image";

import heroAirCargo from "@/public/images/hero/hero-air-cargo.png";
import heroSeaCargo from "@/public/images/hero/SeaFreightPage.webp";
import heroWarehouse from "@/public/images/hero/wareHouse.jpg";

export type HomeHeroSlide = {
  id: number;
  titleKey: string;
  descriptionKey: string;
  cardTextKey: string;
  image: StaticImageData;
  cardImage: StaticImageData;
};

export const homeHeroSlides: HomeHeroSlide[] = [
  {
    id: 1,
    titleKey: "slide1.title",
    descriptionKey: "slide1.description",
    cardTextKey: "slide1.cardText",
    image: heroAirCargo,
    cardImage: heroAirCargo,
  },
  {
    id: 2,
    titleKey: "slide2.title",
    descriptionKey: "slide2.description",
    cardTextKey: "slide2.cardText",
    image: heroSeaCargo,
    cardImage: heroSeaCargo,
  },
  {
    id: 3,
    titleKey: "slide3.title",
    descriptionKey: "slide3.description",
    cardTextKey: "slide3.cardText",
    image: heroWarehouse,
    cardImage: heroWarehouse,
  },
];