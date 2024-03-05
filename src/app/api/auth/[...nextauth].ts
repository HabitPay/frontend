import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId:
        "957321976468-mreg0vucneh2frl7hkq90ki7c60htm6q.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
});

export { handler as GET, handler as POST };
