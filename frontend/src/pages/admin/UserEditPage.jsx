import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import EditUserForm from "@/components/EditUserForm";
import { useGetUserDetailsQuery, useUpdateUserMutation } from "@/slices/usersApiSlice";
import { toast } from "react-toastify";

export default function UserEditPage() {
    const { id: userId } = useParams();
    const navigate = useNavigate();

    // form state
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        isAdmin: false,
    });

    const { data: user, isLoading, error, refetch } = useGetUserDetailsQuery(userId);
    const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

const submitHandler = async (e) => {
    e.preventDefault();
    try {
        await updateUser({
            userId, 
            name: formData.name, 
            email: formData.email, 
            isAdmin: formData.isAdmin
        });
        toast.success("User updated successfully");
        refetch();
        navigate("/admin/userlist");
    } catch (error) {
        console.error("Update user error:", error);
        toast.error(error?.data?.message || error?.message || "Failed to update user");
    }
};

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                email: user.email || "",
                isAdmin: user.isAdmin || false,
            });
        }
    }, [user]);

    return (
        <div className="container mx-auto px-4 py-8 lg:px-8 lg:py-16 max-w-screen-md">
            <Link to="/admin/userlist">
                <Button variant="outline" className="mb-4">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Go back
                </Button>
            </Link>

            <motion.h1
                className="text-3xl font-bold mb-8 mt-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Edit User
            </motion.h1>

            {/* {loadingUpdate && <Loader />} */}

            {isLoading ? (
                <Loader />
            ) : error ? (
                <p>{error?.data?.message || error.error}</p>
            ) : (
                <>
                    {loadingUpdate && <Loader />}
                    <EditUserForm
                        formData={formData}
                        onInputChange={handleInputChange}
                        onSubmit={submitHandler}
                        isLoading={loadingUpdate}
                    />
                </>
            )}
        </div>
    );
}
