import { notFound } from "next/navigation";
import React, { FC } from "react";
import TextAuthForm from "~/app/_components/text-auth-form";
import { getCurrentUser } from "~/lib/session";

interface pageProps {
  children: React.ReactNode;
}

const page = async ({ children }: pageProps) => {
  const user = await getCurrentUser();
  if (!user) notFound();
  return (
    <>
      <TextAuthForm />
    </>
  );
};

export default page;
