import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

export function SignupForm({
    className,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    onSubmit,
    redirect,
}) {
    return (
        <form className={cn("flex flex-col gap-6", className)} onSubmit={onSubmit}>
            <FieldGroup>
                <div className="flex flex-col items-center gap-1 text-center">
                    <h1 className="text-2xl font-bold">Create your account</h1>
                    <p className="text-muted-foreground text-sm text-balance">
                        Fill in the form below to create your account
                    </p>
                </div>
                <Field>
                    <FieldLabel htmlFor="name">Name</FieldLabel>
                    <Input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        required
                    />
                </Field>
                <Field>
                    <FieldLabel htmlFor="email">Email Address</FieldLabel>
                    <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your-mail@example.com"
                        required
                    />
                </Field>
                <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <FieldDescription>Please enter a strong password.</FieldDescription>
                </Field>
                <Field>
                    <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
                    <Input
                        id="confirm-password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <FieldDescription>Please confirm your password.</FieldDescription>
                </Field>
                <Field>
                    <Button type="submit">Create Account</Button>
                </Field>

                <Field>
                    <FieldDescription className="px-6 text-center">
                        Already have an account?{" "}
                        <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>Sign in</Link>
                    </FieldDescription>
                </Field>
            </FieldGroup>
        </form>
    );
}
