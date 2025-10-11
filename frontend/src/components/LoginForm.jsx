import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

export function LoginForm({ className, email,setEmail, password, setPassword, onSubmit, redirect }) {

    return (
        <form className={cn("flex flex-col gap-6", className)} onSubmit={onSubmit} >
            <FieldGroup>
                <div className="flex flex-col items-center gap-1 text-center">
                    <h1 className="text-2xl font-bold">Login to your account</h1>
                    <p className="text-muted-foreground text-sm text-balance">
                        Enter your email below to login to your account
                    </p>
                </div>
                <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input id="email" type="email" placeholder="your-mail@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
                </Field>
                <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input id="password" type="password" value={password} onChange={e=> setPassword(e.target.value)}  required />
                </Field>
                <Field>
                    <Button type="submit">Login</Button>
                </Field>
                
                <Field>
                    <FieldDescription className="text-center">
                        Don&apos;t have an account?{" "}
                        <Link to={redirect ? `/register?redirect=${redirect}` : "/register"} className="underline underline-offset-4">
                            Sign up
                        </Link>
                    </FieldDescription>
                </Field>
            </FieldGroup>
        </form>
    );
}
