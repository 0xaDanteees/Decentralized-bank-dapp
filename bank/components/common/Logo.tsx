import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Image from "next/image";

const font = Poppins({
    subsets: ["devanagari"],
    weight: ["400","600"]
});

export const Logo =()=>{

    return(
        <div className="hidden md:flex items-center gap-x-2">
            <Image
            src="/oriasLogo.png"
            height={40}
            width={40}
            alt="Logo"
            />
            <p className={cn("font-extrabold text-black dark:text-white", font.className)}>
                Orias Bank
            </p>
        </div>
    )
}