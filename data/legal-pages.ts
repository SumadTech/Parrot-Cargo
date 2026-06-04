export type LegalPageKey = "privacyPolicy" | "termsConditions";

type LegalList = {
  key: string;
};

type LegalParagraph = {
  key: string;
};

type LegalBlock = {
  key: string;
  list?: LegalList[];
  paragraphs?: LegalParagraph[];
};

type LegalSection = {
  key: string;
  blocks?: LegalBlock[];
};

export const legalPages: Record<LegalPageKey, LegalSection[]> = {
  privacyPolicy: [
    {
      key: "introduction",
      blocks: [{ key: "main" }],
    },
    {
      key: "informationWeCollect",
      blocks: [
        {
          key: "personalInformation",
          list: [
            { key: "fullName" },
            { key: "emailAddress" },
            { key: "phoneNumber" },
            { key: "companyName" },
            { key: "countryLocation" },
          ],
        },
        {
          key: "shipmentInformation",
          list: [
            { key: "cargoDetails" },
            { key: "shipmentOriginDestination" },
            { key: "freightRequirements" },
            { key: "customsDocumentation" },
          ],
        },
        {
          key: "technicalInformation",
          list: [
            { key: "ipAddress" },
            { key: "browserType" },
            { key: "deviceInformation" },
            { key: "websiteUsageData" },
          ],
        },
      ],
    },
    {
      key: "howWeUseInformation",
      blocks: [
        {
          key: "main",
          list: [
            { key: "processQuoteRequests" },
            { key: "manageLogisticsServices" },
            { key: "provideCustomerSupport" },
            { key: "improveWebsitePerformance" },
            { key: "communicateShipmentUpdates" },
            { key: "complyWithLegalObligations" },
          ],
        },
      ],
    },
    {
      key: "informationSharing",
      blocks: [
        {
          key: "main",
          list: [
            { key: "freightCarriers" },
            { key: "customsAuthorities" },
            { key: "logisticsPartners" },
            { key: "governmentAgencies" },
          ],
          paragraphs: [{ key: "note" }],
        },
      ],
    },
    {
      key: "dataSecurity",
      blocks: [{ key: "main" }],
    },
    {
      key: "cookies",
      blocks: [
        {
          key: "main",
          list: [
            { key: "improveExperience" },
            { key: "analyzeTraffic" },
            { key: "rememberPreferences" },
            { key: "enhanceFunctionality" },
          ],
          paragraphs: [{ key: "disable" }],
        },
      ],
    },
    {
      key: "dataRetention",
      blocks: [
        {
          key: "main",
          list: [
            { key: "serviceDelivery" },
            { key: "legalCompliance" },
            { key: "recordKeeping" },
            { key: "businessOperations" },
          ],
        },
      ],
    },
    {
      key: "yourRights",
      blocks: [
        {
          key: "main",
          list: [
            { key: "accessInformation" },
            { key: "correctInformation" },
            { key: "requestDeletion" },
            { key: "withdrawConsent" },
            { key: "requestProcessingInfo" },
          ],
        },
      ],
    },
    {
      key: "thirdPartyServices",
      blocks: [{ key: "main" }],
    },
    {
      key: "changes",
      blocks: [{ key: "main" }],
    },
    {
      key: "contactUs",
      blocks: [{ key: "main" }],
    },
  ],

  termsConditions: [
    {
      key: "introduction",
      blocks: [{ key: "main" }],
    },
    {
      key: "services",
      blocks: [
        {
          key: "main",
          paragraphs: [{ key: "availability" }],
        },
      ],
    },
    {
      key: "userResponsibilities",
      blocks: [
        {
          key: "main",
          list: [
            { key: "accurateInformation" },
            { key: "complyWithLaws" },
            { key: "ensureCargoLegality" },
            { key: "submitDocumentation" },
            { key: "useWebsiteResponsibly" },
          ],
        },
      ],
    },
    {
      key: "quotationsPricing",
      blocks: [
        {
          key: "main",
          list: [
            { key: "cargoDimensions" },
            { key: "customsDuties" },
            { key: "governmentFees" },
            { key: "fuelSurcharges" },
            { key: "handlingRequirements" },
          ],
        },
      ],
    },
    {
      key: "shipmentTracking",
      blocks: [{ key: "main" }],
    },
    {
      key: "customsCompliance",
      blocks: [{ key: "main" }],
    },
    {
      key: "limitationOfLiability",
      blocks: [
        {
          key: "main",
          list: [
            { key: "customsDelays" },
            { key: "governmentRestrictions" },
            { key: "naturalDisasters" },
            { key: "actsOfWar" },
            { key: "carrierDisruptions" },
            { key: "forceMajeure" },
          ],
          paragraphs: [{ key: "limited" }],
        },
      ],
    },
    {
      key: "intellectualProperty",
      blocks: [{ key: "main" }],
    },
    {
      key: "thirdPartyLinks",
      blocks: [{ key: "main" }],
    },
    {
      key: "changesToTerms",
      blocks: [{ key: "main" }],
    },
    {
      key: "contactInformation",
      blocks: [{ key: "main" }],
    },
  ],
};