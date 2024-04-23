"use client";

import { useTheme } from "next-themes";
import { Loader, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

export const ModeSwitch=()=> {
    const [mounted, setMounted]= useState(false);
    const {setTheme, resolvedTheme}= useTheme();

    useEffect(()=> setMounted(true),[]);

    if (!mounted) return(
        <Loader className="w-4 h-4"/>
    )

    if(resolvedTheme==="dark"){
        return (
            <Button onClick={()=>setTheme("light")} size="icon" variant="outline">
                <Sun className="w-full h-full items-center"/>
            </Button>
        )
    }
    if(resolvedTheme==="light"){
        return (
            <Button onClick={()=>setTheme("dark")} size="icon" variant="outline">
                <Moon className="w-full h-full items-center"/>
            </Button>
        )
    }
}