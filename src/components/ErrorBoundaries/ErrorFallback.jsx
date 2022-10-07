export default function ErrorFallback({error, resetErrorBoundary, children}) {
  return (
    <div role="alert">
      {error ? (
        <div>
          <p>Something went wrong:</p>
          <pre>{error.message}</pre>
          <button onClick={resetErrorBoundary}>Try again</button>
        </div>
      ) : (
        children
      )}
    </div>
  )
}
