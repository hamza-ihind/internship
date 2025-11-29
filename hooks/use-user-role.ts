import { useSession } from "next-auth/react";
import { useState } from "react";

export function useUserRole() {
  const { data: session } = useSession();

  if (!session) return null;
}
