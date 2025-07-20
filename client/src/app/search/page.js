import React, { Suspense } from 'react';
import SearchComponent from './SearchResults';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading search...</div>}>
      <SearchComponent />
    </Suspense>
  );
}
