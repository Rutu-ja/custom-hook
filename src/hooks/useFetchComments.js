import { useCallback, useEffect, useState } from "react";

export default function useFetchComments() {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetchComments = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/comments"
      );
      const data = await response.json();
      setComments(data.slice(0, 10)); // Limiting to 10 comments for example
    } catch (error) {
      setError("Failed to fetch comments");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    handleFetchComments();
  }, [handleFetchComments]);
  return { comments, isLoading, error, refetch: handleFetchComments };
}
