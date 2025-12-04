import React from 'react'
import { Link } from 'react-router'

const ErrorPage = () => {
  return (
    <div> <h1>Error Page 404</h1>
        <Link to="/">Go to Home</Link>
    </div>
  )
}

export default ErrorPage