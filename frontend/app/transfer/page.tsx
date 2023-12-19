import WalletTransferComponent from '@/components/WalletTransferComponent'
import { Web3Connect } from '@/components/Web3Connect'

export default function Transfer() {
  return (
    <main className="flex min-h-screen flex-col items-center space-y-6 p-24 bg-black">
      <div><Web3Connect /></div>
      <div><WalletTransferComponent /></div>
    </main>
  )
}
