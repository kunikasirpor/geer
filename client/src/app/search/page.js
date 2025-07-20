'use client'

import { Suspense } from 'react';
import SearchResults from './SearchResults';

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center py-10">Loading search...</div>}>
      <SearchResults />
    </Suspense>
  );
}
