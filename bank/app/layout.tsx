import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThirdwebProvider } from "@/components/providers/thirdweb";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/providers/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Orias Bank",
  description: "Decentralized Bank",
  icons: {
    icon: "/OriasLogo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThirdwebProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          <div>
            {children}
          </div>
          <Toaster/>
          </ThemeProvider>
        </ThirdwebProvider>
      </body>
    </html>
  );
}
