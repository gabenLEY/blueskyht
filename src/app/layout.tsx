import { Metadata } from "next";
import "./globals.css";
import SessionWrapper from "../components/layout/SessionWrapper"; // Import the new SessionWrapper

export const metadata: Metadata = {
  title: "Hsky Web Client - Seamless Social Experience",
  description:
    "Discover a new way to connect with the decentralized social network using Hsky Web Client. Seamlessly interact, share, and explore dynamic communities with a user-friendly interface built for the next generation of social media. Fast, secure, and decentralized.",
  keywords: [
    "Hsky Web Client",
    "decentralized social network",
    "BlueSky client",
    "Next.js social platform",
    "user-friendly social media",
    "Bsky app",
    "decentralized apps",
    "social media platform",
    "secure social interaction",
    "modern social networking",
  ],
  authors: [
    { name: "Gabenley Bien Aime", url: "https://gabenley.com" },
    { name: "TransUp Tech", url: "https://transuptech.com" },
  ],
  openGraph: {
    title: "Bsky Web Client - Seamless Social Experience",
    description:
      "Effortlessly navigate the decentralized world with Bsky Web Client. Enjoy secure, fast, and innovative social networking built for the modern era.",
    url: "https://your-bskywebclient.com", // Replace with your actual site URL
    siteName: "Hsky Web Client",
    images: [
      {
        url: "https://your-bskywebclient.com/og-image.jpg", // Replace with your Open Graph image URL
        width: 1200,
        height: 630,
        alt: "Bsky Web Client Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hsky Web Client - Seamless Social Experience",
    description:
      "Experience the decentralized future with Hsky Web Client. Connect, share, and explore in a secure, user-friendly environment.",
    images: ["https://your-bskywebclient.com/twitter-image.jpg"], // Replace with your Twitter image URL
    creator: "@gabenley.bsky.social", // Replace with your Twitter handle
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
  themeColor: "#1E90FF", // Update with your brand's theme color
};

// Fetch session using getSession inside RootLayout
export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  return (
    <html lang="en">
      <body className={``}>
        {/* Wrap the children with SessionWrapper to pass the session */}
        <SessionWrapper>
          {children}
        </SessionWrapper>
      </body>
    </html>
  );
}