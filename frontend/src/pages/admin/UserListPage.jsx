import { motion } from "framer-motion";
import { Check, X, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useDeleteUserMutation, useGetUsersQuery } from "@/slices/usersApiSlice";
import Loader from "@/components/Loader";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

// Mock data for users
// const initialUsers = [
//   { id: 1, name: "John Doe", email: "john@example.com", isAdmin: false },
//   { id: 2, name: "Jane Smith", email: "jane@example.com", isAdmin: true },
//   { id: 3, name: "Bob Johnson", email: "bob@example.com", isAdmin: false },
//   { id: 4, name: "Alice Brown", email: "alice@example.com", isAdmin: false },
//   { id: 5, name: "Charlie Davis", email: "charlie@example.com", isAdmin: true },
// ]

export default function UserListPage() {
    // const [users, setUsers] = useState(initialUsers)

    const { data: users, refetch, isLoading, error } = useGetUsersQuery();
    const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

    

    const deleteHandler = async (id) => {
      console.log('id is: ', id)
        if (window.confirm("Are you sure")) {
            try {
                await deleteUser(id);
                refetch();
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-screen-xl">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <h1 className="text-3xl font-bold mb-6">Users</h1>
                <div className="overflow-x-auto">
                    {loadingDelete && <Loader />}
                    {isLoading ? (
                        <Loader />
                    ) : error ? (
                        // TODO: WORK ON ERROR COMPONENT
                        <p>{error.message}</p>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Admin</TableHead>
                                    <TableHead>Modify</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users?.map((user) => (
                                    <TableRow key={user._id}>
                                        <TableCell>{user._id}</TableCell>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>
                                            <a href={`mailto:${user.email}`}>{user.email}</a>
                                        </TableCell>
                                        <TableCell>
                                            {user.isAdmin ? (
                                                <Check className="h-5 w-5 text-green-500" />
                                            ) : (
                                                <X className="h-5 w-5 text-red-500" />
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {!user.isAdmin && (
                                                <div className="flex space-x-2">
                                                    <Link to={`/admin/user/${user._id}/edit`}>
                                                        <Button variant="outline" size="icon">
                                                            <Pencil className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={() => deleteHandler(user._id)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
