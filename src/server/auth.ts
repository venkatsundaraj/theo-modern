import { DrizzleAdapter } from "@auth/drizzle-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import DiscordProvider from "next-auth/providers/discord";

import { env } from "~/env";
import { db } from "~/server/db";
import {
  accounts,
  sessions,
  users,
  verificationTokens,
} from "~/server/db/schema";
import EmailProvider from "next-auth/providers/email";

import { Resend } from "resend";
/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
// declare module "next-auth" {
//   interface Session extends DefaultSession {
//     user: {
//       id: string;
//       // ...other properties
//       // role: UserRole;
//     } & DefaultSession["user"];
//   }

//   // interface User {
//   //   // ...other properties
//   //   // role: UserRole;
//   // }
// }

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }) as Adapter,

  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: env.NEXTAUTH_SECRET,
  providers: [
    EmailProvider({
      from: env.SMTP_FROM,
      sendVerificationRequest: async ({ identifier, url, provider }) => {
        // if (identifier !== "venkatesh@firebrandlabs.in") return;
        const user = await db.query.users.findFirst({
          where: (table, func) => func.eq(table.email, identifier),
        });
        const resend = new Resend(env.RESEND_API_KEY);
        const response = await resend.emails.create({
          from: provider.from as string,
          to: identifier,
          subject: "Regarding Authentication",
          text: `Click the link to login - ${url}`,
          headers: {
            "X-Entity-Ref-ID": new Date().getTime() + "",
          },
        });
        // console.log(response);
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        (session.user.id = token.id),
          (session.user.email = token.email),
          (session.user.name = token.name),
          (session.user.image = token.picture);
      }

      return session;
    },
    async jwt({ token, user }) {
      const dbUser = await db.query.users.findFirst({
        where: (table, func) => func.eq(table.email, token.email!!),
      });

      if (!dbUser) {
        if (user) {
          token.id = user.id;
        }
        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      };
    },
    redirect() {
      return "/dashboard";
    },
  },
};
// 1233
/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
