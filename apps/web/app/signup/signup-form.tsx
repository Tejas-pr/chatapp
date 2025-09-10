"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@repo/auth/client";
import { Loader2 } from "lucide-react";
import { auth } from "@repo/auth/auth";

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    Name: "",
    email: "",
    password: "",
  });

  const onsubmit = async (e: any) => {
    console.log("called onsubmit");
    e.preventDefault();
    setIsLoading(true);

    // Simple validation
    if (!formData.Name || !formData.email || !formData.password) {
      toast("Please fill all fields");
      setIsLoading(false);
      return;
    }

    try {
      const response = await authClient.signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.Name,
      });

      if (response.error) {
        toast.error(response.error.message || "Signup failed");
        setIsLoading(false);
        return;
      }

      setFormData({
        Name: "",
        email: "",
        password: "",
      });

      router.push("/signin");
      setIsLoading(false);
    } catch (error) {
      console.error("Signup error:", error);
      toast("Something went wrong. Please try again.");
    }
  };

  const signInWithGoogle = async () => {
    try {
      await authClient.signIn.social(
        {
          provider: "google",
          callbackURL: "/roomenter",
        },
        {
          onRequest: () => setIsLoading(true),
          onResponse: () => setIsLoading(false),
          onError: (error) => {
            console.error("Social login error:", error);
            toast.error("Google login failed");
            setIsLoading(false);
          },
        }
      );
    } catch (err: any) {
      console.error("Unexpected error:", err);
      toast.error("Something went wrong with Google login");
      setIsLoading(false);
    }
  };
  const signInWithGitHub = async () => {
    try {
      await authClient.signIn.social(
        {
          provider: "github",
          callbackURL: "/roomenter",
        },
        {
          onRequest: () => setIsLoading(true),
          onResponse: () => setIsLoading(false),
          onError: (error) => {
            console.error("Social login error:", error);
            toast.error("Github login failed");
            setIsLoading(false);
          },
        }
      );
    } catch (err: any) {
      console.error("Unexpected error:", err);
      toast.error("Something went wrong with Google login");
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your Github or Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button variant="outline" className="w-full" onClick={signInWithGitHub} disabled={isLoading}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="h-5 w-5 mr-2"
                    fill="currentColor"
                  >
                    <path d="M12 0C5.372 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.744.083-.729.083-.729 1.205.085 1.84 1.236 1.84 1.236 1.07 1.834 2.807 1.304 3.492.997.108-.776.418-1.305.76-1.605-2.665-.304-5.467-1.332-5.467-5.931 0-1.31.468-2.38 1.236-3.22-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 013.003-.403c1.018.005 2.045.137 3.003.403 2.29-1.552 3.296-1.23 3.296-1.23.655 1.653.243 2.873.12 3.176.77.84 1.234 1.91 1.234 3.22 0 4.61-2.807 5.625-5.479 5.921.43.372.823 1.102.823 2.222 0 1.604-.015 2.896-.015 3.287 0 .32.216.694.825.576C20.565 21.796 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                  Login with GitHub
                </Button>
                <Button type="button" variant="outline" className="w-full" onClick={signInWithGoogle} disabled={isLoading}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Login with Google
                </Button>
              </div>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Name</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m"
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        Name: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        password: e.target.value,
                      });
                    }}
                    id="password"
                    type="password"
                    placeholder="123456"
                  />
                </div>
                <Button
                  type="button"
                  className="w-full"
                  onClick={onsubmit}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    "Signup"
                  )}
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="/signin" className="underline underline-offset-4">
                  Sign in
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="/signin">Privacy Policy</a>.
      </div>
    </div>
  );
}
