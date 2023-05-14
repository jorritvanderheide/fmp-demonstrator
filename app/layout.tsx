// Layout for all pages

import ContextProvider from "./components/ContextProvider";
import "../styles/globals.css";

export const metadata = {
  title: "",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ContextProvider>
          <main>{children}</main>
        </ContextProvider>
      </body>
    </html>
  );
}
