import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function useCharacters(url, query) {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchCharacters() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${url}=${query}`, { signal });

        setCharacters(data.results.slice(0, 10));
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("fetch is canceled!");
        } else {
          setCharacters([]);
          toast.error(err.response.data.error, {
            style: {
              fontWeight: "bold",
              fontSize: "1rem",
            },
          });
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchCharacters();

    return () => {
      controller.abort();
    };
  }, [query]);

  return { characters, isLoading };
}
