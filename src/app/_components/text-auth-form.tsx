"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { Button } from "~/app/_components/ui/button";
import { Input } from "~/app/_components/ui/input";
import {
  textValidation,
  textValidationType,
} from "~/lib/validations/text-validation";
import { Label } from "./ui/label";

interface pageProps {}

const TextAuthForm: FC<pageProps> = ({}) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<textValidationType>({
    resolver: zodResolver(textValidation),
  });

  const onSubmit = function (data: textValidationType) {
    reset();
  };
  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <form
        className="flex w-80 flex-col items-center justify-center gap-2 gap-2 rounded-md border border-primary p-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Label>Name</Label>
        <Input
          className="w-full"
          {...register("text")}
          type="text"
          autoCapitalize="none"
        />
        <Label>Age</Label>
        <Input
          className="w-full"
          {...register("age")}
          type="text"
          autoCapitalize="none"
        />
        <Button type="submit" disabled={isSubmitting}>
          Submit
        </Button>
      </form>
    </main>
  );
};

export default TextAuthForm;
