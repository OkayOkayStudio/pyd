export interface OrganicSearchData {
  date: Date;
  traffic: number;
  trafficValue: number;
  impressions: number;
  positions: {
    top3: number;
    top10: number;
    top20: number;
    top50: number;
    beyond50: number;
  };
  pages: number;
  serpFeatures: {
    featuredSnippet: number;
    localPack: number;
    imageCarousel: number;
    sitelinks: number;
    knowledgePanel: number;
    videoCarousel: number;
    topStories: number;
    relatedQuestions: number;
  };
  brandVsNonBrand: {
    brandTraffic: number;
    nonBrandTraffic: number;
  };
  searchIntent: {
    informational: number;
    navigational: number;
    commercial: number;
    transactional: number;
  };
}

export interface ChartDataPoint {
  date: string;
  traffic: number;
  trafficValue: number;
  impressions: number;
  top3: number;
  top10: number;
  top20: number;
  top50: number;
  beyond50: number;
  pages: number;
}

export interface TimeRange {
  label: string;
  value: string;
  days: number;
}

export interface ChartConfig {
  colors: {
    traffic: string;
    trafficValue: string;
    impressions: string;
    top3: string;
    top10: string;
    top20: string;
    top50: string;
    beyond50: string;
    pages: string;
  };
  gradients: {
    traffic: string[];
    trafficValue: string[];
    impressions: string[];
  };
}