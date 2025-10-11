import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import LoginPage from "./pages/LoginPage";
import ShippingPage from "./pages/ShippingPage";
import RegisterPage from "./pages/RegisterPage";
import OrderListPage from "./pages/admin/OrderListPage";
import UserListPage from "./pages/admin/UserListPage";
import ProductListPage from "./pages/admin/AdminProductListPage";
import ProductsPage from "./pages/ProductsPage";
import PaymentPage from "./pages/PaymentPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import OrderPage from "./pages/OrderPage";
import ProfilePage from "./pages/ProfilePage";
import ProductEditPage from "./pages/admin/ProductEditPage";
import UserEditPage from "./pages/admin/UserEditPage";
import WishlistPage from "./pages/WishlistPage";
import AdminRoute from "./components/AdminRoute";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";

function MainLayout({ children }) {
    return (
        <>
            <Header />
            <main className="flex flex-col min-h-screen pt-14 sm:pt-16">
                {children}
            </main>
            <Footer />
        </>
    );
}

function AuthLayout({ children }) {
    return (
        <main className="flex flex-col min-h-screen">
            {children}
        </main>
    );
}

function App() {
    return (
        <>
            <Routes>
                <Route path="/login" element={
                    <AuthLayout>
                        <LoginPage />
                    </AuthLayout>
                } />
                <Route path="/register" element={
                    <AuthLayout>
                        <RegisterPage />
                    </AuthLayout>
                } />

                <Route path="/" element={
                    <MainLayout>
                        <HomePage />
                    </MainLayout>
                } />
                <Route path="/products" element={
                    <MainLayout>
                        <ProductsPage />
                    </MainLayout>
                } />
                <Route path="/product/:id" element={
                    <MainLayout>
                        <ProductPage />
                    </MainLayout>
                } />
                <Route path="/cart" element={
                    <MainLayout>
                        <ShoppingCartPage />
                    </MainLayout>
                } />

                {/* Registered Users */}
                <Route path="" element={
                    <MainLayout>
                        <PrivateRoute />
                    </MainLayout>
                }>
                    <Route path="/shipping" element={<ShippingPage />} />
                    <Route path="/payment" element={<PaymentPage />} />
                    <Route path="/placeorder" element={<PlaceOrderPage />} />
                    <Route path="/order/:id" element={<OrderPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/wishlist" element={<WishlistPage />} />
                </Route>

                {/* Admin Users */}
                <Route path="" element={
                    <MainLayout>
                        <AdminRoute />
                    </MainLayout>
                }>
                    <Route path="/admin/orderlist" element={<OrderListPage />} />
                    <Route path="/admin/productlist" element={<ProductListPage />} />
                    <Route path="/admin/product/:id/edit" element={<ProductEditPage />} />
                    <Route path="/admin/userlist" element={<UserListPage />} />
                    <Route path="/admin/user/:id/edit" element={<UserEditPage />} />
                </Route>
            </Routes>
            <ToastContainer />
        </>
    );
}

export default App;