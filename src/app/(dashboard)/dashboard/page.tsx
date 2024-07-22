import React, { FC } from "react";
import TextAuthForm from "~/app/_components/text-auth-form";

interface pageProps {
  children: React.ReactNode;
}

const page: FC<pageProps> = ({ children }) => {
  return (
    <>
      <TextAuthForm />
    </>
  );
};

export default page;
