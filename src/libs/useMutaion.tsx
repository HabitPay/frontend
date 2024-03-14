import axios from "axios";
import { useState } from "react";

export interface MutationResult {
  ok: boolean;
}

interface UseMutationState<T> {
  loading: boolean;
  data?: T;
  error?: object;
}

// useMutationd의 Return값, [api에 post하는 함수, UseMutationState<T>객체]
type UseMutationResult<T> = [(data: any) => void, UseMutationState<T>];

export default function useMutation<T = any>(
  url: string
): UseMutationResult<T> {
  const [state, setState] = useState<UseMutationState<T>>({
    loading: false,
    data: undefined,
    error: undefined,
  });

  function mutation(data: any) {
    setState((prev) => ({ ...prev, loading: true }));

    axios
      .post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) =>
        setState((prev) => ({ ...prev, data: response.data, loading: false }))
      )
      .catch((error) =>
        setState((prev) => ({ ...prev, error, loading: true }))
      );
  }
  return [mutation, { ...state }];
}
