import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  pages: {
      signIn: "/auth/signin",
  },
  // Callbacks enhance the user object that is returned from signing in with upgraded data
  callbacks: {
    async session({ session, token, user }) {
      // Create usernames off users name
      session.user.username = session.user.name.split(' ').join('').toLowerCase()
      session.user.uid = token.sub
      return session
    }
  },

//   Customizes default login screen

//   theme: {
//       logo: "https://links.papareact.com/sq0",
//       brandColor: "#F13287",
//       colorScheme: "auto",
//   },

})