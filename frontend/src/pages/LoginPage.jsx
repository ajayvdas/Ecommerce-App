import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "@/slices/usersApiSlice";
import { toast } from "react-toastify";
import { setCredentials } from "@/slices/authSlice";
import Loader from "@/components/Loader";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();

    const { userInfo } = useSelector((state) => state.auth);

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get("redirect") || "/";

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [userInfo, redirect, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Here you would typically handle the sign in logic
        try {
            const res = await login({ email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
        } catch (err) {
            // console.log("err?.data?.message: ", err?.data?.message)
            // console.log("err.error: ", err.error)
            toast.error(err?.data?.message || err.error)
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            {isLoading ? (
                <Loader />
            ) : (
                <motion.div
                    className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-2xl font-bold mb-6 text-center">Log In</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10"
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10"
                                    required
                                />
                            </div>
                        </div>
                        <Button type="submit" className="w-full">
                            Sign In
                        </Button>
                    </form>
                    <div className="mt-4 text-center">
                        <span className="text-gray-600">New Customer? </span>
                        <Link
                            to={redirect ? `/register?redirect=${redirect}` : "/register"}
                            className="text-blue-600 hover:underline"
                        >
                            Register
                        </Link>
                    </div>
                </motion.div>
            )}
        </div>
    );
}

export default LoginPage;
