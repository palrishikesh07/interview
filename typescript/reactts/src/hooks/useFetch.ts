import { stat } from "fs";
import { useState } from "react";

interface IfetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export default function useFetch<T>(url: string): IfetchState<T> {
  const [state, setState] = useState<IfetchState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  return state;
}
