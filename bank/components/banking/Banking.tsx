"use client"
import React from 'react';
import { CONTRACT } from "@/utils/constants";
import { TransactionButton, useActiveAccount, useReadContract } from "thirdweb/react";
import { prepareContractCall, toEther } from 'thirdweb';
import { toast } from 'sonner';
import { Loader } from 'lucide-react';

export const Banking: React.FC = () => {
    
    const account= useActiveAccount();

    const { data, isLoading, refetch } = useReadContract({
        contract: CONTRACT,
        method: "balances",
        params: [account?.address as string],
        queryOptions: {
            enabled: !!account,
        }
    });
    console.log(data)
    return (
        <div className="text-center py-4 font-extrabold">
            <h1 className="text-xl">Balance</h1>
            {isLoading ? (
                <h2 className="text-lg items-center justify-center flex"><Loader/></h2>
            ) : (
                <h2 className="text-lg">{toEther(data!)} ETH</h2>
            )}  
        </div>
    );
}
