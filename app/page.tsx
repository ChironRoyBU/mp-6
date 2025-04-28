'use client';
import React from 'react';

export default function Home() {
  const params = new URLSearchParams({
    client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID!,
    redirect_uri: process.env.NEXT_PUBLIC_DEV_REDIRECT!,
    scope: process.env.NEXT_PUBLIC_GITHUB_SCOPE!,
  });

  const githubLoginUrl = `https://github.com/login/oauth/authorize?${params.toString()}`;

  return (
    <main className="flex flex-col gap-4 items-center">
      <h1 className="text-2xl font-semibold">GitHub OAuth</h1>
      <a
        className="bg-black text-white px-6 py-2 rounded"
        href={githubLoginUrl}
      >
        Sign in with GitHub
      </a>
    </main>
  );
}
