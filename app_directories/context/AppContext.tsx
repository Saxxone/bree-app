import {
  useContext,
  createContext,
  type PropsWithChildren,
  useMemo,
} from "react";
import { useStorageState } from "@/app_directories/services/useStorageState";

const AuthContext = createContext<{
  signIn: () => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

interface Props extends PropsWithChildren {
  readonly children: React.ReactNode;
}

export function SessionProvider({ children }: Props) {
  const [[is_loading, session], setSession] = useStorageState("session");

  const value = useMemo(() => {
    return {
      signIn: () => {
        // Perform sign-in logic here save user to state
        setSession("xxx");
      },
      signOut: () => {
        setSession(null);
      },
      session,
      isLoading: is_loading,
    };
  }, [is_loading, session, setSession]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
