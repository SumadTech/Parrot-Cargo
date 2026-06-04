import type { IconType } from "react-icons";
import { LuBadgeDollarSign } from "react-icons/lu";
import {
  PiAirplaneTilt,
  PiAnchor,
  PiClipboardText,
  PiFactory,
  PiFileText,
  PiGasPump,
  PiGearSix,
  PiGlobeHemisphereWest,
  PiHeartbeat,
  PiPackage,
  PiShieldCheck,
  PiShoppingCart,
  PiTruck,
  PiUsersThree,
  PiWarehouse,
} from "react-icons/pi";

export type ServiceKey =
  | "airFreight"
  | "seaFreight"
  | "customsClearance"
  | "projectCargo";

type IconItem = {
  key: string;
  Icon: IconType;
};

type WorkflowItem = {
  key: string;
  number: string;
  Icon: IconType;
  position: "top" | "bottom";
};

export type ServiceDetailContent = {
  overviewItems: string[];
  benefits: IconItem[];
  workflow: WorkflowItem[];
  industries: IconItem[];
};

export const serviceDetails: Record<ServiceKey, ServiceDetailContent> = {
  airFreight: {
    overviewItems: [
      "internationalImportExport",
      "priorityCargoHandling",
      "airportCoordination",
      "customsDocumentation",
      "shipmentMonitoring",
    ],
    benefits: [
      { key: "fastDeliveryTimes", Icon: PiClipboardText },
      { key: "globalAirlineNetwork", Icon: PiGlobeHemisphereWest },
      { key: "secureCargoHandling", Icon: PiShieldCheck },
      { key: "realTimeCoordination", Icon: PiTruck },
      { key: "importExportSupport", Icon: PiUsersThree },
      { key: "reliableOperations", Icon: PiShieldCheck },
    ],
    workflow: [
      {
        key: "cargoBooking",
        number: "01",
        Icon: PiClipboardText,
        position: "top",
      },
      {
        key: "documentation",
        number: "02",
        Icon: PiFileText,
        position: "bottom",
      },
      {
        key: "customsClearance",
        number: "03",
        Icon: PiShieldCheck,
        position: "top",
      },
      {
        key: "airTransportation",
        number: "04",
        Icon: PiAirplaneTilt,
        position: "bottom",
      },
      {
        key: "finalDelivery",
        number: "05",
        Icon: PiTruck,
        position: "top",
      },
    ],
    industries: [
      { key: "retail", Icon: PiShoppingCart },
      { key: "electronics", Icon: PiShieldCheck },
      { key: "automotive", Icon: PiTruck },
      { key: "manufacturing", Icon: PiFactory },
      { key: "healthcare", Icon: PiHeartbeat },
      { key: "eCommerce", Icon: PiPackage },
    ],
  },

  seaFreight: {
    overviewItems: [
      "fclLclShipping",
      "cargoConsolidation",
      "portToPortServices",
      "customsCoordination",
      "shipmentVisibility",
    ],
    benefits: [
      { key: "costEffectiveTransportation", Icon: LuBadgeDollarSign },
      { key: "globalShippingNetwork", Icon: PiGlobeHemisphereWest },
      { key: "flexibleContainerOptions", Icon: PiPackage },
      { key: "cargoConsolidation", Icon: PiWarehouse },
      { key: "secureCargoHandling", Icon: PiShieldCheck },
      { key: "reliableTransitPlanning", Icon: PiClipboardText },
    ],
    workflow: [
      {
        key: "cargoCollection",
        number: "01",
        Icon: PiClipboardText,
        position: "top",
      },
      {
        key: "containerLoading",
        number: "02",
        Icon: PiPackage,
        position: "bottom",
      },
      {
        key: "documentation",
        number: "03",
        Icon: PiFileText,
        position: "top",
      },
      {
        key: "oceanTransportation",
        number: "04",
        Icon: PiAnchor,
        position: "bottom",
      },
      {
        key: "finalDelivery",
        number: "05",
        Icon: PiTruck,
        position: "top",
      },
    ],
    industries: [
      { key: "construction", Icon: PiWarehouse },
      { key: "manufacturing", Icon: PiFactory },
      { key: "heavyEquipment", Icon: PiTruck },
      { key: "industrialMachinery", Icon: PiGearSix },
      { key: "retailDistribution", Icon: PiShoppingCart },
      { key: "wholesaleTrade", Icon: PiClipboardText },
    ],
  },

  customsClearance: {
    overviewItems: [
      "importClearance",
      "exportClearance",
      "regulatoryCompliance",
      "dutyProcessing",
      "documentationManagement",
    ],
    benefits: [
      { key: "fasterCargoRelease", Icon: PiClipboardText },
      { key: "complianceAssurance", Icon: PiGlobeHemisphereWest },
      { key: "documentationAccuracy", Icon: PiShieldCheck },
      { key: "reducedOperationalRisks", Icon: PiTruck },
      { key: "expertCustomsGuidance", Icon: PiUsersThree },
      { key: "endToEndSupport", Icon: PiShieldCheck },
    ],
    workflow: [
      {
        key: "documentReview",
        number: "01",
        Icon: PiClipboardText,
        position: "top",
      },
      {
        key: "customsPreparation",
        number: "02",
        Icon: PiFileText,
        position: "bottom",
      },
      {
        key: "submissionProcessing",
        number: "03",
        Icon: PiShieldCheck,
        position: "top",
      },
      {
        key: "inspectionCoordination",
        number: "04",
        Icon: PiTruck,
        position: "bottom",
      },
      {
        key: "cargoRelease",
        number: "05",
        Icon: PiPackage,
        position: "top",
      },
    ],
    industries: [
      { key: "retail", Icon: PiShoppingCart },
      { key: "automotive", Icon: PiTruck },
      { key: "manufacturing", Icon: PiFactory },
      { key: "electronics", Icon: PiShieldCheck },
      { key: "oilGas", Icon: PiGasPump },
      { key: "industrialEquipment", Icon: PiGearSix },
    ],
  },

  projectCargo: {
    overviewItems: [
      "heavyLiftCargo",
      "routePlanning",
      "siteCoordination",
      "specializedTransportation",
      "customsComplianceSupport",
    ],
    benefits: [
      { key: "specializedPlanning", Icon: PiClipboardText },
      { key: "heavyCargoExpertise", Icon: PiGlobeHemisphereWest },
      { key: "routeOptimization", Icon: PiShieldCheck },
      { key: "riskManagement", Icon: PiTruck },
      { key: "regulatoryCoordination", Icon: PiUsersThree },
      { key: "endToEndProjectControl", Icon: PiShieldCheck },
    ],
    workflow: [
      {
        key: "projectAssessment",
        number: "01",
        Icon: PiClipboardText,
        position: "top",
      },
      {
        key: "routePlanning",
        number: "02",
        Icon: PiTruck,
        position: "bottom",
      },
      {
        key: "cargoPreparation",
        number: "03",
        Icon: PiFileText,
        position: "top",
      },
      {
        key: "specializedTransportation",
        number: "04",
        Icon: PiAirplaneTilt,
        position: "bottom",
      },
      {
        key: "siteDelivery",
        number: "05",
        Icon: PiTruck,
        position: "top",
      },
    ],
    industries: [
      { key: "oilGas", Icon: PiGasPump },
      { key: "construction", Icon: PiWarehouse },
      { key: "infrastructure", Icon: PiTruck },
      { key: "energy", Icon: PiShieldCheck },
      { key: "industrialManufacturing", Icon: PiFactory },
      { key: "mining", Icon: PiPackage },
    ],
  },
};