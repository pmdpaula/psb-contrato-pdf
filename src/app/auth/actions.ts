"use server";

import { redirect } from "next/navigation";

// export const signInWithGithub = async () => {
//   const githubSignInUrl = new URL("login/oauth/authorize", "https://github.com");

//   githubSignInUrl.searchParams.set("client_id", env.GITHUB_OAUTH_CLIENT_ID);
//   githubSignInUrl.searchParams.set("redirect_uri", env.GITHUB_OAUTH_REDIRECT_URI);
//   githubSignInUrl.searchParams.set("scope", "user");

//   redirect(githubSignInUrl.toString());
// };

export const signInWithGoogle = async () => {
  const googleSignInUrl = new URL(
    "login/oauth/authorize",
    "https://google.com",
  );

  // googleSignInUrl.searchParams.set("client_id", env.GOOGLE_OAUTH_CLIENT_ID);
  // googleSignInUrl.searchParams.set(
  //   "redirect_uri",
  //   env.GOOGLE_OAUTH_REDIRECT_URI,
  // );
  // googleSignInUrl.searchParams.set("scope", "user");

  redirect(googleSignInUrl.toString());
};
