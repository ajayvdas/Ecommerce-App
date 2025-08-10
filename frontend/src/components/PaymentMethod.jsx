import { CreditCard } from 'lucide-react'
import { Separator } from "@/components/ui/separator"
export default function PaymentMethod({ method }) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">Payment</h2>
        <p className="text-gray-600 flex items-center">
          <CreditCard className="mr-2" /> {method}
        </p>
        <Separator className="my-4" />
      </div>
    )
  }