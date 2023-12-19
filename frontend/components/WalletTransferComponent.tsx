"use client"

import useIsSSR from "@/hooks/SSRHook";
import { useEffect, useState } from "react";
import { parseEther } from "viem";
import { useAccount, useBalance, useSendTransaction, useWaitForTransaction } from "wagmi";

const WalletTransferComponent = () => {

    const [targetAddress, setTargetAddress] = useState<`0x${string}`>()

    const { address } = useAccount();

    const isSSR = useIsSSR();

    const { data: myBalance, refetch: refetchMyBalance } = useBalance({
        address: address,
    })


    const { data: theirBalance, refetch: refetchTheirBalance } = useBalance({
        address: targetAddress,
    })


    const { data, isLoading, isSuccess, sendTransaction } = useSendTransaction({
        to: targetAddress,
        value: parseEther('0.1'),
    })


    const { data: transactionSent, isError: isErrorTransactionSent, isLoading: isLoadingTransactionSent, isSuccess: isSuccessTransactionSent } = useWaitForTransaction({
        hash: data?.hash,
    })


    useEffect(() => {
        refetchMyBalance();
        refetchTheirBalance();

    }, [isSuccessTransactionSent])


    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const address = e.target.value;

        //clean address --> only ETH address. TODO

        setTargetAddress(e.target.value as `0x${string}`)
    }

    if (isSSR) return <></>

    return (
        <div className="flex flex-col w-full bg-gradient-to-br from-gray-800 to-gray-900 text-white p-4 rounded-lg shadow-xl">

            <h2 className="text-xl font-bold mb-2 text-purple-400">Wallet Transfer</h2>
            <div className="space-y-2">
                <div className="flex flex-col mb-4">
                    <div className="text-lg font-semibold ">My Address:</div>
                    <div>{address}</div>
                </div>

                <div className="flex flex-col mb-4">
                    <div className="text-lg font-semibold ">My Balance:</div>
                    <div>{myBalance?.formatted}</div>
                </div>

                <div>Target Address:</div>
                <input
                    className="bg-gray-600 border-purple-500 rounded py-1 px-2 text-white"
                    type="text"
                    placeholder="Enter Ethereum Address"
                    value={targetAddress}
                    onChange={handleAddressChange}
                />

                <div className="flex flex-col mb-4">
                    <div className="text-lg font-semibold ">Their Balance:</div>
                    <div>{theirBalance?.formatted}</div>
                </div>

                <button
                    onClick={() => sendTransaction()}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                    Transfer 0.1 ETH
                </button>


                {isLoading &&
                    (<div className="mt-4 text-yellow-400">Waiting for user confirmation</div>)}

                {isLoadingTransactionSent &&
                    (<div className="mt-4 text-yellow-400">Waiting for Ethereum</div>)}


                {isSuccessTransactionSent &&
                    (<div className="mt-4 text-green-400">Success!</div>)}


            </div>

        </div>
    )
}

export default WalletTransferComponent;