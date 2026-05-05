import { useRouter, useSearchParams } from "next/navigation";

// hooks/useQueryPush.ts
export const useQueryPush = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`?${params.toString()}`);
  };
};

// usage
// const pushQuery = useQueryPush();
// pushQuery("page", String(page));