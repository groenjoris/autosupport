import Link from "next/link";
import {
  Zap,
  ShoppingBag,
  FileText,
  Inbox,
  Package,
  RotateCcw,
  HelpCircle,
  Bell,
  Shield,
  Clock,
  Mail,
  User,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/* ─── Pixel Logo Icon ─── */
function PixelLogoIcon({ size = "md" }: { size?: "sm" | "md" }) {
  const dims = size === "sm" ? "h-7 w-7" : "h-10 w-10";
  const eye = size === "sm" ? "w-1.5 h-1.5" : "w-2 h-2";
  return (
    <div className={`flex ${dims} items-center justify-center rounded-lg bg-[#5852ff] overflow-hidden shrink-0`}>
      <div className="flex w-6 h-6 flex-col justify-center gap-1.5">
        <div className="flex justify-between w-full px-0.5">
          <div className={`${eye} bg-white rounded-[2px]`} />
          <div className={`${eye} bg-white rounded-[2px]`} />
        </div>
      </div>
    </div>
  );
}

/* ─── Pixel Agent Mascot ─── */
function AgentFace({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const dims = size === "lg" ? "h-36 w-36" : size === "sm" ? "h-20 w-20" : "h-28 w-28";
  const eyeSize = size === "lg" ? "h-6 w-6" : size === "sm" ? "h-3.5 w-3.5" : "h-5 w-5";
  const gap = size === "lg" ? "gap-5" : size === "sm" ? "gap-2.5" : "gap-4";
  return (
    <div className={`relative mx-auto ${dims} flex items-center justify-center rounded-2xl bg-primary shadow-[0_8px_0_0_oklch(0.32_0.27_264)]`}>
      {/* Eyes */}
      <div className={`flex ${gap}`}>
        <div className={`${eyeSize} rounded-[3px] bg-white`} />
        <div className={`${eyeSize} rounded-[3px] bg-white`} />
      </div>
      {/* Cyan status dot */}
      <div className="absolute -right-2 -top-2 h-5 w-5 rounded-[4px] bg-[#00eefc] shadow-[2px_2px_0_0_#000]" />
      {/* Magenta ear accent */}
      <div className="absolute -left-2 top-1/2 -translate-y-1/2 h-4 w-2 rounded-l-sm bg-[#ffafd7] shadow-[-2px_2px_0_0_#000]" />
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f7fafd] text-foreground">
      {/* ─── Navbar ─── */}
      <header className="sticky top-0 z-50 border-b-2 border-slate-100 bg-white shadow-[0_4px_20px_-4px_rgba(88,82,255,0.08)]">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-3">
            <PixelLogoIcon />
            <span className="font-['Space_Grotesk'] text-xl font-black uppercase tracking-wider text-[#5852ff]">AutoSupport</span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground">How It Works</a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground">Pricing</a>
            <a href="#faq" className="text-sm text-muted-foreground hover:text-foreground">FAQ</a>
            <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground">Login</Link>
          </nav>
          <Link href="/register">
            <Button size="sm">Start Free Trial</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* ─── Hero ─── */}
        <section className="relative overflow-hidden border-b">
          {/* Gradient background: lavender → cyan tint */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#f2eeff] via-[#f7fafd] to-[#dffffe]" />
          {/* Purple dot grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: "radial-gradient(circle, #3d32e6 1.5px, transparent 1.5px)",
              backgroundSize: "28px 28px",
            }}
          />
          <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-28">
            <Badge
              variant="secondary"
              className="mb-6 border border-[#c2c1ff] bg-[#f2eeff] px-3 py-1 text-xs font-semibold text-[#2c18d9]"
            >
              Now in early access — first month free
            </Badge>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Your customers get answers.
              <br />
              <span
                className="bg-gradient-to-r from-primary via-[#5852ff] to-[#00686f] bg-clip-text text-transparent"
              >
                You get your time back.
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              AutoSupport is a plug-and-play email agent for drop shippers. It
              answers customer emails, prevents returns, and protects your store
              ratings — automatically.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/register">
                <Button size="lg" className="px-8">Try it free for 7 days</Button>
              </Link>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              No credit card required. Set up in under 10 minutes.
            </p>

            {/* Pixel Agent mascot */}
            <div className="mt-14">
              <AgentFace size="lg" />
              <p className="mt-4 text-xs font-semibold tracking-widest text-[#5852ff] uppercase">
                Your AI support agent
              </p>
            </div>
          </div>
        </section>

        {/* ─── Problem Statement ─── */}
        <section className="border-b bg-[#ffd8e9]/40 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#890062]">
              The reality
            </p>
            <p className="text-xl leading-relaxed text-foreground sm:text-2xl">
              You&apos;re spending hours every day on &ldquo;where is my
              package?&rdquo; emails. Or paying a VA hundreds of euros a month
              to copy-paste the same answers. Meanwhile, one bad reply tanks
              your trust score.{" "}
              <span className="font-semibold text-[#a30075]">
                There&apos;s a better way.
              </span>
            </p>
          </div>
        </section>

        {/* ─── How It Works ─── */}
        <section id="how-it-works" className="border-b bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Setup
            </p>
            <h2 className="mb-16 text-center text-3xl font-semibold tracking-tight sm:text-4xl">
              Plug in. Turn on. Walk away.
            </h2>
            <div className="grid gap-10 sm:grid-cols-3">
              {[
                {
                  step: "01",
                  icon: ShoppingBag,
                  title: "Connect your store",
                  body: "Link your Shopify store and email address. AutoSupport reads your products, orders, and shipping data automatically.",
                  iconBg: "bg-primary",
                  iconText: "text-white",
                  shadow: "shadow-[0_4px_0_0_oklch(0.32_0.27_264)]",
                  numColor: "text-primary",
                },
                {
                  step: "02",
                  icon: FileText,
                  title: "Set your rules",
                  body: 'Tell AutoSupport how you want customers handled. In plain language. "If someone wants to return, offer 20% off first." Done.',
                  iconBg: "bg-[#00eefc]",
                  iconText: "text-[#002022]",
                  shadow: "shadow-[0_4px_0_0_#00a8b3]",
                  numColor: "text-[#006970]",
                },
                {
                  step: "03",
                  icon: Inbox,
                  title: "Let it handle your inbox",
                  body: "AutoSupport answers emails from your own domain, in your tone, with real order data. You only step in when it really matters.",
                  iconBg: "bg-[#ffafd7]",
                  iconText: "text-[#3c0029]",
                  shadow: "shadow-[0_4px_0_0_#ce0095]",
                  numColor: "text-[#a30075]",
                },
              ].map(({ step, icon: Icon, title, body, iconBg, iconText, shadow, numColor }) => (
                <div key={step} className="flex flex-col gap-5">
                  <div className="flex items-center gap-4">
                    <span className={`font-mono text-xs font-bold ${numColor}`}>{step}</span>
                    <div className={`flex h-16 w-16 items-center justify-center rounded-xl ${iconBg} ${shadow}`}>
                      <Icon className={`h-8 w-8 ${iconText}`} />
                    </div>
                  </div>
                  <h3 className="text-base font-semibold">{title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Use Cases ─── */}
        <section className="border-b bg-[#f2eeff]/50 py-20 sm:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-[#5852ff]">
              What it handles
            </p>
            <h2 className="mb-12 text-center text-3xl font-semibold tracking-tight sm:text-4xl">
              Real emails. Handled in seconds.
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: Package,
                  title: '"Where is my package?"',
                  body: "Your customer emails at 11pm asking for a tracking update. AutoSupport pulls the order, checks the carrier, and replies with the latest status and estimated delivery. No VA needed. No delay.",
                  iconBg: "bg-primary",
                  iconText: "text-white",
                  shadow: "shadow-[0_3px_0_0_oklch(0.32_0.27_264)]",
                  accent: "border-t-4 border-t-primary",
                },
                {
                  icon: RotateCcw,
                  title: "Return prevention",
                  body: "A customer wants to send a product back. Instead of processing a refund, AutoSupport offers a 20% discount to keep it. If they push back, it goes to 50%. You set the limits — it plays the game.",
                  iconBg: "bg-[#00eefc]",
                  iconText: "text-[#002022]",
                  shadow: "shadow-[0_3px_0_0_#00a8b3]",
                  accent: "border-t-4 border-t-[#006970]",
                },
                {
                  icon: HelpCircle,
                  title: "Product questions",
                  body: '"Does this come in blue?" — AutoSupport checks your product knowledge base and replies with the right answer. Accurate, fast, on-brand.',
                  iconBg: "bg-[#ffafd7]",
                  iconText: "text-[#3c0029]",
                  shadow: "shadow-[0_3px_0_0_#ce0095]",
                  accent: "border-t-4 border-t-[#a30075]",
                },
                {
                  icon: Bell,
                  title: "Proactive follow-ups",
                  body: "AutoSupport doesn't just wait for complaints. It follows up after delivery, checks if the customer is happy, and flags problems before they become bad reviews.",
                  iconBg: "bg-[#c2c1ff]",
                  iconText: "text-[#0c006a]",
                  shadow: "shadow-[0_3px_0_0_#5852ff]",
                  accent: "border-t-4 border-t-[#5852ff]",
                },
              ].map(({ icon: Icon, title, body, iconBg, iconText, shadow, accent }) => (
                <Card key={title} className={`border bg-white ${accent}`}>
                  <CardContent className="p-6">
                    <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-xl ${iconBg} ${shadow}`}>
                      <Icon className={`h-7 w-7 ${iconText}`} />
                    </div>
                    <h3 className="mb-2 font-semibold">{title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Key Benefits ─── */}
        <section className="border-b bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Why it works
            </p>
            <h2 className="mb-12 text-center text-3xl font-semibold tracking-tight sm:text-4xl">
              Built for drop shippers who want to scale without hiring.
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: Shield,
                  title: "Protect your trust scores",
                  body: "Professional, fast replies prevent negative reviews and chargebacks. Your store reputation stays clean.",
                  bg: "bg-[#f2eeff]", text: "text-primary",
                },
                {
                  icon: Zap,
                  title: "Save 80%+ vs. a VA",
                  body: "A Filipino VA costs €80–150/month. AutoSupport costs €30 and handles more volume, 24/7.",
                  bg: "bg-[#00eefc]/30", text: "text-[#006970]",
                },
                {
                  icon: Mail,
                  title: "Replies from your own domain",
                  body: "Emails come from support@yourstore.com. Your customers see your brand, not a third-party tool.",
                  bg: "bg-[#ffd8e9]/60", text: "text-[#890062]",
                },
                {
                  icon: User,
                  title: "Personal approach",
                  body: "AutoSupport matches your tone and follows your rules. Customers feel like they're talking to a real person on your team.",
                  bg: "bg-[#c2c1ff]/40", text: "text-[#2c18d9]",
                },
                {
                  icon: Bell,
                  title: "Proactive, not reactive",
                  body: "It follows up, it checks in, it prevents problems. This isn't a reply bot. It's a customer satisfaction agent.",
                  bg: "bg-[#7df4ff]/30", text: "text-[#004f54]",
                },
                {
                  icon: Clock,
                  title: "Set up in minutes",
                  body: "Connect Shopify, add your email, write your rules. No developer needed.",
                  bg: "bg-[#ffafd7]/40", text: "text-[#a30075]",
                },
              ].map(({ icon: Icon, title, body, bg, text }) => (
                <div key={title} className="flex gap-4">
                  <div className={`mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${bg}`}>
                    <Icon className={`h-5 w-5 ${text}`} />
                  </div>
                  <div>
                    <p className="font-semibold">{title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Social Proof ─── */}
        <section className="border-b bg-[#dffffe]/60 py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
              {[
                { label: "Powered by Claude AI (Anthropic)", color: "text-[#006970]", dot: "bg-[#00eefc]" },
                { label: "SPF · DKIM · DMARC authenticated", color: "text-primary", dot: "bg-primary" },
                { label: "Built by drop shippers, for drop shippers", color: "text-[#a30075]", dot: "bg-[#ffafd7]" },
              ].map(({ label, color, dot }) => (
                <div key={label} className="flex items-center gap-2 text-sm font-medium">
                  <div className={`h-3 w-3 rounded-[3px] ${dot} shadow-[1px_1px_0_0_#000]`} />
                  <span className={color}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Pricing ─── */}
        <section id="pricing" className="border-b bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-lg px-4 sm:px-6">
            <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Pricing
            </p>
            <h2 className="mb-10 text-center text-3xl font-semibold tracking-tight sm:text-4xl">
              One plan. No surprises.
            </h2>
            <Card className="border-2 border-primary shadow-[0_6px_0_0_oklch(0.32_0.27_264)]">
              <CardContent className="p-8">
                {/* Mascot in pricing */}
                <div className="mb-6 flex justify-center">
                  <AgentFace size="sm" />
                </div>
                <div className="mb-6 text-center">
                  <p className="text-5xl font-bold tracking-tight text-primary">
                    €30
                    <span className="text-xl font-normal text-muted-foreground"> / month</span>
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Up to 1,000 emails answered per month.
                  </p>
                </div>
                <ul className="mb-8 space-y-3">
                  {[
                    "Shopify integration",
                    "Custom rules engine",
                    "Return prevention",
                    "Proactive follow-ups",
                    "Escalation alerts",
                    "Saves dashboard",
                    "Replies from your own domain",
                  ].map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[#006970]" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/register" className="block">
                  <Button size="lg" className="w-full">Start your free 7-day trial</Button>
                </Link>
                <p className="mt-4 text-center text-xs text-muted-foreground">
                  No credit card required. Cancel anytime.{" "}
                  <a href="mailto:hello@autosupport.app" className="underline">Need more volume?</a>
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section id="faq" className="border-b bg-[#f2eeff]/40 py-20 sm:py-24">
          <div className="mx-auto max-w-2xl px-4 sm:px-6">
            <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-[#5852ff]">
              Questions
            </p>
            <h2 className="mb-10 text-center text-3xl font-semibold tracking-tight sm:text-4xl">FAQ</h2>
            <Accordion type="single" collapsible className="space-y-2">
              {[
                {
                  q: "Do I need technical skills to set it up?",
                  a: "No. If you can write an email, you can set up AutoSupport. Connect your Shopify store, add your email domain, and write your rules in plain language.",
                },
                {
                  q: "Will customers know it's AI?",
                  a: "No. Emails are sent from your own domain (support@yourstore.com) with your name and tone. It reads like a human wrote it.",
                },
                {
                  q: "What happens when AutoSupport can't handle an email?",
                  a: "It escalates to you. You get a notification, see the full thread, and can approve, edit, or write your own reply. You stay in control.",
                },
                {
                  q: "Can I customize how it handles returns?",
                  a: "Yes. You write the rules: what discount to offer first, when to escalate, what to never do. In plain language — no code.",
                },
                {
                  q: "What if I go over 1,000 emails?",
                  a: "We'll let you know when you're getting close. Contact us and we'll sort out a plan that fits your volume.",
                },
                {
                  q: "Is my data safe?",
                  a: "Yes. We don't use your customer data to train AI models. Your data stays yours. Emails are processed securely and stored encrypted.",
                },
              ].map(({ q, a }, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="rounded-xl border border-[#c2c1ff] bg-white px-5"
                >
                  <AccordionTrigger className="text-sm font-semibold hover:no-underline">
                    {q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">{a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* ─── Final CTA ─── */}
        <section className="relative overflow-hidden bg-primary py-20 sm:py-24">
          {/* Cyan dot accent grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: "radial-gradient(circle, #00eefc 1.5px, transparent 1.5px)",
              backgroundSize: "24px 24px",
            }}
          />
          {/* Magenta accent blob */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#ce0095] opacity-[0.15] blur-3xl" />
          <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6">
            <div className="mb-8 flex justify-center">
              <AgentFace size="sm" />
            </div>
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Stop losing money on bad customer service.
            </h2>
            <p className="mt-4 text-base text-white/70">
              AutoSupport handles your inbox so you can focus on growing your store.
            </p>
            <div className="mt-8">
              <Link href="/register">
                <Button size="lg" variant="secondary" className="px-8">
                  Start free trial
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ─── Footer ─── */}
      <footer className="border-t bg-white py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <Link href="/" className="flex items-center gap-2">
              <PixelLogoIcon size="sm" />
              <span className="font-['Space_Grotesk'] text-sm font-black uppercase tracking-wider text-[#5852ff]">AutoSupport</span>
            </Link>
            <nav className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
              <a href="#how-it-works" className="hover:text-foreground">How It Works</a>
              <a href="#pricing" className="hover:text-foreground">Pricing</a>
              <a href="#faq" className="hover:text-foreground">FAQ</a>
              <a href="mailto:hello@autosupport.app" className="hover:text-foreground">Contact</a>
              <a href="#" className="hover:text-foreground">Privacy Policy</a>
              <a href="#" className="hover:text-foreground">Terms of Service</a>
            </nav>
            <Link href="/login" className="text-xs text-muted-foreground hover:text-foreground">Login</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
