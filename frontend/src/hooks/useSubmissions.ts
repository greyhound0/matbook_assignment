import { useQuery } from "@tanstack/react-query";

export function useSubmissions(
  page: number,
  limit: number,
  sortOrder: "asc" | "desc"
) {
  return useQuery({
    queryKey: ["submissions", page, limit, sortOrder],

    queryFn: async (): Promise<any> => {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        sortBy: "createdAt",
        sortOrder,
      });

      const res = await fetch(
        `http://localhost:5000/api/submissions?${params.toString()}`
      );
      if (!res.ok) throw new Error("Failed to load submissions");
      return res.json();
    },
  });
}
