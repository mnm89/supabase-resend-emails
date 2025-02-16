"use client";
import React, { createContext, useContext } from "react";
import { User } from "@supabase/supabase-js";
import { Database } from "@supabase-types";

interface IUserProfileContext {
  user: User;
  profile: Database["public"]["Tables"]["profiles"]["Row"];
}
interface IUserProfileProps extends React.ComponentPropsWithoutRef<"section"> {
  user: User;
  profile: Database["public"]["Tables"]["profiles"]["Row"];
}

const UserProfileContext = createContext<IUserProfileContext | undefined>(
  undefined
);

export function UserProfileProvider({
  children,
  user,
  profile,
  ...props
}: IUserProfileProps) {
  return (
    <UserProfileContext.Provider value={{ user, profile }}>
      <section {...props}>{children}</section>
    </UserProfileContext.Provider>
  );
}

export function useUserProfile() {
  const context = useContext(UserProfileContext);
  if (!context)
    throw new Error(
      "useUserProfile can not be used outside of a UserProfileProvider component"
    );
  return context;
}
