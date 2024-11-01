import React from "react";
import { Button } from "./ui/button";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import { signIn } from "next-auth/react";

const SocialLoginButton = () => {
  return (
    <div className="flex justify-center mt-2 gap-2">
      <Button
        className="w-full border border-slate-600 hover:bg-slate-200"
        variant="secondary"
        onClick={() => signIn("github")}
      >
        <GitHubIcon className="w-7 h-7" />
        Github
      </Button>
      <Button
        className="w-full border border-slate-600 hover:bg-slate-200"
        variant="secondary"
        onClick={() => signIn("google")}
      >
        <GoogleIcon className="w-7 h-7" />
        Google
      </Button>
    </div>
  );
};

export default SocialLoginButton;
