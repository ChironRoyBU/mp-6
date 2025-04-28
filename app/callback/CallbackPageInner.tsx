'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';

type User = {
  login: string;
  name: string;
  email: string;
  avatar_url: string;
};

export default function CallbackPageInner() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const [user, setUser] = useState<User | null>(null);
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
        console.error(err);
        setError('Something went wrong.');
      }
    })();
  }, [code]);

  if (error) return <p>{error}</p>;
  if (!user) return <p>Loading user info...</p>;

  return (
    <div className="text-center">
      <h1 className="text-2xl mb-4">Welcome, {user.name || user.login}!</h1>
      <Image
        src={user.avatar_url}
        alt="Avatar"
        width={96}
        height={96}
        className="w-24 h-24 rounded-full mx-auto"
      />
      <p className="mt-2">{user.email}</p>
    </div>
  );
}
