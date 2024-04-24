"use client"
import React, { useEffect, useState } from 'react';
import { CONTRACT } from "@/utils/constants";
import { TransactionButton, useActiveAccount, useReadContract} from "thirdweb/react";
import { prepareContractCall, toEther, toWei } from 'thirdweb';
import { toast } from 'sonner';
import { Loader, XIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export const Banking: React.FC = () => {
    
    const account= useActiveAccount();

    const [isDepositing, setIsDepositing]=useState(false);
    const [isWithdrawing, setIsWithdrawing]=useState(false);
    const [withdrawAmount, setWidrawAmount]= useState(0);
    const [depositAmount, setDepositAmount]= useState(0);
    const [receiver, setReceiver]=useState("");
    const [isTransfering, setIsTransfering]=useState(false);
    const [transferAmount, setTransferAmount]=useState(0);

    const { data:balance, isLoading, refetch: refetchBalance, isError: withdrawError } = useReadContract({
        contract: CONTRACT,
        method: "balances",
        params: [account?.address as string],
        queryOptions: {
            enabled: !!account,
        }
    });
    //console.log("balance",balance)
    let accountBalance="";
    if(balance!==undefined && balance!==null){
        accountBalance=`${toEther(balance!).toString()} ETH`
    } else {
        accountBalance="No account detected";
    }

    useEffect(() => {
        setInterval(() => {
            refetchData();
        }, 10000);
    }, []);

    const refetchData=()=>{
        refetchBalance();
    };
    //console.log("amount", withdrawAmount)
    console.log("addy:", receiver)
    console.log("transfer amount: ", transferAmount)
    return (
        <div className="text-center py-4 mt-3 font-extrabold bg-secondary rounded-md">
            <h1 className="text-xl">Balance</h1>
            {isLoading ? (
                <h2 className="text-lg items-center justify-center flex"><Loader/></h2>
            ) : (
                <h2 className="text-lg">{accountBalance}</h2>
            )}
            
                    <div className='flex  flex-col items-center justify-center mt-6'>
                        <Button className='mt-3' onClick={()=>setIsDepositing(true)}>
                            Deposit
                        </Button>
                        {balance && (
                        <>
                            <Button className='mt-3' onClick={()=>setIsTransfering(true)}>
                                Transfer
                            </Button>
                            <Button className='mt-3' onClick={()=>setIsWithdrawing(true)}>
                                Withdraw
                            </Button>
                        </>
                         )}
                        
                    </div>
               
            
            {isWithdrawing && (
                <>
                    <div style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                            <div style={{
                                position: "relative",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                backgroundColor: "background",
                                padding: "40px",
                                borderRadius: "10px",
                                minWidth: "500px",
                            }}>
                            <Button
                                className="absolute top-2 right-2 px-3 py-1 rounded-md"
                                onClick={() => setIsWithdrawing(false)}
                                size="sm"
                                variant="ghost"
                            >
                                <XIcon className='text-xl text-red-600 w-full h-full'/>
                            </Button>
                            <h3 className="text-medium">Available balance: {accountBalance}</h3>
                            <Input
                                type="number"
                                min="0"
                                placeholder='0.000 ETH'
                                value={withdrawAmount}
                                onChange={(event)=>setWidrawAmount(parseFloat(event.target.value))}
                                className='mt-6 mb-3'
                            />
                            <Button 
                                asChild
                                className='flex font-medium' 
                                variant="outline"   
                            >
                                <TransactionButton
                                    transaction={()=>(
                                        prepareContractCall({
                                            contract: CONTRACT,
                                            method: "withdraw",
                                            params: [toWei(withdrawAmount.toString())]
                                        })
                                    )}
                                    onClick={()=>toast.message("sending Tx...")}
                                    onTransactionSent={()=>toast.info("Tx sent...")}
                                    onTransactionConfirmed={()=>{
                                        setWidrawAmount(0);
                                        refetchData();
                                        setIsWithdrawing(false);
                                        toast.success("Tx confirmed.")
                                    }}
                                    onError={()=>toast.warning(`Tx failed: ${withdrawError}`.slice(0,40))}
                                >
                                    Withdraw
                                </TransactionButton>
                            </Button>
                        </div>
                    </div>
                </>
            )}

            {isDepositing && (
                <>
                    <div style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                            <div style={{
                                position: "relative",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                backgroundColor: "background",
                                padding: "40px",
                                borderRadius: "10px",
                                minWidth: "500px",
                            }}>
                            <Button
                                className="absolute top-2 right-2 px-3 py-1 rounded-md"
                                onClick={() => setIsDepositing(false)}
                                size="sm"
                                variant="ghost"
                            >
                                <XIcon className='text-xl text-red-600 w-full h-full'/>
                            </Button>
                            <h3 className="text-medium">Deposit now</h3>
                            <p className='mt-6 mb-1 mr-auto'>To</p>
                            <Input
                                type="string"
                                
                                placeholder='0x address'
                                value={receiver}
                                onChange={(event)=>setReceiver(event.target.value)}
                                className='mb-3'
                            />
                            <p className='mt-6 mb-1 mr-auto'>Amount</p>
                            <Input
                                type="number"
                                min="0"
                                placeholder='0.000 ETH'
                                value={depositAmount}
                                onChange={(event)=>setDepositAmount(parseFloat(event.target.value))}
                                className=' mb-3'
                            />
                            <Button 
                                asChild
                                className='flex font-medium' 
                                variant="outline"   
                            >
                                <TransactionButton
                                    transaction={()=>(
                                        prepareContractCall({
                                            contract: CONTRACT,
                                            method: "deposit",
                                            params: [receiver],
                                            value: toWei(depositAmount.toString())
                                        })
                                    )}
                                    onClick={()=>toast.message("sending Tx...")}
                                    onTransactionSent={()=>toast.info("Tx sent...")}
                                    onTransactionConfirmed={()=>{
                                        setDepositAmount(0);
                                        refetchData();
                                        setIsDepositing(false);
                                        toast.success("Tx confirmed.")
                                    }}
                                    onError={()=>toast.warning(`Tx failed: ${window.console.error}`.slice(0,80))}
                                >
                                    Deposit
                                </TransactionButton>
                            </Button>
                        </div>
                    </div>
                </>
            )}
            {isTransfering && (
                <>
                    <div style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                            <div style={{
                                position: "relative",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                backgroundColor: "background",
                                padding: "40px",
                                borderRadius: "10px",
                                minWidth: "500px",
                            }}>
                            <Button
                                className="absolute top-2 right-2 px-3 py-1 rounded-md"
                                onClick={() => setIsTransfering(false)}
                                size="sm"
                                variant="ghost"
                            >
                                <XIcon className='text-xl text-red-600 w-full h-full'/>
                            </Button>
                            <h3 className="text-medium">Transfer funds</h3>
                            <h5 className="text-medium">Available balance: {accountBalance}</h5>
                            <p className='mt-6 mb-1 mr-auto'>To</p>
                            <Input
                                type="string"
                                placeholder='0x address'
                                value={receiver}
                                onChange={(event)=>setReceiver(event.target.value)}
                                className='mb-3'
                            />
                            <p className='mt-6 mb-1 mr-auto'>Amount</p>
                            <Input
                                type="number"
                                min="0"
                                placeholder='0.000 ETH'
                                value={transferAmount}
                                onChange={(event)=>setTransferAmount(parseFloat(event.target.value))}
                                className=' mb-3'
                            />
                            <Button 
                                asChild
                                className='flex font-medium' 
                                variant="outline"   
                            >
                                <TransactionButton
                                    transaction={()=>(
                                        prepareContractCall({
                                            contract: CONTRACT,
                                            method: "transfer",
                                            params: [toWei(transferAmount.toString()),receiver],
                                        })
                                    )}
                                    onClick={()=>toast.message("sending Tx...")}
                                    onTransactionSent={()=>toast.info("Tx sent...")}
                                    onTransactionConfirmed={()=>{
                                        setTransferAmount(0);
                                        refetchData();
                                        setIsTransfering(false);
                                        toast.success("Tx confirmed.")
                                    }}
                                    onError={()=>toast.warning(`Tx failed: ${window.console.error}`.slice(0,80))}
                                >
                                    Transfer
                                </TransactionButton>
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
