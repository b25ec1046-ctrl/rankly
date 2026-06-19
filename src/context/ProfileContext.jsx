import { createContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
console.log("ProfileContext Loaded");

export const ProfileContext = createContext();

const defaultProfile = {
  id: "",
  name: "Guest User",
  username: "",
  email: "",
  bio: "",
  photo: "",
  points: 0,
  isLoggedIn: false,
};

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(defaultProfile);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log("ProfileProvider mounted");
    checkUser();
  }, []);

  // const checkUser = async () => {
  //   const {
  //     data: { session },
  //   } = await supabase.auth.getSession();

  //   if (!session?.user) return;

  //   const { data: profileData } = await supabase
  //     .from("profiles")
  //     .select("*")
  //     .eq("id", session.user.id)
  //     .single();

  //   if (profileData) {
  //     setProfile({
  //       ...profileData,
  //       isLoggedIn: true,
  //     });
  //   }
  // };
  const checkUser = async () => {
    setLoading(true);
    const {
      data: { session },
    } = await supabase.auth.getSession();

    console.log("Session:", session);

    if (!session?.user) {
      setLoading(false);
      return;
    }

    const { data: profileData, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .single();

    console.log("ProfileData:", profileData);
    console.log("ProfileError:", error);
    console.log("Current Profile:", profile);
    // if (!profile.isLoggedIn) {
    //   console.log("Redirecting to Login");
    //   return <Navigate to="/login" replace />;
    // }
    if (!error && profileData) {
      setProfile({
        ...profileData,
        isLoggedIn: true,
      });
    }
    setLoading(false);
  };
  const refreshProfile = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) return;

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .single();

    if (data) {
      setProfile({
        ...data,
        isLoggedIn: true,
      });
    }
  };
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth Event:", event);

      if (session?.user) {
        checkUser();
      } else {
        setProfile(defaultProfile);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const updateProfile = (data) => {
    setProfile((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const login = (userData) => {
    setProfile({
      ...userData,
      isLoggedIn: true,
    });
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setProfile(defaultProfile);
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        loading,
        updateProfile,
        login,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}
