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

      if (error) {
        if (process.env.NODE_ENV === "development") {
          console.error("Error getting session:", error.message);
        }
      }

      if (session?.user) {
        if (process.env.NODE_ENV === "development") {
          console.log("Auth: user session found", session.user);
        }
        setUser(session.user);
      } else {
        if (process.env.NODE_ENV === "development") {
          console.log("Auth: no session, user is guest");
        }
        setUser(false);
      }

      setLoading(false);
    };

    getSession();

    subscription = supabase.auth.onAuthStateChange((event, session) => {
      if (process.env.NODE_ENV === "development") {
        console.log("Auth event:", event);
      }
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

  return (
    <AuthContext.Provider value={{ user, loading }}>
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