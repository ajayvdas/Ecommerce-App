import { motion } from "framer-motion";
import { CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useParams } from "react-router-dom";
import { useGetOrderDetailsQuery, usePayOrderMutation, useGetPayPalClientIdQuery } from "@/slices/ordersApiSlice";
import Error from "@/components/Error";
import Loader from "@/components/Loader";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function OrderPage() {
    const { id: orderId } = useParams();
    const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);

    const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation(orderId);

    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

    const { data: paypal, isLoading: loadingPayPal, error: errorPayPal } = useGetPayPalClientIdQuery();

    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!errorPayPal && !loadingPayPal && paypal.clientId) {
            const loadPaypalScript = async () => {
                paypalDispatch({
                    type: "resetOptions",
                    value: {
                        "client-id": paypal.clientId,
                        currency: "USD",
                    },
                });
                paypalDispatch({ type: "setLoadingStatus", value: "pending" });
            };
            if (order && !order.isPaid) {
                if (!window.paypal) {
                    loadPaypalScript();
                }
            }
        }
    }, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch]);

    function onApprove(data, actions) {
        return actions.order.capture().then(async function (details) {
            try {
                await payOrder({ orderId, details });
                refetch();
                toast.success("Order is paid");
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        });
    }

    // TESTING ONLY! REMOVE BEFORE PRODUCTION
    async function onApproveTest() {
        await payOrder({ orderId, details: { payer: {} } });
        refetch();

        toast.success("Order is paid");
    }


  function onError(err) {
    toast.error(err.message);
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  // const deliverHandler = async () => {
  //   await deliverOrder(orderId);
  //   refetch();
  // };

    // Loading state
    if (isLoading) {
        return <Loader />;
    }

    // Error state
    // if (error) {
    //   return <div className="text-red-500 py-8 text-center">Error loading order: {error.message || "Unknown error"}</div>;
    // }
    if (error)
        return (
            <div className="m-4 mx-auto min-w-16">
                <Error message={error.message} />
            </div>
        );

    // Ensure order data is defined
    if (!order) {
        return <div className="text-red-500 py-8 text-center">Order not found.</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8 lg:px-8 lg:py-16 max-w-screen-lg">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <h1 className="text-3xl font-bold mb-6">Order {orderId}</h1>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Shipping</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>
                                <strong>Name:</strong> {order.user.name}
                            </p>
                            <p>
                                <strong>Email:</strong> {order.user.email}
                            </p>
                            <p>
                                <strong>Address:</strong> {order.user.address}
                            </p>
                            <div className="mt-4">
                                {order.isDelivered ? (
                                    <Badge className="bg-green-500">Delivered</Badge>
                                ) : (
                                    <Badge className="bg-red-500">Not Delivered</Badge>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Payment Method</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>
                                <strong>Method:</strong> {order.paymentMethod}
                            </p>
                            <div className="mt-4">
                                {order.isPaid ? (
                                    <Badge className="bg-green-500">Paid</Badge>
                                ) : (
                                    <Badge className="bg-red-500">Not Paid</Badge>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle>Order Items</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {order.orderItems.map((item) => (
                            <div key={item.id} className="flex items-center space-x-4 mb-4">
                                <img src={item.image} alt={item.name} width={80} height={80} className="rounded-md" />
                                <div className="flex-1">
                                    <h3 className="font-semibold">{item.name}</h3>
                                    <p className="text-gray-600">
                                        {item.quantity} x ${item.price.toFixed(2)} = $
                                        {(item.quantity * item.price).toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle>Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span>Items:</span>
                                <span>${order.itemsPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping:</span>
                                <span>${order.shippingPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tax:</span>
                                <span>${order.taxPrice.toFixed(2)}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between font-bold">
                                <span>Total:</span>
                                <span>${order.totalPrice.toFixed(2)}</span>
                            </div>
                        </div>
                        <div>
                            {!order.isPaid && (
                                <>
                                    {loadingPay && <Loader />}
                                    {isPending ? (
                                        <Loader />
                                    ) : (
                                        <div className="mt-6 space-y-4">
                                            <Button
                                                onClick={onApproveTest}
                                                className="w-full bg-[#FFC439] hover:bg-[#F2B829] text-black"
                                            >
                                                <img
                                                    src="/paypal-logo.png"
                                                    alt="PayPal"
                                                    width={80}
                                                    height={20}
                                                    className="mr-2"
                                                />
                                                Test Pay Order
                                            </Button>
                                            {/* <Button className="w-full">
                                                <CreditCard className="mr-2 h-4 w-4" />
                                                Pay with Debit/Credit Card
                                            </Button> */}
                                            <div>
                                                <PayPalButtons
                                                    createOrder={createOrder}
                                                    onApprove={onApprove}
                                                    onError={onError}
                                                ></PayPalButtons>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
