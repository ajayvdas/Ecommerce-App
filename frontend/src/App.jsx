import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import { Footer } from "./components/Footer";
// import PlaceOrderPage from "./pages/PlaceOrderPage"
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./components/PrivateRoute";
import ShippingPage from "./pages/ShippingPage";
import RegisterPage from "./pages/RegisterPage";
import AdminRoute from "./components/AdminRoute";
import OrderListPage from "./pages/admin/OrderListPage";
import UserListPage from "./pages/admin/UserListPage";
import ProductListPage from "./pages/admin/AdminProductListPage";
import ProductsPage from "./pages/ProductsPage";
// import ProductsPage from "./pages/ProductsPage-V2"
import { ToastContainer } from "react-toastify";
import PaymentPage from "./pages/PaymentPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import OrderPage from "./pages/OrderPage";
import ProfilePage from "./pages/ProfilePage";
import ProductEditPage from "./pages/admin/ProductEditPage";
import UserEditPage from "./pages/admin/UserEditPage";

function App() {
    return (
        <>
            <Header />
            <main className="flex flex-col min-h-screen pt-14 sm:pt-16">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/product/:id" element={<ProductPage />} />
                    <Route path="/cart" element={<ShoppingCartPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/admin/user/edit" element={<UserEditPage />} />
                    {/* Registered Users */}
                    <Route path="" element={<PrivateRoute />}>
                        <Route path="/shipping" element={<ShippingPage />} />
                        <Route path="/payment" element={<PaymentPage />} />
                        <Route path="/placeorder" element={<PlaceOrderPage />} />
                        <Route path="/order/:id" element={<OrderPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                    </Route>
                    {/* Admin Users */}
                    <Route path="" element={<AdminRoute />}>
                        <Route path="/admin/orderlist" element={<OrderListPage />} />
                        <Route path="/admin/productlist" element={<ProductListPage />} />
                        <Route path="/admin/product/:id/edit" element={<ProductEditPage />} />
                        <Route path="/admin/userlist" element={<UserListPage />} />
                        <Route path="/admin/user/:id/edit" element={<UserEditPage />} />
                    </Route>
                </Routes>
            </main>

            <Footer />
            <ToastContainer />
        </>
    );
}

export default App;
