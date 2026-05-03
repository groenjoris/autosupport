"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Zap, Globe, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Enter your email and password.");
      return;
    }
    setSubmitting(true);
    setError("");
    setTimeout(() => router.push("/dashboard"), 800);
  };

  const field = (key: keyof typeof form) => ({
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
      setError("");
    },
  });

  return (
    <div className="w-full max-w-md">
      {/* Logo */}
      <div className="flex flex-col items-center mb-8">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary mb-3">
          <Zap className="h-5 w-5 text-primary-foreground" />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
      </div>

      {/* Google */}
      <Button
        type="button"
        variant="outline"
        className="w-full gap-2 mb-4"
        onClick={() => router.push("/dashboard")}
      >
        <Globe className="h-4 w-4" />
        Continue with Google
      </Button>

      {/* Divider */}
      <div className="relative my-5">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs text-muted-foreground">
          <span className="bg-background px-3">or</span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {error && (
          <p className="text-sm text-destructive bg-destructive/10 rounded-md px-3 py-2">{error}</p>
        )}

        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@yourstore.com"
            disabled={submitting}
            {...field("email")}
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Your password"
              disabled={submitting}
              className="pr-10"
              {...field("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={submitting}>
          {submitting ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
              Logging in…
            </span>
          ) : (
            "Log in"
          )}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-foreground font-medium hover:underline">
          Start free trial
        </Link>
      </p>
    </div>
  );
}
