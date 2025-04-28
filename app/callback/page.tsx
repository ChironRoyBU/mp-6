'use client';
import { Suspense } from 'react';
import CallbackPageInner from './CallbackPageInner';

export default function CallbackPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <CallbackPageInner />
    </Suspense>
  );
}
