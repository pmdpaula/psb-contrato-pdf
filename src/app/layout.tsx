import "@/app/globals.css";

import type { Metadata } from "next";
import { Ephesis, Roboto } from "next/font/google";

import { Providers } from "./providers";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

const ephesis = Ephesis({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-ephesis",
});

export const metadata: Metadata = {
  title: "Contrato Patricia Siqueira",
  description:
    "Aplicação para criação de contrato em PDF para Patricia Siqueira Bolos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${roboto.variable} ${ephesis.variable}`}
    >
      <head>
        {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        /> */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        {/* <meta
          name="google-signin-client_id"
          content={`${process.env.GOOGLE_CLIENT_ID}.apps.googleusercontent.com`}
        /> */}
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
