import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let subscription;

    const getSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(false);
      }

      setLoading(false);
    };

    getSession();

    subscription = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(false);
      }
    }).data.subscription;

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};