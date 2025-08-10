
import { useState } from "react"
import { motion } from "framer-motion"
import { Check, X, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {Link} from "react-router-dom"

// Mock data for orders
const initialOrders = [
  { id: 1, user: "John Doe", date: "2023-05-15", total: 189.99, paid: true, delivered: false },
  { id: 2, user: "Jane Smith", date: "2023-05-16", total: 79.99, paid: true, delivered: true },
  { id: 3, user: "Bob Johnson", date: "2023-05-17", total: 249.99, paid: false, delivered: false },
  { id: 4, user: "Alice Brown", date: "2023-05-18", total: 129.99, paid: true, delivered: true },
  { id: 5, user: "Charlie Davis", date: "2023-05-19", total: 99.99, paid: true, delivered: false },
]

export default function OrderListPage() {
  const [orders, setOrders] = useState(initialOrders)

  return (
    <div className="container mx-auto px-4 py-8 max-w-screen-xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6">Orders</h1>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Paid</TableHead>
                <TableHead>Delivered</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.user}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    {order.paid ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <X className="h-5 w-5 text-red-500" />
                    )}
                  </TableCell>
                  <TableCell>
                    {order.delivered ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <X className="h-5 w-5 text-red-500" />
                    )}
                  </TableCell>
                  <TableCell>
                    <Link href={`/admin/orders/${order.id}`}>
                      <Button variant="outline" size="sm">
                        Details <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </motion.div>
    </div>
  )
}
