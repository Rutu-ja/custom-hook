import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  // state for fetching comments
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // state for adding comments
  const commentRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // fetch comments and manage local state
  useEffect(() => {
    const handleFetchComments = async () => {
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
    };
    handleFetchComments();
  }, []);

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
                postId: 1,
                name: "Anonymous",
                email: "anonymous@example.com",
                body: commentRef.current.value,
              }),
            }
          );

          const newComment = await response.json();
          setComments((prevComments) => [newComment, ...prevComments]);
          commentRef.current.value = ""; // Clear input after successful submission
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

  return (
    <div className="container">
      <h1>Comments</h1>

      {/* Comment input */}
      <div>
        <input
          ref={commentRef}
          type="text"
          placeholder="Type your comment and press Enter..."
          className="comment-input"
          disabled={isSubmitting}
        />
        {submitError && <p className="submit-error">{submitError}</p>}
        {isSubmitting && <p className="loading">Submitting comment...</p>}
      </div>

      {/* Loading state */}
      {isLoading && <div className="loading">Loading comments...</div>}

      {/* Error state */}
      {error && <div className="error">{error}</div>}

      {/* Comments list */}
      <div className="comments-list">
        {comments.map((comment) => (
          <div key={comment.id} className="comment-card">
            <h3 className="comment-author">{comment.name}</h3>
            <p className="comment-email">{comment.email}</p>
            <p className="comment-body">{comment.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
