import { useState } from "react";
import { useQuery } from "react-query";

import type { Staff } from "@shared/types";

import { filterByTreatment } from "../utils";

import { axiosInstance } from "@/axiosInstance";
import { queryKeys } from "@/react-query/constants";

// query function for useQuery
async function getStaff(): Promise<Staff[]> {
  const { data } = await axiosInstance.get("/staff");
  return data;
}

export function useStaff() {
  // for filtering staff by treatment
  const [filter, setFilter] = useState("all");

  // TODO: get data from server via useQuery
  const fallback: [] = [];
  const { data: staff = fallback } = useQuery(queryKeys.staff, getStaff);

  return { staff, filter, setFilter };
}
