import { useState, useEffect, useRef } from "react";

/**
 * useFetch - custom hook to fetch JSON and optionally resolve sub-requests.
 * @param {string} url - primary URL to fetch
 * @param {object} options - { resolveDetails?: boolean } when the primary endpoint returns item urls that must be fetched
 */
export default function useFetch(url, options = {}) {
  const { resolveDetails = false } = options;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(Boolean(url));
  const [error, setError] = useState(null);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    if (!url) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    async function fetchData() {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
        const json = await res.json();

        if (resolveDetails && Array.isArray(json.results)) {
          // fetch each detail concurrently
          const detailPromises = json.results.map((r) => fetch(r.url).then((r) => {
            if (!r.ok) throw new Error("detail fetch failed");
            return r.json();
          }));
          const details = await Promise.all(detailPromises);

          // map to useful minimal objects
          const mapped = details.map((d) => ({
            id: d.id,
            name: d.name,
            sprites: d.sprites,
            types: d.types.map((t) => t.type.name),
            base_experience: d.base_experience,
          }));

          if (mounted.current) {
            setData(mapped);
            setLoading(false);
          }
        } else {
          if (mounted.current) {
            setData(json);
            setLoading(false);
          }
        }
      } catch (err) {
        if (mounted.current) {
          setError(err);
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      mounted.current = false;
    };
  }, [url, resolveDetails]);

  return { data, loading, error };
}
