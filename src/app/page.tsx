import Link from "next/link";

import { api } from "~/trpc/server";
import Image from "next/image";

export const dynamic = "force-dynamic";

const IMAGE_DATA = [
  "https://utfs.io/f/a1a81bfe-e387-47ef-80f4-9cb7d276de19-2a0eht.png",
  "https://utfs.io/f/b01a0f6a-88a4-4a4c-b96c-7d6be62cea63-xndk9k.png",
  "https://utfs.io/f/e4e6f729-6e27-488c-818e-736b6b5ada6c-8u23eg.png",
  "https://utfs.io/f/8ee0230e-0f2a-4393-8a00-f53cff175c0b-u57gro.png",
  "https://utfs.io/f/d305773d-445e-49b8-aabc-1837ae7a4e5a-j8diko.png",
];
export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });
  // const allLists = await api.example.hello({ text: "Venkat" });

  const keys = await api.example.getKeys();

  return (
    <>
      <h4 className="w-screen py-4 text-violet-300">{keys?.title}</h4>
      <Link href={"/login"} className="text-primary text-xl font-semibold">
        Login
      </Link>
      <div className="grid grid-cols-3 gap-3">
        {IMAGE_DATA.map((item, i) => {
          return (
            <Image width={400} height={200} src={item} alt={"One"} key={i} />
          );
        })}
      </div>
    </>
  );
}
