"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import SocialLoginButton from "./SocialLoginButton";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { signIn } from "next-auth/react";

const registerSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(6).max(50),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(50),
});

interface AuthFormProps {
  type: "register" | "login";
}

const AuthForm = ({ type }: AuthFormProps) => {
  const [loading, setLoading] = useState(false);

  const schema = type === "register" ? registerSchema : loginSchema;
  const form = useForm<z.infer<typeof registerSchema> | z.infer<typeof loginSchema>>({
    resolver: zodResolver(schema),
    defaultValues: type === "register" ? {
      username: "",
      email: "",
      password: "",
    } : {
      email: "",
      password: "",
    } as z.infer<typeof loginSchema>,
  });



  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof schema>) {
    if (type === "register") {
      try {
        setLoading(true);
        const res = await axios.post("/api/auth/register", values);
        form.reset();
        toast.success(res.data.message);
      } catch {
        toast.error("An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      console.log(values);
      try {
        const res = await axios.post("/api/checkcredentials", {
          email: values.email,
          password: values.password,
        });
        if(res.data === "Success"){
          signIn("credentials", {
            email: values.email,
            password: values.password,
            callbackUrl: "/",
          });
        }
        toast.success("Logged in successfully.");
      } catch {
        toast.error("An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <div className="min-h-dvh bg-slate-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-5 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-2">
          {type === "register" ? "Register" : "Login"}
        </h1>
        <Form {...form}>
          <div className="mb-3">
            <p className="text-sm text-gray-500">
              {type === "register"
                ? "Create an account to continue"
                : "Login to your account"}
            </p>
          </div>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            {type === "register" && (
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Jane Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@mail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              style={{ marginTop: "2rem" }}
              disabled={loading}
            >
              {type === "register" ? "Register" : "Login"}
            </Button>
          </form>
        </Form>
        <div className="flex mt-1 items-center">
          <div className="flex-grow border-t border-slate-500"></div>
          <span className="mx-4 text-black">Or using</span>
          <div className="flex-grow border-t border-slate-500"></div>
        </div>
        <SocialLoginButton />

        <div className="mt-2">
          {type === "register" ? (
            <p>
              Already have an account?{" "}
              <Link href="/login" className="text-blue-500">
                Login
              </Link>
            </p>
          ) : (
            <p>
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-blue-500">
                Register
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
