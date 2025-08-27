import useSWR from "swr";
import { useMemo } from "react";

import {
  fetcher,
  reviewEngagementEndpoints,
} from "src/lib/reviewEngagement-axios";

// ----------------------------------------------------------------------

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  revalidateOnMount: true,
};

// ----------------------------------------------------------------------

export function useReviewEngagementGetReview(reviewId) {
  let url = reviewId ? [reviewEngagementEndpoints.review.getReview] : "";

  url = url && url.map((u) => u.replace(":reviewId", reviewId));

  const { data, isLoading, error, isValidating } = useSWR(
    url,
    fetcher,
    swrOptions,
  );

  const memoizedValue = useMemo(
    () => ({
      review: data?.review,
      reviewLoading: isLoading,
      reviewError: error,
      reviewValidating: isValidating,
    }),
    [data?.product, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function useReviewEngagementListReviews() {
  const url = [reviewEngagementEndpoints.review.listReviews];

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.reviews || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty: !isLoading && !isValidating && !data?.reviews?.length,
    }),
    [data?.reviews, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function useReviewEngagementGetRecommendation(recommendationId) {
  let url = recommendationId
    ? [reviewEngagementEndpoints.recommendation.getRecommendation]
    : "";

  url = url && url.map((u) => u.replace(":recommendationId", recommendationId));

  const { data, isLoading, error, isValidating } = useSWR(
    url,
    fetcher,
    swrOptions,
  );

  const memoizedValue = useMemo(
    () => ({
      recommendation: data?.recommendation,
      recommendationLoading: isLoading,
      recommendationError: error,
      recommendationValidating: isValidating,
    }),
    [data?.product, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function useReviewEngagementListRecommendations() {
  const url = [reviewEngagementEndpoints.recommendation.listRecommendations];

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.recommendations || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty:
        !isLoading && !isValidating && !data?.recommendations?.length,
    }),
    [data?.recommendations, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function useReviewEngagementGetEngagementEvent(engagementEventId) {
  let url = engagementEventId
    ? [reviewEngagementEndpoints.engagementEvent.getEngagementEvent]
    : "";

  url =
    url && url.map((u) => u.replace(":engagementEventId", engagementEventId));

  const { data, isLoading, error, isValidating } = useSWR(
    url,
    fetcher,
    swrOptions,
  );

  const memoizedValue = useMemo(
    () => ({
      engagementevent: data?.engagementEvent,
      engagementeventLoading: isLoading,
      engagementeventError: error,
      engagementeventValidating: isValidating,
    }),
    [data?.product, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function useReviewEngagementListEngagementEvents() {
  const url = [reviewEngagementEndpoints.engagementEvent.listEngagementEvents];

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.engagementevents || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty:
        !isLoading && !isValidating && !data?.engagementevents?.length,
    }),
    [data?.engagementevents, error, isLoading, isValidating],
  );

  return memoizedValue;
}
