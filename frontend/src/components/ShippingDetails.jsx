import { Separator } from "@/components/ui/separator"

export default function ShippingDetails({ shippingAddress }) {
  const { address, city, country, postalCode } = shippingAddress
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">Shipping</h2>
        <p className="text-gray-600">{`${address}, ${city}, ${country}, ${postalCode}`}</p>
        <Separator className="my-4" />
      </div>
    )
  }