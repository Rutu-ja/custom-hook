import { useEffect, useRef, useState } from "react";

export default function useAddComments(onSuccess) {
  const commentRef = useRef(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    const listener = async (event) => {
      if (event.key === "Enter" && commentRef.current?.value) {
        setIsSubmitting(true);
        setSubmitError(null);
        try {
          const response = await fetch(
            "https://jsonplaceholder.typicode.com/comments",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id: 1,

                body: commentRef.current.value,
              }),
            }
          );
          response.status === 201 && onSuccess();
        } catch (error) {
          setSubmitError("Failed to add comment");
        } finally {
          setIsSubmitting(false);
        }
      }
    };

    window.addEventListener("keydown", listener);
    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);
  return { commentRef, isSubmitting, submitError };
}
