import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { Icons } from "~/app/_components/icons";
import { UserAuthForm } from "~/app/_components/user-auth-form";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default function LoginPage() {
  return (
    <div className="container grid h-screen w-screen flex-row items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="flex h-full w-full items-center justify-center lg:flex">
        <Icons.Activity className="h-1/4 w-1/4 max-w-md stroke-1 text-primary/80" />
      </div>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Icons.Snail className="mx-auto h-8 w-8 text-primary" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email to sign in to your account
          </p>
        </div>
        <Suspense>
          <UserAuthForm />
        </Suspense>
      </div>
    </div>
  );
}
