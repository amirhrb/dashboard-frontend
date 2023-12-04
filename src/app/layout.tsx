import type { Metadata } from "next";

//local font opt
import HelveticaNeueFont from "@/fonts/HelveticaNeue/font";

//default css
import "bootstrap/dist/css/bootstrap.css";
import "./custom.scss";
import "./globals.css";

//load bootstrap js bundle on-mount
import BootstrapClient from "@/components/providers/BootstrapClient";

//thanstack query client provider
import QueryProvider from "@/components/providers/QueryProvider";

//context
import AuthContextProvider from "@/components/providers/UserContextProvider";
import TagsProvider from "@/components/providers/TagsProvider";

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
        <QueryProvider>
          <AuthContextProvider>
            <BootstrapClient>
              <TagsProvider>{children}</TagsProvider>
            </BootstrapClient>
          </AuthContextProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
