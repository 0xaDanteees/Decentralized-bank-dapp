import {client, deploymentChain } from "@/utils/constants"
import { useTheme } from "next-themes";
import { ConnectButton, useActiveAccount } from "thirdweb/react"

export const Login =()=>{
    const { resolvedTheme } = useTheme();

    return(

        <div className=" items-center justify-center flex">
            <ConnectButton 
                client={client}
                chain={deploymentChain}
                theme={resolvedTheme}
                connectModal={{
                    size: "compact",
                    title: "Orias Bank",
                    titleIcon: "./OriasLogo.png",
                    welcomeScreen: { title: "Welcome to Orias Bank" },
                }}
                />
        </div>
    )
}