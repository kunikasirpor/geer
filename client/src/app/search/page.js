'use client'
import { useSearchParams } from 'next/navigation'
import React, { Suspense } from 'react'

function SearchComponent() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q')

  return (
    <div>
      <h1>Search Page</h1>
      <p>Query: {query}</p>
    </div>
  )
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading search...</div>}>
      <SearchComponent />
    </Suspense>
  )
}
