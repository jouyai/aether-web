import React, { createContext, useContext, useEffect, useReducer } from "react";
import { supabase } from "@/lib/supabaseClient";

const AuthContext = createContext();

// Definisikan state awal
const initialState = {
  user: null,
  username: null,

  loading: true,
};

// Reducer untuk mengelola perubahan state
function authReducer(state, action) {
  switch (action.type) {
    case 'AUTH_STATE_CHANGE':
      return {
        ...state,
        user: action.payload.user,
        username: action.payload.username,
      };
    case 'LOADING_COMPLETE':
      return {
        ...state,
        loading: false,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // onAuthStateChange adalah satu-satunya sumber kebenaran
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      let username = null;
      if (session?.user) {
        // Jika ada sesi, ambil profil
        const { data: profile } = await supabase
          .from("profiles")
          .select("username")
          .eq("id", session.user.id)
          .single();
        username = profile?.username || null;
      }
      
      // Kirim perubahan state ke reducer
      dispatch({ type: 'AUTH_STATE_CHANGE', payload: { user: session?.user || null, username } });
      
      // Selesaikan loading setelah pengecekan awal
      if (state.loading) {
        dispatch({ type: 'LOADING_COMPLETE' });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []); // <-- Array dependensi dikosongkan untuk mencegah loop

  const value = {
    ...state, // Sebarkan semua state (user, username, loading)
    signOut: () => supabase.auth.signOut(),
  };

  return (
    <AuthContext.Provider value={value}>
      {!state.loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};