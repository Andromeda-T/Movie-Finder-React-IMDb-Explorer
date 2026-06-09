import { useEffect, useState } from "react";

const key = "54d24107";

export function useMovies(query) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState("");
    useEffect(() => {
        const controller = new AbortController();

        async function fetchMovies() {
            try {
                if (query.length < 3) throw new Error("Search for your movie");
                setIsError("");
                setIsLoading(true);
                const res = await fetch(
                    `http://www.omdbapi.com/?apikey=${key}&s=${query}`,
                    { signal: controller.signal }
                );

                if (!res.ok) throw new Error("Something went Wrong");
                setIsLoading(false);

                const data = await res.json();

                if (data.Response === "False") throw new Error(data.Error);

                setIsError("");
                setMovies(data.Search);
            } catch (err) {
                if (err.name !== "AbortError") {
                    setIsError(err.message);
                }
            } finally {
                setIsLoading(false);
            }
        }
        fetchMovies();

        return () => controller.abort();
    }, [query]);
    return { movies, isLoading, isError };
}
