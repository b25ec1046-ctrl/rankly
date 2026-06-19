import { createContext, useState, useEffect, useContext } from "react";
import { ProfileContext } from "./ProfileContext";
import { supabase } from "../lib/supabase";

export const PostContext = createContext();

export function PostProvider({ children }) {
  const { profile } = useContext(ProfileContext);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    setPosts(data);
  };
  const addPost = async () => {
    await fetchPosts();
  };
  const likePost = async (postId) => {
    // alert("likePost running");
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login first");
      return;
    }

    const { data: existingLike } = await supabase
      .from("post_likes")
      .select("*")
      .eq("post_id", postId)
      .eq("user_id", user.id)
      .maybeSingle();

    if (existingLike) {
      await supabase
        .from("post_likes")
        .delete()
        .eq("post_id", postId)
        .eq("user_id", user.id);

      const post = posts.find((p) => p.id === postId);

      await supabase
        .from("posts")
        .update({
          likes: Math.max(0, post.likes - 1),
        })
        .eq("id", postId);
      // await supabase.rpc("increment_points", {
      //   profile_id: post.user_id,
      //   points_to_add: -1,
      // });
    } else {
      const postOwner = posts.find((p) => p.id === postId);
      const likedPost = posts.find((p) => p.id === postId);

      if (likedPost.user_id !== user.id) {
        const { error: notifError } = await supabase
          .from("notifications")
          .insert([
            {
              user_id: likedPost.user_id,
              sender_id: user.id,
              sender_name:
                user.user_metadata?.username ||
                user.email?.split("@")[0] ||
                "User",
              type: "like",
              post_id: postId,
              message: `${
                user.user_metadata?.username ||
                user.email?.split("@")[0] ||
                "User"
              } liked your post ❤️`,
            },
          ]);
        await supabase.rpc("increment_points", {
          profile_id: likedPost.user_id,
          points_to_add: 1,
        });
        await supabase.rpc("increment_points", {
          profile_id: post.user_id,
          points_to_add: -1,
        });
      }

      await supabase.from("post_likes").insert([
        {
          post_id: postId,
          user_id: user.id,
          username: profile?.username || "user",
        },
      ]);
      const post = posts.find((p) => p.id === postId);

      await supabase
        .from("posts")
        .update({
          likes: post.likes + 1,
        })
        .eq("id", postId);
    }

    fetchPosts();
  };

  const deletePost = async (id, imageUrl) => {
    const fileName = imageUrl.split("/").pop();

    await supabase.storage.from("posts").remove([fileName]);

    const { error } = await supabase.from("posts").delete().eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    setPosts((prev) => prev.filter((post) => post.id !== id));
  };
  return (
    <PostContext.Provider
      value={{
        posts,
        addPost,
        deletePost,
        likePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
