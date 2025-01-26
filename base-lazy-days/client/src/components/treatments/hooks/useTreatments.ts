import { useQuery, useQueryClient } from "react-query";

import type { Treatment } from "@shared/types";

import { axiosInstance } from "@/axiosInstance";
import { queryKeys } from "@/react-query/constants";

// for when we need a query function for useQuery
async function getTreatments(): Promise<Treatment[]> {
  const { data } = await axiosInstance.get("/treatments");
  return data;
}

export function useTreatments(): Treatment[] {
  const fallback: [] = [];
  const { data = fallback } = useQuery(
    queryKeys.treatments,
    getTreatments
    //   {
    //   staleTime: 600000, // время когда данные будут считаться свежими спустя последнего запроса по этому ключу queryKeys.treatments
    //   cacheTime: 900000, // время когда данные будут считаться актуальными, после этого времени кэш будет аннулирован
    //   refetchOnMount: false,
    //   refetchOnWindowFocus: false,
    //   refetchOnReconnect: false,
    //   // полностью убираем все условия обновления устаревших данных по ключу, время > staleTime
    // }
  );
  return data;
}

export function usePrefetchTreatments(): void {
  const queryClient = useQueryClient();
  queryClient.prefetchQuery(queryKeys.treatments, getTreatments);
}
