// "use server";

import { env } from "@/env";

export const SignInGoogle = () => {
  return (
    <>
      <div
        id="g_id_onload"
        data-client_id={`${env.GOOGLE_OAUTH_CLIENT_ID}`}
        data-login_uri={`${env.NEXT_PUBLIC_API_URL}/api/auth/callback/google`}
        data-auto_prompt="false"
        data-color_scheme="dark"
      ></div>
      <div
        // class="g_id_signin"
        data-type="standard"
        data-size="large"
        data-theme="outline"
        data-text="sign_in_with"
        data-shape="rectangular"
        data-logo_alignment="left"
        data-locale="pt_BR"
      ></div>
    </>
  );
};
