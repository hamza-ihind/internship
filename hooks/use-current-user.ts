import { useSession } from 'next-auth/react';

export function useCurrentUser() {
  const { data: session } = useSession();

  if (!session) return null;

  return {
    id: session.user?.id,
    name: session.user?.name,
    email: session.user?.email,
    image: session.user?.image,
  };
}
