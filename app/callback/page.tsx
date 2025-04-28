'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CallbackPage() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!code) return;

    (async () => {
      try {
        const tokenRes = await fetch('/api/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code }),
        });
        const { access_token } = await tokenRes.json();

        const userRes = await fetch('/api/user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: access_token }),
        });

        const userData = await userRes.json();
        setUser(userData);
      } catch (err) {
        setError('Something went wrong.');
      }
    })();
  }, [code]);

  if (error) return <p>{error}</p>;
  if (!user) return <p>Loading...</p>;

  return (
    <div className="text-center">
      <h1 className="text-2xl mb-4">Welcome, {user.name || user.login}!</h1>
      <img src={user.avatar_url} alt="Avatar" className="w-24 h-24 rounded-full mx-auto" />
      <p className="mt-2">{user.email}</p>
    </div>
  );
}
