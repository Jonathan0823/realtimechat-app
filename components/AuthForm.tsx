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

const formSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(6).max(50),
});

interface AuthFormProps {
  type: string;
}

const AuthForm = ({ type }: AuthFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
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
                    <Input placeholder="Enter your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              style={{ marginTop: "2rem" }}
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
