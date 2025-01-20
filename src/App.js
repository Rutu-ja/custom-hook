import "./App.css";
import useFetchComments from "./hooks/useFetchComments";
import useAddComments from "./hooks/useAddComments";

function App() {
  const { comments, isLoading, error, refetch } = useFetchComments();
  const { commentRef, isSubmitting, submitError } = useAddComments(refetch);

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
