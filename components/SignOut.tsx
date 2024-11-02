"use client";
import { signOut, useSession } from "next-auth/react";

const SignOut =  () => {
    const { data: session } = useSession()
    console.log(session)
  return (
    <div>
      {session && (
        <button onClick={ () =>  signOut()}>Sign Out</button>
      )}
    </div>
  );
};

export default SignOut;
