import axios from "axios";

import { CONFIG } from "src/global-config";

const reviewEngagementAxiosInstance = axios.create({
  baseURL: CONFIG.reviewEngagementServiceUrl,
});

reviewEngagementAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong!",
    ),
);

export default reviewEngagementAxiosInstance;

export const fetcher = async (args) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await reviewEngagementAxiosInstance.get(url, { ...config });

    return res.data;
  } catch (error) {
    console.error("Failed to fetch:", error);
    throw error;
  }
};

export const reviewEngagementEndpoints = {
  review: {
    getReview: "/reviews/:reviewId",
    createReview: "/reviews",
    updateReview: "/reviews/:reviewId",
    deleteReview: "/reviews/:reviewId",
    listReviews: "/reviews",
  },

  recommendation: {
    getRecommendation: "/recommendations/:recommendationId",
    createRecommendation: "/recommendations",
    updateRecommendation: "/recommendations/:recommendationId",
    deleteRecommendation: "/recommendations/:recommendationId",
    listRecommendations: "/recommendations",
  },

  engagementEvent: {
    getEngagementEvent: "/engagementevents/:engagementEventId",
    createEngagementEvent: "/engagementevents",
    updateEngagementEvent: "/engagementevents/:engagementEventId",
    deleteEngagementEvent: "/engagementevents/:engagementEventId",
    listEngagementEvents: "/engagementevents",
  },

  reviewEngagementShareToken: {},
};
