
export default function OrderItems({ items } ) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">Order Items</h2>
        <ul className="space-y-4">
          {items.map((item) => (
            <li key={item._id} className="flex items-center space-x-4">
              <img src={item.image} alt={item.name} width={80} height={80} className="rounded-md" />
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">
                  {item.quantity} x ${item.price.toFixed(2)} = ${(item.quantity * item.price).toFixed(2)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }