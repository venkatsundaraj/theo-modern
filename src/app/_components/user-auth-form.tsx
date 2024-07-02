"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "~/lib/utils";
import { userAuthSchema } from "~/lib/validations/email-validation";
import { buttonVariants } from "~/app/_components/ui/button";
import { Input } from "~/app/_components/ui/input";
import { Label } from "~/app/_components/ui/label";
import { Icons } from "~/app/_components/icons";
import { AxiosError } from "axios";
import { toast } from "~/app/_components/ui/use-toast";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof userAuthSchema>;

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const searchParams = useSearchParams();
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  });

  async function onSubmit(data: FormData) {
    try {
      const res = await signIn("email", {
        email: data.email.toLowerCase(),
        redirect: false,
        callbackUrl: searchParams.get("from") || "/dashboard",
      });
      if (!res?.ok) {
        return toast({
          title: "Something went wrong",
          description: "Your sign in request failed. Please try again.",
          variant: "destructive",
        });
      }

      toast({
        title: "Please check your mail",
        description:
          "We sent you a login link. Be sure to check your spam too.",
      });
      return reset();
    } catch (err) {
      if (err instanceof AxiosError) {
        return setError("root", { message: err.message });
      }
      if (err instanceof z.ZodError) {
        return setError("root", { message: err.message });
      }
      return setError("root", { message: "Something went wrong" });
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isSubmitting}
              {...register("email")}
            />
            {errors?.email ? (
              <p className="text-destructive h-4 px-1 text-xs">
                {errors.email.message}
              </p>
            ) : (
              <p className="h-4"></p>
            )}
          </div>
          <button
            className={cn(buttonVariants({ size: "lg" }))}
            disabled={isSubmitting}
          >
            {isSubmitting && (
              <Icons.Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </button>
        </div>
      </form>
    </div>
  );
}
