"use client";

import { Banking } from "@/components/banking/Banking";
import { Navbar } from "@/components/common/Navbar";
import { useTheme } from "next-themes";
import Image from "next/image";

export default function Home() {

  const {resolvedTheme}= useTheme();
  return (
  <div>
    <div style={{
      zIndex: -1,
      position: "fixed",
      width: "100vw",
      height: "100vh"
    }}>
      {resolvedTheme==="light"? (
        <Image 
        src="/light-wallpaper.png"
        alt="light mode wallpaper"
        layout="fill"
        objectFit='cover'
        className="blur-sm"
      />
      ): (
        <Image 
        src="/dark-wallpaper.png"
        alt="dark mode wallpaper"
        layout="fill"
        objectFit='cover'
        className="blur-sm"
      />
      )}
      </div>
      <div>
        <Navbar/>
      <div className="gap-9 p-44 mt-10 items-center justify center">
        <Banking/>
      </div>
    </div>
  </div>
  );
}
