import { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "@/slices/usersApiSlice";
import { toast } from "react-toastify";
import { setCredentials } from "@/slices/authSlice";
import { ShoppingBag } from "lucide-react";
import { LoginForm } from "@/components/LoginForm";
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
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    {" "}
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
                                <LoginForm 
                                    email={email}
                                    setEmail={setEmail}
                                    password={password}
                                    setPassword={setPassword}
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

export default LoginPage;
