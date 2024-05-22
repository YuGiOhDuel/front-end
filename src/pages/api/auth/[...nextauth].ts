import CredentialsProvider from "next-auth/providers/credentials";
import { AuthAdapter } from "@/api/adapter/AuthAdapter";
import { ApiAdapter } from "@/api/adapter/ApiAdapter";
import NextAuth from "next-auth";

export const authOptions = {
    pages: {
        signIn: '/signin',
        signOut: '/signout'
      },
      providers: [
        CredentialsProvider({
          name: "Credentials",
          credentials: {
            
          },
          async authorize(
            credentials: any,
            req
          ) {
            console.log("found")
            const apiAdapter = new ApiAdapter();
            const authAdapter = new AuthAdapter(apiAdapter);
            const data = await authAdapter.signIn({
              username: credentials.username,
              password: credentials.password
            });
            return {
              ...data,
              id: data._id
            };
          }
        }),
      ],
    
      callbacks: {
        async session(
          {
            session,
            user,
            token
          }: any
        ) {
          session.user = token;
          return session;
        },
        async jwt(
          {
            token,
            user,
          }: any
        ) {
          return { ...token, ...user };
        }
    
      }
}

export default NextAuth(authOptions);