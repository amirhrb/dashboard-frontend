import type { Metadata } from "next";

//local font opt
import HelveticaNeueFont from "@/fonts/HelveticaNeue/font";

//default css
import "bootstrap/dist/css/bootstrap.css";
import "./globals.css";

//load bootstrap js bundle on-mount
import BootstrapClient from "@/components/providers/BootstrapClient";

export const metadata: Metadata = {
  title: "Arvan Challenge Dashboard",
  description: "a dashboard to control blogs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={HelveticaNeueFont.className}>
        {children}
        <BootstrapClient />
      </body>
    </html>
  );
}
