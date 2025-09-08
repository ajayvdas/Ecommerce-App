import { useState } from "react";
import {  User, Heart, ShoppingBag, LogOutIcon, LogInIcon, Menu, X, Settings } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useLogoutMutation } from "@/slices/usersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/slices/authSlice";
import TooltipComponent from "./TooltipComponent";
import StylizedHeading from "./StylizedHeading";
import ProductCommandSearch from "./ProductCommandSearch"; 
import { resetCart } from '../slices/cartSlice'

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false);
    const { userInfo } = useSelector((state) => state.auth);
    const location = useLocation();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();

    // Define routes where search should be shown
    const showSearchRoutes = ['/', '/products'];
    const shouldShowSearch = showSearchRoutes.includes(location.pathname);

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            // NOTE: here we need to reset cart state for when a user logs out so the next
            // user doesn't inherit the previous users cart and shipping
            dispatch(resetCart())
            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const toggleAdminDropdown = () => {
        setIsAdminDropdownOpen(!isAdminDropdownOpen);
    };

    return (
        <header>
            <nav className="fixed z-50 w-full bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
                    {/* Main Header Row */}
                    <div className="flex items-center justify-between h-14 sm:h-16">
                        {/* Logo Section */}
                        <div className="flex-shrink-0 cursor-pointer">
                            <div className="scale-90 sm:scale-100">
                                <StylizedHeading />
                            </div>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center space-x-6">
                            {shouldShowSearch && (
                                <div className="flex-1 max-w-md">
                                    <ProductCommandSearch />
                                </div>
                            )}

                            <div className="flex items-center space-x-4">
                                <TooltipComponent content="Profile">
                                    <Link
                                        to="/register"
                                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all duration-200"
                                    >
                                        <User className="h-5 w-5" />
                                    </Link>
                                </TooltipComponent>

                                <TooltipComponent content="Liked Products">
                                    <button
                                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all duration-200"
                                        aria-label="Wishlist"
                                    >
                                        <Heart className="h-5 w-5" />
                                    </button>
                                </TooltipComponent>

                                <TooltipComponent content="Cart">
                                    <Link
                                        to="/cart"
                                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all duration-200"
                                    >
                                        <ShoppingBag className="h-5 w-5" />
                                    </Link>
                                </TooltipComponent>

                                {/* Admin Dropdown for Desktop */}
                                {userInfo && userInfo.isAdmin && (
                                    <div className="relative">
                                        <TooltipComponent content="Admin">
                                            <button
                                                onClick={toggleAdminDropdown}
                                                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all duration-200"
                                                aria-label="Admin"
                                            >
                                                <Settings className="h-5 w-5" />
                                            </button>
                                        </TooltipComponent>
                                        
                                        {isAdminDropdownOpen && (
                                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                                                <div className="py-1">
                                                    <Link
                                                        to="/admin/productlist"
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                                                        onClick={() => setIsAdminDropdownOpen(false)}
                                                    >
                                                        Products
                                                    </Link>
                                                    <Link
                                                        to="/admin/orderlist"
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                                                        onClick={() => setIsAdminDropdownOpen(false)}
                                                    >
                                                        Orders
                                                    </Link>
                                                    <Link
                                                        to="/admin/userlist"
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                                                        onClick={() => setIsAdminDropdownOpen(false)}
                                                    >
                                                        Users
                                                    </Link>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {userInfo ? (
                                    <TooltipComponent content="Logout">
                                        <button
                                            onClick={logoutHandler}
                                            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all duration-200"
                                            aria-label="Logout"
                                        >
                                            <LogOutIcon className="h-5 w-5" />
                                        </button>
                                    </TooltipComponent>
                                ) : (
                                    <TooltipComponent content="Login">
                                        <Link
                                            to="/login"
                                            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all duration-200"
                                            aria-label="Login"
                                        >
                                            <LogInIcon className="h-5 w-5" />
                                        </Link>
                                    </TooltipComponent>
                                )}
                            </div>
                        </div>

                        {/* Tablet Navigation (md to lg) */}
                        <div className="hidden md:flex lg:hidden items-center space-x-3">
                            {shouldShowSearch && (
                                <div className="flex-1 max-w-xs">
                                    <ProductCommandSearch />
                                </div>
                            )}

                            <div className="flex items-center space-x-2">
                                <Link
                                    to="/register"
                                    className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-all duration-200"
                                >
                                    <User className="h-4 w-4" />
                                </Link>
                                <button
                                    className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-all duration-200"
                                    aria-label="Wishlist"
                                >
                                    <Heart className="h-4 w-4" />
                                </button>
                                <Link
                                    to="/cart"
                                    className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-all duration-200"
                                >
                                    <ShoppingBag className="h-4 w-4" />
                                </Link>

                                {/* Admin Dropdown for Tablet */}
                                {userInfo && userInfo.isAdmin && (
                                    <div className="relative">
                                        <button
                                            onClick={toggleAdminDropdown}
                                            className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-all duration-200"
                                            aria-label="Admin"
                                        >
                                            <Settings className="h-4 w-4" />
                                        </button>
                                        
                                        {isAdminDropdownOpen && (
                                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                                                <div className="py-1">
                                                    <Link
                                                        to="/admin/productlist"
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                                                        onClick={() => setIsAdminDropdownOpen(false)}
                                                    >
                                                        Products
                                                    </Link>
                                                    <Link
                                                        to="/admin/orderlist"
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                                                        onClick={() => setIsAdminDropdownOpen(false)}
                                                    >
                                                        Orders
                                                    </Link>
                                                    <Link
                                                        to="/admin/userlist"
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                                                        onClick={() => setIsAdminDropdownOpen(false)}
                                                    >
                                                        Users
                                                    </Link>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {userInfo ? (
                                    <button
                                        onClick={logoutHandler}
                                        className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-all duration-200"
                                        aria-label="Logout"
                                    >
                                        <LogOutIcon className="h-4 w-4" />
                                    </button>
                                ) : (
                                    <Link
                                        to="/login"
                                        className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-all duration-200"
                                        aria-label="Login"
                                    >
                                        <LogInIcon className="h-4 w-4" />
                                    </Link>
                                )}
                            </div>
                        </div>

                        {/* Mobile Navigation Toggle */}
                        <div className="md:hidden flex items-center space-x-2">
                            <div className="flex items-center space-x-1">
                                <Link to="/cart" className="p-2 text-gray-600 hover:text-gray-900 rounded-md">
                                    <ShoppingBag className="h-5 w-5" />
                                </Link>
                                <button
                                    onClick={toggleMobileMenu}
                                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-all duration-200"
                                    aria-label="Toggle menu"
                                >
                                    {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu Dropdown */}
                    <div
                        className={`md:hidden transition-all duration-300 ease-in-out ${
                            isMobileMenuOpen ? "max-h-96 opacity-100 pb-4" : "max-h-0 opacity-0 overflow-hidden"
                        }`}
                    >
                        {isMobileMenuOpen && (
                            <div className="border-t border-gray-100 pt-4 space-y-3">
                                {/* Search bar for mobile - only show on specific routes */}
                                {shouldShowSearch && (
                                    <div className="px-1">
                                        <ProductCommandSearch />
                                    </div>
                                )}

                                {/* Mobile menu items */}
                                <div className="flex flex-col space-y-2">
                                    <Link
                                        to="/register"
                                        className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <User className="h-5 w-5" />
                                        <span className="text-sm font-medium">Profile</span>
                                    </Link>

                                    <button
                                        className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200 w-full text-left"
                                        aria-label="Wishlist"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <Heart className="h-5 w-5" />
                                        <span className="text-sm font-medium">Wishlist</span>
                                    </button>

                                    {/* Admin Links for Mobile */}
                                    {userInfo && userInfo.isAdmin && (
                                        <>
                                            <div className="px-3 py-1">
                                                <div className="border-t border-gray-200"></div>
                                            </div>
                                            <div className="px-3">
                                                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Admin</span>
                                            </div>
                                            <Link
                                                to="/admin/productlist"
                                                className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                <Settings className="h-5 w-5" />
                                                <span className="text-sm font-medium">Products</span>
                                            </Link>
                                            <Link
                                                to="/admin/orderlist"
                                                className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                <Settings className="h-5 w-5" />
                                                <span className="text-sm font-medium">Orders</span>
                                            </Link>
                                            <Link
                                                to="/admin/userlist"
                                                className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                <Settings className="h-5 w-5" />
                                                <span className="text-sm font-medium">Users</span>
                                            </Link>
                                            <div className="px-3 py-1">
                                                <div className="border-t border-gray-200"></div>
                                            </div>
                                        </>
                                    )}

                                    {userInfo ? (
                                        <button
                                            onClick={() => {
                                                logoutHandler();
                                                setIsMobileMenuOpen(false);
                                            }}
                                            className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200 w-full text-left"
                                            aria-label="Logout"
                                        >
                                            <LogOutIcon className="h-5 w-5" />
                                            <span className="text-sm font-medium">Logout</span>
                                        </button>
                                    ) : (
                                        <Link
                                            to="/login"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200 w-full text-left"
                                            aria-label="Login"
                                        >
                                            <LogInIcon className="h-5 w-5" />
                                            <span className="text-sm font-medium">Login</span>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;