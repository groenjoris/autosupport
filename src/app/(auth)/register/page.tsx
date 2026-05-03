"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Zap, Globe, Eye, EyeOff, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function GoogleModal({
  onClose,
  onConfirm,
}: {
  onClose: () => void;
  onConfirm: (email: string) => void;
}) {
  const [email, setEmail] = useState("");
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>
        {/* Google branding */}
        <div className="flex justify-center mb-6">
          <svg viewBox="0 0 24 24" className="h-8 w-8">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-center text-gray-800 mb-1">Sign in with Google</h2>
        <p className="text-sm text-center text-gray-500 mb-6">to continue to AutoSupport</p>
        <div className="space-y-3">
          <Label htmlFor="google-email" className="text-sm text-gray-700">Email or phone</Label>
          <Input
            id="google-email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && email && onConfirm(email)}
            className="border-gray-300"
          />
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="text-sm text-blue-600 hover:underline font-medium"
          >
            Cancel
          </button>
          <button
            onClick={() => email && onConfirm(email)}
            disabled={!email}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white text-sm font-medium px-5 py-2 rounded-md transition-colors"
          >
            Next
          </button>
        </div>
        <p className="mt-4 text-[11px] text-gray-400 text-center">
          This is a simulated sign-in for demo purposes.
        </p>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  const router = useRouter();
  const [showGoogle, setShowGoogle] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({ storeName: "", email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const next: Record<string, string> = {};
    if (!form.storeName) next.storeName = "Enter your store name";
    else if (form.storeName.length < 2 || form.storeName.length > 60)
      next.storeName = "Store name must be between 2 and 60 characters";
    else if (!/^[a-zA-Z0-9_-]+$/.test(form.storeName))
      next.storeName = "Only letters, numbers, - and _ allowed";

    if (!form.email) next.email = "Enter your email address";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Enter a valid email address";

    if (!form.password) next.password = "Password must be at least 8 characters";
    else if (form.password.length < 8)
      next.password = "Password must be at least 8 characters";

    return next;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitting(true);
    setTimeout(() => router.push("/onboarding"), 800);
  };

  const handleGoogleConfirm = (email: string) => {
    setShowGoogle(false);
    router.push("/onboarding");
  };

  const field = (key: keyof typeof form) => ({
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
      setErrors((er) => { const n = { ...er }; delete n[key]; return n; });
    },
    onBlur: () => {
      const errs = validate();
      if (errs[key]) setErrors((er) => ({ ...er, [key]: errs[key] }));
    },
  });

  return (
    <>
      {showGoogle && (
        <GoogleModal onClose={() => setShowGoogle(false)} onConfirm={handleGoogleConfirm} />
      )}
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary mb-3">
            <Zap className="h-5 w-5 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Start your free 7-day trial</h1>
          <p className="text-sm text-muted-foreground mt-1">No credit card required</p>
        </div>

        {/* Google button */}
        <Button
          type="button"
          variant="outline"
          className="w-full gap-2 mb-4"
          onClick={() => setShowGoogle(true)}
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
          <div className="space-y-1.5">
            <Label htmlFor="storeName">Store name</Label>
            <Input
              id="storeName"
              placeholder="my-store"
              disabled={submitting}
              className={errors.storeName ? "border-destructive" : ""}
              {...field("storeName")}
            />
            {errors.storeName && (
              <p className="text-xs text-destructive">{errors.storeName}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@yourstore.com"
              disabled={submitting}
              className={errors.email ? "border-destructive" : ""}
              {...field("email")}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Min. 8 characters"
                disabled={submitting}
                className={errors.password ? "border-destructive pr-10" : "pr-10"}
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
            {errors.password && (
              <p className="text-xs text-destructive">{errors.password}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
                Creating account…
              </span>
            ) : (
              "Create account"
            )}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-foreground font-medium hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </>
  );
}
