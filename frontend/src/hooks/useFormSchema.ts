import { useQuery } from "@tanstack/react-query";

export function useFormSchema() {
  return useQuery({
    queryKey: ["form-schema"],
    queryFn: async () => {
      console.log("Fetching /api/form-schema...");
      const res = await fetch(
        "https://onboarding-form1.onrender.com/api/form-schema"
      );
      console.log("Response status:", res.status);
      if (!res.ok) throw new Error("Failed to load form schema");
      const json = await res.json();
      console.log("Schema JSON:", json);
      return json;
    },
  });
}
