import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";
import middleware from "next-auth/middleware";

export default withAuth(
  async function middleware(req: NextRequest) {
    let url = req.nextUrl.pathname;
    const token = await getToken({ req });
    const isAuth = !!token;

    const protectedRoutes = ["/dashboard", "/hospital", "/details"];
    const authRoutes = ["/login", "/register"];

    const isInAuthPages = authRoutes.some((route) => url.includes(route));
    const isInProtectedRoutes = protectedRoutes.some((route) =>
      url.includes(route),
    );

    if (isInAuthPages) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }

      return NextResponse.next();
    }
    console.log(token, isAuth, isInProtectedRoutes);
    if (!isAuth && isInProtectedRoutes) {
      if (req.nextUrl.search) {
        url += req.nextUrl.search;
      }
      return NextResponse.redirect(
        new URL(`/login?from=${encodeURIComponent(url)}`, req.url),
      );
    }
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  },
);

export const config = {
  matcher: ["/", "/login", "/dashboard/:path*", "/hospital/:path*", "/details"],
};
