"use client";

import React from "react";
import { useScroll } from "../hooks/use-scroll";
import { Logo } from "./Logo";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ModeSwitch } from "./ModeSwitch";
import { Login } from "../auth/Login";


export const Navbar = () => {
  const scrolled = useScroll();

  return (
    <div
      className={cn(
        "z-50  bg-background fixed top-0 flex items-center w-full p-2 justify-between",
        scrolled && "border-b shadow-sm"
      )}
    >
      <Link href="/">
        <Logo/>
      </Link>
      
      <div className="flex items-center ml-auto">
        <div className="mr-3">
          <ModeSwitch/>
        </div>
        <Login/>
      </div>
      
    </div>
  );
};