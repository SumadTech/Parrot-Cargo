import type { IconType } from "react-icons";
import { PiEnvelopeSimple, PiMapPin, PiPhone, PiClock } from "react-icons/pi";

export type ContactOffice = {
  key: "somalia" | "china";
  Icon?: IconType;
  details: {
    key: string;
    Icon: IconType;
  }[];
};

export type ContactMapLocation = {
  key: "bakaro" | "dabka";
  mapSrc: string;
};

export const contactOffices: ContactOffice[] = [
  {
    key: "somalia",
    details: [
      {
        key: "address",
        Icon: PiMapPin,
      },
      {
        key: "phone",
        Icon: PiPhone,
      },
      {
        key: "email",
        Icon: PiEnvelopeSimple,
      },
      {
        key: "hours",
        Icon: PiClock,
      },
    ],
  },
  {
    key: "china",
    details: [
      {
        key: "address",
        Icon: PiMapPin,
      },
      {
        key: "phone",
        Icon: PiPhone,
      },
      {
        key: "email",
        Icon: PiEnvelopeSimple,
      },
      {
        key: "hours",
        Icon: PiClock,
      },
    ],
  },
];

export const contactMapLocations: ContactMapLocation[] = [
  {
    key: "bakaro",
    mapSrc:
      "https://www.google.com/maps?q=Bakara%20Market%2C%20Mogadishu%2C%20Somalia&output=embed",
  },
  {
    key: "dabka",
    mapSrc:
      "https://www.google.com/maps?q=Igsyidka%20Dabka%2C%20Mogadishu%2C%20Somalia&output=embed",
  },
];