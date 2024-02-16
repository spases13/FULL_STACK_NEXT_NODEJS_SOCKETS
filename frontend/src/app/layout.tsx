import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Chat App",
  description: "Chat App Using Socket IO and Node Js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.cdnfonts.com/css/poppins"
          rel="stylesheet"
        ></link>
       <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'></link>
      </head>
      <body>{children}</body>
    </html>
  );
}
