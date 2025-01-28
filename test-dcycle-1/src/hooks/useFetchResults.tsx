import { useState } from "react";
import { fetchData } from "api/fetchData";

export const useFetchResults = () => {
  const [results, setResults] = useState<Results | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const getResults = async (name: string) => {
    if (!name) return;

    setLoading(true);
    setError(false);

    try {
      const [gender, nationality, agify] = await Promise.all([
        fetchData("genderize", name),
        fetchData("nationalize", name),
        fetchData("agify", name),
      ]);

      if (!gender.gender && !agify.age) {
        setError(true);
        setResults(null);
      } else {
        setResults({
          name: name,
          agify: gender,
          country: nationality.country,
          age: agify.age,
        });
      }
    } catch (error) {
      setError(true);
      console.error("Error obteniendo datos:", error);
    } finally {
      setLoading(false);
    }
  };

  return { results, error, loading, getResults };
};
