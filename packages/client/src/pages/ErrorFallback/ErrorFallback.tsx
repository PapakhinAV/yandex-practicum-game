import React from 'react'

const ErrorFallback: React.FC<{ error: Error }> = ({ error }) => (
  <div>
    <p>Something went wrong:</p>
    <p>{error.message}</p>
  </div>
)

export default ErrorFallback
