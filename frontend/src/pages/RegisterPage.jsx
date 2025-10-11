import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";

import {  useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "@/slices/usersApiSlice";
import Loader from "@/components/Loader";
import { toast } from "react-toastify";
import { setCredentials } from "@/slices/authSlice";
import { SignupForm } from "@/components/SignupForm";

function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [register, { isLoading }] = useRegisterMutation();

    const { userInfo } = useSelector((state) => state.auth);

    // Code Explanation: https://chatgpt.com/c/677a2074-85d8-8001-9129-aa6353d9e2bc
    const { search } = useLocation();
    const searchParam = new URLSearchParams(search);
    const redirect = searchParam.get("redirect") || "/";

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [userInfo, redirect, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
        } else {
            try {
                const res = await register({ name, email, password }).unwrap();
                dispatch(setCredentials({ ...res }));
                navigate(redirect);
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };

    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <div className="flex flex-col gap-4 p-6 md:p-10">
                        <div className="flex justify-center gap-2 md:justify-start">
                            <a href="#" className="flex items-center gap-2 font-medium">
                                <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                                    <ShoppingBag className="size-4" />
                                </div>
                                Thread Theory.
                            </a>
                        </div>
                        <div className="flex flex-1 items-center justify-center">
                            <div className="w-full max-w-xs">
                                <SignupForm
                                    name={name}
                                    setName={setName}
                                    email={email}
                                    setEmail={setEmail}
                                    password={password}
                                    setPassword={setPassword}
                                    confirmPassword={confirmPassword}
                                    setConfirmPassword={setConfirmPassword}
                                    onSubmit={handleSubmit}
                                    redirect={redirect}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="bg-muted relative hidden lg:block">
                        <img
                            src="/loginform.svg"
                            alt="Image"
                            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                        />
                    </div>
                </>
            )}
        </div>
    );
}

export default RegisterPage;
