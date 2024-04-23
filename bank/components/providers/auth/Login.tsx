"use client"

import {client, deploymentChain } from "@/utils/constants"
import { ConnectButton, useActiveAccount } from "thirdweb/react"

export const Login =()=>{

    const isConnected= useActiveAccount();

    return(

        <div className="w-full h-[100vh] items-center justify-center flex">
            <ConnectButton client={client} chain={deploymentChain}/>
        </div>
    )
}