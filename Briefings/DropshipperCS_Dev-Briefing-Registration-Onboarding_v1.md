# Angel Maria -- Dev Briefing: Registration & Onboarding

> **Audience:** Joris (front-end/UX) and Thiago (back-end)
> **Scope:** Registration flow, onboarding dashboard, 4 setup flows, launch state
> **Version:** v1 -- 2 May 2026

---

## Overview

A new user arrives from the landing page, registers for a 7-day free trial, and lands on an onboarding dashboard. The dashboard has 4 setup cards (quadrants). All 4 must be completed before the agent can be activated. Once launched, the user sees the main dashboard (initially empty).

---

## Flow Map

```
Landing Page
  |
  v
Registration (Google or Email)
  |
  v
Onboarding Dashboard (4 quadrants)
  |-- [1] Connect Shopify
  |-- [2] Connect Email
  |-- [3] Knowledge Base
  |-- [4] Cases & Rules
  |
  v (all 4 completed)
Launch Button (active)
  |
  v
Main Dashboard (empty state)
```

---

## Part 1: Registration

### Screen: `/register`

**Purpose:** Create a free trial account. No credit card. Minimal friction.

#### Layout

```
+--------------------------------------------------+
|  Angel Maria logo (centered)                     |
|                                                  |
|  "Start your free 7-day trial"                   |
|                                                  |
|  [  Continue with Google  ]    <- primary         |
|                                                  |
|  ──────── or ────────                            |
|                                                  |
|  Store name          [___________________]       |
|  Email               [___________________]       |
|  Password            [___________________]       |
|                                                  |
|  [  Create account  ]          <- secondary      |
|                                                  |
|  "Already have an account? Log in"               |
+--------------------------------------------------+
```

#### Fields & Validation

| Field | Type | Required | Validation | Error message |
|-------|------|----------|------------|---------------|
| Store name | text | yes | 2-60 chars, no special chars except `-` and `_` | "Enter your store name" / "Store name must be between 2 and 60 characters" |
| Email | email | yes | Valid email format, unique in system | "Enter your email address" / "This email is already registered. Log in instead?" |
| Password | password | yes | Min 8 chars | "Password must be at least 8 characters" |

#### Google Sign-In

**v1 implementation (fake/simulated):**
The "Continue with Google" button opens a realistic-looking OAuth consent screen. For v1, this is a styled modal that mimics Google's flow. It collects the user's email and auto-fills the registration. No actual Google OAuth integration yet.

**Flow:**
1. User clicks "Continue with Google"
2. Modal appears resembling Google account picker
3. User enters/selects email
4. Modal closes, account is created with that email
5. Redirect to onboarding dashboard

**Note for Thiago:** Build the auth backend with OAuth in mind from day one (store `auth_provider` field: `email` | `google`). When real Google OAuth is added later, only the front-end consent flow and token exchange change.

#### Email Sign-Up Flow

1. User fills in store name, email, password
2. Client-side validation on each field (on blur + on submit)
3. Submit -> POST `/api/auth/register`
4. Back-end creates account, sends verification email
5. Redirect to onboarding dashboard with a top banner: "We sent a verification email to [email]. Please verify within 24 hours."
6. User can start onboarding immediately (don't block on verification)

#### States

| State | Behavior |
|-------|----------|
| Default | Empty form, Google button prominent |
| Validation error | Inline error below the relevant field, field border turns red |
| Email already exists | Inline error: "This email is already registered. Log in instead?" with "Log in" as a link |
| Submitting | Button shows spinner, all fields disabled |
| Server error | Toast notification: "Something went wrong. Please try again." |

#### Back-end requirements (Thiago)

- `POST /api/auth/register` -- create account, return JWT + refresh token
- `POST /api/auth/login` -- login with email/password
- `POST /api/auth/google` -- login/register via Google (simulated in v1, real later)
- `GET /api/auth/verify/:token` -- email verification
- Store user with fields: `id`, `email`, `store_name`, `auth_provider`, `email_verified`, `trial_start`, `trial_end`, `created_at`
- Trial period: 7 days from `created_at`

---

### Screen: `/login`

Simple login for returning users.

```
+--------------------------------------------------+
|  Angel Maria logo (centered)                     |
|                                                  |
|  "Welcome back"                                  |
|                                                  |
|  [  Continue with Google  ]                      |
|                                                  |
|  ──────── or ────────                            |
|                                                  |
|  Email               [___________________]       |
|  Password            [___________________]       |
|                                                  |
|  [  Log in  ]                                    |
|                                                  |
|  "Forgot password?"                              |
|  "Don't have an account? Start free trial"       |
+--------------------------------------------------+
```

#### States

| State | Behavior |
|-------|----------|
| Wrong credentials | "Incorrect email or password. Try again or reset your password." |
| Account not found | "No account found with this email. Create one?" |
| Too many attempts | "Too many login attempts. Try again in 5 minutes." (rate limit: 5 attempts / 5 min) |

---

## Part 2: Onboarding Dashboard

### Screen: `/onboarding`

**Purpose:** Guide the user through 4 required setup steps before they can launch Angel Maria. Each step is a card (quadrant). Progress is visible at a glance.

**User's emotional state:** Excited but potentially overwhelmed. They just signed up and want to see value fast. The dashboard must feel achievable, not like a chore list.

#### Layout

```
+------------------------------------------------------------------+
|  Angel Maria logo          Trial: 6 days left          [Avatar]  |
+------------------------------------------------------------------+
|                                                                  |
|  "Set up Angel Maria"                                            |
|  "Complete these 4 steps to activate your email agent."          |
|                                                                  |
|  +---------------------------+  +---------------------------+    |
|  |  1. Connect Shopify       |  |  2. Connect Email         |    |
|  |                           |  |                           |    |
|  |  [icon: shop]             |  |  [icon: mail]             |    |
|  |                           |  |                           |    |
|  |  Link your store so       |  |  Set up your support      |    |
|  |  Angel Maria can look     |  |  email address so replies  |    |
|  |  up orders and products.  |  |  come from your domain.   |    |
|  |                           |  |                           |    |
|  |  [  Connect store  ]      |  |  [  Set up email  ]       |    |
|  +---------------------------+  +---------------------------+    |
|                                                                  |
|  +---------------------------+  +---------------------------+    |
|  |  3. Knowledge Base        |  |  4. Cases & Rules         |    |
|  |                           |  |                           |    |
|  |  [icon: book]             |  |  [icon: list-checks]      |    |
|  |                           |  |                           |    |
|  |  Add product info, FAQ,   |  |  Tell Angel Maria how     |    |
|  |  and policies so Angel    |  |  to handle returns,       |    |
|  |  Maria answers accurately.|  |  complaints, and more.    |    |
|  |                           |  |                           |    |
|  |  [  Add knowledge  ]      |  |  [  Set up rules  ]       |    |
|  +---------------------------+  +---------------------------+    |
|                                                                  |
|  +----------------------------------------------------------+   |
|  |  [  Launch Angel Maria  ]     <- disabled until all 4     |   |
|  |  "Complete all 4 steps to activate"                       |   |
|  +----------------------------------------------------------+   |
|                                                                  |
+------------------------------------------------------------------+
```

#### Card States

Each of the 4 cards has 3 states:

**Pending (not started)**
- Neutral border/background
- Icon in muted color
- CTA button: "Connect store" / "Set up email" / etc.

**Completed**
- Green checkmark overlay on the icon (or green border/accent)
- Summary line replacing the description, e.g. "Connected: mystore.myshopify.com"
- CTA button changes to "Edit settings" (secondary/ghost style)

**In progress (user started but didn't finish)**
- Amber/yellow accent
- Text: "Setup incomplete"
- CTA button: "Continue setup"

#### Launch Button Logic

| Condition | Button state |
|-----------|-------------|
| 0-3 steps completed | Disabled, greyed out. Label: "Launch Angel Maria". Subtext: "Complete all 4 steps to activate" |
| All 4 completed | Active, primary color, slight pulse animation. Label: "Launch Angel Maria". Subtext: "You're ready to go" |

#### Trial Banner

Persistent top bar showing days remaining: "Free trial: X days left". At 2 days remaining, change color to amber. At 0 days, block access with upgrade prompt.

#### Back-end requirements (Thiago)

- `GET /api/onboarding/status` -- returns completion state of all 4 steps: `{ shopify: bool, email: bool, knowledge_base: bool, rules: bool }`
- Each setup flow has its own endpoints (detailed below)
- `POST /api/onboarding/launch` -- activates the agent, sets `merchant.status = active`

---

## Part 3: Setup Flow 1 -- Connect Shopify

### Screen: `/onboarding/shopify`

**Purpose:** Connect the user's Shopify store via OAuth so Angel Maria can read orders, products, and customers.

#### Flow

```
Step 1: Enter store URL
Step 2: Redirect to Shopify OAuth consent
Step 3: Callback -> confirm connection
Step 4: Return to onboarding dashboard (card updated)
```

#### Step 1: Enter Store URL

```
+--------------------------------------------------+
|  <- Back to setup                                |
|                                                  |
|  "Connect your Shopify store"                    |
|  "Angel Maria needs access to your orders and    |
|   products to answer customer emails."           |
|                                                  |
|  Your Shopify store URL                          |
|  [_____________].myshopify.com                   |
|                                                  |
|  [  Connect to Shopify  ]                        |
|                                                  |
|  "We only request read access. Angel Maria       |
|   will never change your orders or products."    |
+--------------------------------------------------+
```

**Field:** Store handle (the part before `.myshopify.com`). Validate: alphanumeric + hyphens, 3-50 chars.

**Error states:**
- Invalid store handle: "That doesn't look like a valid Shopify store URL."
- Store not found (after OAuth attempt): "We couldn't find that store. Double-check the URL and try again."
- OAuth denied by user: "You need to approve access for Angel Maria to work. Try again when you're ready."

#### Step 2: Shopify OAuth Redirect

User is redirected to Shopify's OAuth consent screen (real Shopify flow). Scopes requested: `read_orders`, `read_products`, `read_customers`.

#### Step 3: Callback Confirmation

After Shopify redirects back:

```
+--------------------------------------------------+
|                                                  |
|  [checkmark icon]                                |
|                                                  |
|  "Connected!"                                    |
|  "mystore.myshopify.com is now linked            |
|   to Angel Maria."                               |
|                                                  |
|  [  Back to setup  ]                             |
+--------------------------------------------------+
```

Auto-redirect to onboarding dashboard after 3 seconds, or user clicks.

#### Back-end requirements (Thiago)

- `POST /api/shopify/connect` -- initiate OAuth, return redirect URL
- `GET /api/shopify/callback` -- handle OAuth callback, store `access_token`
- `GET /api/shopify/status` -- check if store is connected, return store URL
- `DELETE /api/shopify/disconnect` -- remove connection (for "Edit settings")
- Store: `shopify_store_url`, `shopify_access_token`, `shopify_scopes`, `connected_at`

---

## Part 4: Setup Flow 2 -- Connect Email

### Screen: `/onboarding/email`

**Purpose:** Configure the email address Angel Maria will send from (e.g. support@theirstore.com). This requires DNS records on the merchant's domain.

#### Flow

```
Step 1: Enter sending email address
Step 2: DNS setup wizard (SPF, DKIM, DMARC)
Step 3: Verify DNS records
Step 4: Send test email
Step 5: Return to onboarding dashboard
```

#### Step 1: Enter Email Address

```
+--------------------------------------------------+
|  <- Back to setup                                |
|                                                  |
|  "Set up your support email"                     |
|  "Angel Maria will send replies from this        |
|   address so customers see your brand."          |
|                                                  |
|  Sending email address                           |
|  [___________________] e.g. support@mystore.com  |
|                                                  |
|  [  Continue  ]                                  |
+--------------------------------------------------+
```

**Validation:** Valid email format. Domain must not be a free provider (gmail.com, outlook.com, etc.) -- show: "You need a custom domain email (e.g. support@yourstore.com). Free email providers aren't supported."

#### Step 2: DNS Setup Wizard

```
+--------------------------------------------------+
|  <- Back                                         |
|                                                  |
|  "Add these DNS records to yourstore.com"        |
|  "This proves you own the domain and makes       |
|   sure emails land in the inbox, not spam."      |
|                                                  |
|  We detected your registrar: Namecheap           |
|  [View setup guide for Namecheap]                |
|                                                  |
|  Record 1: SPF                                   |
|  Type: TXT                                       |
|  Host: @                                         |
|  Value: v=spf1 include:spf.mtasv.net ~all  [copy]|
|  Status: [pending / verified]                    |
|                                                  |
|  Record 2: DKIM                                  |
|  Type: TXT                                       |
|  Host: 20240101._domainkey                       |
|  Value: k=rsa; p=MIGfMA0GCS...           [copy]  |
|  Status: [pending / verified]                    |
|                                                  |
|  Record 3: DMARC (recommended)                   |
|  Type: TXT                                       |
|  Host: _dmarc                                    |
|  Value: v=DMARC1; p=none; rua=...        [copy]  |
|  Status: [pending / verified]                    |
|                                                  |
|  [  Verify DNS records  ]                        |
|                                                  |
|  "DNS changes can take up to 48 hours, but       |
|   usually it's done in 15 minutes."              |
+--------------------------------------------------+
```

**Key interactions:**
- Each record has a [copy] button that copies the value to clipboard with confirmation toast
- "Verify DNS records" triggers a check. Show spinner while checking.
- Status per record: pending (grey), verified (green check), failed (red x with tooltip)
- If not all records verify: "Some records aren't showing up yet. Try again in a few minutes." with [Retry] button

**Registrar detection:** Attempt to detect registrar from domain WHOIS/NS records. Show a relevant setup guide link. If detection fails, show a generic guide and a dropdown: "Select your registrar" (Namecheap, GoDaddy, Cloudflare, Google Domains, Other).

#### Step 3: Send Test Email

After DNS verification passes:

```
+--------------------------------------------------+
|                                                  |
|  "DNS verified! Let's send a test email."        |
|                                                  |
|  Send a test email to:                           |
|  [___________________] <- pre-filled with their  |
|                          registration email       |
|                                                  |
|  [  Send test email  ]                           |
|                                                  |
+--------------------------------------------------+
```

After sending:

```
+--------------------------------------------------+
|                                                  |
|  "Test email sent!"                              |
|  "Check your inbox for an email from             |
|   support@yourstore.com"                         |
|                                                  |
|  [  I received it -- continue  ]                 |
|  [  I didn't get it -- help  ]                   |
+--------------------------------------------------+
```

"I didn't get it" opens troubleshooting tips: check spam, wait 2 minutes, verify DNS records again.

#### Back-end requirements (Thiago)

- `POST /api/email/setup` -- register sending identity with Postmark, return required DNS records
- `POST /api/email/verify-dns` -- check DNS records, return status per record
- `POST /api/email/send-test` -- send test email via Postmark
- `GET /api/email/status` -- check if email setup is complete
- Registrar detection: NS record lookup to guess registrar
- Store: `sending_email`, `domain`, `postmark_sender_id`, `dns_verified`, `test_sent`

---

## Part 5: Setup Flow 3 -- Knowledge Base

### Screen: `/onboarding/knowledge-base`

**Purpose:** Give Angel Maria the information it needs to answer product and policy questions accurately.

#### Flow

```
Step 1: Add knowledge (products, FAQ, policies)
Step 2: Review and save
Step 3: Return to onboarding dashboard
```

#### Layout

```
+------------------------------------------------------------------+
|  <- Back to setup                                                |
|                                                                  |
|  "Teach Angel Maria about your store"                            |
|  "The more it knows, the better it answers."                     |
|                                                                  |
|  +------------------------------------------------------------+ |
|  |  Products                                        [auto-sync]| |
|  |  Synced from Shopify: 47 products loaded.                   | |
|  |  Last synced: just now                    [Refresh]         | |
|  +------------------------------------------------------------+ |
|                                                                  |
|  +------------------------------------------------------------+ |
|  |  Return & Refund Policy                          [required] | |
|  |                                                             | |
|  |  [                                                   ]      | |
|  |  [  Paste or type your return policy here.           ]      | |
|  |  [  Tip: include timeframes, conditions, and who     ]      | |
|  |  [  pays for return shipping.                        ]      | |
|  |  [                                                   ]      | |
|  +------------------------------------------------------------+ |
|                                                                  |
|  +------------------------------------------------------------+ |
|  |  Shipping Policy                                 [required] | |
|  |                                                             | |
|  |  [                                                   ]      | |
|  |  [  Paste or type your shipping info here.           ]      | |
|  |  [  Tip: include delivery times per region and       ]      | |
|  |  [  what carrier(s) you use.                         ]      | |
|  |  [                                                   ]      | |
|  +------------------------------------------------------------+ |
|                                                                  |
|  +------------------------------------------------------------+ |
|  |  FAQ / Additional Info                          [optional]  | |
|  |                                                             | |
|  |  [                                                   ]      | |
|  |  [  Anything else Angel Maria should know.           ]      | |
|  |  [  Common questions, brand voice notes, etc.        ]      | |
|  |  [                                                   ]      | |
|  +------------------------------------------------------------+ |
|                                                                  |
|  [  Save knowledge base  ]                                       |
|                                                                  |
|  "You can update this anytime. Changes apply                     |
|   to new conversations immediately."                             |
+------------------------------------------------------------------+
```

**Key interactions:**
- Products auto-sync from Shopify (if connected). Show product count. Refresh button re-syncs.
- If Shopify not connected yet: "Connect Shopify first to auto-sync your products." with link to Shopify setup.
- Return policy and shipping policy are required (minimum 50 characters each).
- FAQ is optional.
- All text fields are large textareas (min-height: 150px).
- Auto-save draft every 30 seconds (show subtle "Draft saved" indicator).

**Validation:**
- Return policy: required, min 50 chars. Error: "Your return policy is too short. Include your conditions, timeframes, and process."
- Shipping policy: required, min 50 chars. Error: "Your shipping policy is too short. Include delivery times and carriers."

#### Back-end requirements (Thiago)

- `POST /api/knowledge-base` -- save/update knowledge base content
- `GET /api/knowledge-base` -- retrieve current knowledge base
- `POST /api/knowledge-base/sync-products` -- pull products from Shopify, store product descriptions
- Auto-draft save: can be client-side (localStorage) or server-side (`PUT /api/knowledge-base/draft`)
- Store: `return_policy` (text), `shipping_policy` (text), `faq` (text), `products_synced_at`, `updated_at`

---

## Part 6: Setup Flow 4 -- Cases & Rules

### Screen: `/onboarding/rules`

**Purpose:** Define how Angel Maria handles different types of customer emails. Rules are written in plain language.

#### Flow

```
Step 1: Select which case types to enable
Step 2: Configure rules per case type
Step 3: Save and return to onboarding dashboard
```

#### Step 1: Select Case Types

```
+------------------------------------------------------------------+
|  <- Back to setup                                                |
|                                                                  |
|  "Choose what Angel Maria handles"                               |
|  "Turn on the case types you want automated.                     |
|   You can always add more later."                                |
|                                                                  |
|  [ON]  Return requests                                           |
|        Customer wants to send something back.                    |
|        [  Set rules ->  ]                                        |
|                                                                  |
|  [ON]  Order status questions                                    |
|        "Where is my package?" and tracking requests.             |
|        [  Set rules ->  ]                                        |
|                                                                  |
|  [ON]  Product questions                                         |
|        Questions about size, color, features, stock.             |
|        [  Set rules ->  ]                                        |
|                                                                  |
|  [OFF] Damaged or wrong item                                     |
|        Customer received the wrong item or it arrived broken.    |
|        [  Set rules ->  ]                                        |
|                                                                  |
|  [OFF] Shipping delays                                           |
|        Package is late or stuck in transit.                       |
|        [  Set rules ->  ]                                        |
|                                                                  |
|  [OFF] General questions                                         |
|        Anything that doesn't fit the above categories.           |
|        [  Set rules ->  ]                                        |
|                                                                  |
|  "At least 1 case type must be enabled."                         |
+------------------------------------------------------------------+
```

**Key interactions:**
- Toggle switches to enable/disable case types
- Pre-enabled defaults: Return requests, Order status, Product questions
- "Set rules" opens inline expansion or sub-screen per case type
- At least 1 case type must be enabled to complete this step

#### Step 2: Configure Rules (per case type)

Example for "Return requests":

```
+------------------------------------------------------------------+
|  Rules for: Return requests                          [collapse]  |
|                                                                  |
|  "Tell Angel Maria what to do when a customer wants to return."  |
|                                                                  |
|  Strategy:                                                       |
|  (o) Try to save the sale with discounts     <- default          |
|  ( ) Accept all returns immediately                              |
|  ( ) Always escalate to me                                       |
|                                                                  |
|  [If "save the sale" selected:]                                  |
|                                                                  |
|  First offer:    [  20  ] % discount    <- editable, default 20  |
|  Second offer:   [  50  ] % discount    <- editable, default 50  |
|  If both declined: ( ) Escalate to me   (o) Accept the return    |
|                                                                  |
|  Tone:                                                           |
|  ( ) Formal and professional                                     |
|  (o) Friendly and personal            <- default                 |
|  ( ) Short and to the point                                      |
|                                                                  |
|  Additional instructions (optional):                             |
|  [                                                        ]      |
|  [  e.g. "Never mention our supplier" or "Always           ]     |
|  [  apologize first"                                       ]     |
|                                                                  |
+------------------------------------------------------------------+
```

Example for "Order status questions":

```
+------------------------------------------------------------------+
|  Rules for: Order status questions                   [collapse]  |
|                                                                  |
|  This is handled automatically.                                  |
|  Angel Maria looks up the order in Shopify and replies with      |
|  the latest tracking info and estimated delivery date.           |
|                                                                  |
|  If no tracking info is available:                               |
|  (o) Tell the customer their order is being processed            |
|  ( ) Escalate to me                                              |
|                                                                  |
|  Proactive follow-up:                                            |
|  [ON]  Send a follow-up email 2 days after estimated delivery    |
|        to check if the package arrived.                          |
|                                                                  |
+------------------------------------------------------------------+
```

**Key patterns across all case types:**
- Each has a strategy selector (radio buttons for the main approach)
- Sensible defaults pre-selected so the user can just accept and continue
- Optional plain-language instructions field for custom behavior
- Tone selector (shared across all case types, set once at the top or per case)

**Proactive email settings** (applies to relevant case types):
- Toggle for automated follow-up emails
- Configurable timing (e.g. "X days after delivery")
- These go in a "Proactive follow-ups" section at the bottom of the rules page

#### Save & Complete

```
+------------------------------------------------------------------+
|                                                                  |
|  [  Save rules  ]                                                |
|                                                                  |
|  "You can change these anytime from your settings."              |
+------------------------------------------------------------------+
```

After save: redirect to onboarding dashboard with card 4 marked complete.

#### Back-end requirements (Thiago)

- `GET /api/rules` -- retrieve all case types and their rules
- `POST /api/rules` -- save/update all rules
- `GET /api/rules/defaults` -- return default case types and pre-filled rules
- Data model per case type: `{ type: string, enabled: bool, strategy: string, params: JSON, tone: string, custom_instructions: text, proactive_followup: bool, followup_delay_days: int }`
- Escalation keywords (global): stored as array of strings, editable later in settings

---

## Part 7: Launch

### Trigger: All 4 quadrants completed

When all 4 steps are completed, the launch button on `/onboarding` becomes active.

#### Launch Button Active State

```
+----------------------------------------------------------+
|                                                          |
|  [pulse animation]                                       |
|  [  Launch Angel Maria  ]    <- primary, prominent       |
|                                                          |
|  "Angel Maria will start handling emails                 |
|   to support@yourstore.com immediately."                 |
+----------------------------------------------------------+
```

#### Confirmation Modal

On click:

```
+--------------------------------------------------+
|                                                  |
|  "Ready to go live?"                             |
|                                                  |
|  Angel Maria will start answering customer       |
|  emails sent to support@yourstore.com.           |
|                                                  |
|  Connected store: mystore.myshopify.com          |
|  Email: support@mystore.com                      |
|  Active cases: Returns, Order status, Products   |
|                                                  |
|  [  Go live  ]        [  Not yet  ]              |
+--------------------------------------------------+
```

"Not yet" closes the modal (no destructive action).
"Go live" -> POST `/api/onboarding/launch` -> redirect to `/dashboard`.

#### Back-end requirements (Thiago)

- `POST /api/onboarding/launch` -- validate all 4 steps are complete, set `merchant.status = active`, enable inbound email processing
- If validation fails (e.g. DNS expired): return error specifying which step needs attention

---

## Part 8: Main Dashboard (Empty State)

### Screen: `/dashboard`

**Purpose:** This is where the user lands after launch. Initially empty because no emails have been processed yet.

```
+------------------------------------------------------------------+
|  Angel Maria logo      [Settings]  [Knowledge Base]   [Avatar]   |
+------------------------------------------------------------------+
|                                                                  |
|  "Angel Maria is live"                                           |
|  "Listening for emails at support@yourstore.com"                 |
|                                                                  |
|  +-----------------------------+  +----------------------------+ |
|  |  Cases handled        0     |  |  Returns saved       0     | |
|  +-----------------------------+  +----------------------------+ |
|  |  Escalations          0     |  |  Money saved      EUR 0    | |
|  +-----------------------------+  +----------------------------+ |
|                                                                  |
|  +------------------------------------------------------------+ |
|  |                                                            | |
|  |  [mailbox illustration]                                    | |
|  |                                                            | |
|  |  "No cases yet"                                            | |
|  |  "When customers email support@yourstore.com,              | |
|  |   their cases will appear here."                           | |
|  |                                                            | |
|  |  Want to test it?                                          | |
|  |  Send an email to support@yourstore.com from a             | |
|  |  different address and watch Angel Maria respond.          | |
|  |                                                            | |
|  +------------------------------------------------------------+ |
|                                                                  |
+------------------------------------------------------------------+
```

**Key UX decisions:**
- The empty state is encouraging, not depressing. It explains what will happen and gives them a way to test it immediately.
- Metric cards show zeros but are visible from the start -- this anchors the user on what value looks like.
- "Want to test it?" is critical for activation. A user who tests it once is far more likely to keep using it.

---

## Shared Components

### Navigation

**During onboarding (before launch):**
- Minimal nav: logo, trial countdown, avatar/account dropdown
- No sidebar. Keep focus on setup.

**After launch:**
- Left sidebar: Dashboard, Cases, Knowledge Base, Rules, Settings
- Top bar: logo, notification bell, avatar

### Toast Notifications

Used for: successful saves, copy-to-clipboard confirmation, non-critical errors.
Position: top-right. Auto-dismiss after 4 seconds. Dismissible manually.

### Loading States

- Buttons: replace label with spinner, keep width stable
- Pages: skeleton loaders matching the layout structure
- API calls: show loading within 300ms (don't flash for fast responses)

### Error Handling (Global)

- Network error: "Connection lost. Checking..." with auto-retry
- 500 errors: "Something went wrong on our end. Try again in a moment."
- Session expired: redirect to `/login` with message "Your session expired. Please log in again."

---

## API Summary for Thiago

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/login` | Log in |
| POST | `/api/auth/google` | Google auth (simulated v1) |
| GET | `/api/auth/verify/:token` | Email verification |
| GET | `/api/onboarding/status` | Get completion state of all 4 steps |
| POST | `/api/onboarding/launch` | Activate the agent |
| POST | `/api/shopify/connect` | Initiate Shopify OAuth |
| GET | `/api/shopify/callback` | Shopify OAuth callback |
| GET | `/api/shopify/status` | Check Shopify connection |
| DELETE | `/api/shopify/disconnect` | Remove Shopify connection |
| POST | `/api/email/setup` | Register sending identity |
| POST | `/api/email/verify-dns` | Check DNS records |
| POST | `/api/email/send-test` | Send test email |
| GET | `/api/email/status` | Check email setup status |
| GET | `/api/knowledge-base` | Get knowledge base |
| POST | `/api/knowledge-base` | Save knowledge base |
| POST | `/api/knowledge-base/sync-products` | Sync products from Shopify |
| GET | `/api/rules` | Get all rules |
| POST | `/api/rules` | Save all rules |
| GET | `/api/rules/defaults` | Get default rule templates |

---

## UX Risks and Mitigations

| Risk | Mitigation |
|------|------------|
| DNS setup drops off | Wizard with registrar detection, copy buttons, and clear status per record. Offer "need help?" link to support. |
| User overwhelmed by 4 steps | Show progress clearly, pre-fill defaults, let them do steps in any order. Each step is under 5 minutes. |
| User launches but doesn't test | "Want to test it?" CTA in empty dashboard state. Consider auto-sending a demo email to show the system working. |
| User forgets to come back after DNS propagation | Email reminder after 2 hours if DNS isn't verified yet: "Your DNS records are still propagating. Check back soon." |
| Rules are too complex for non-technical users | Plain-language descriptions, radio buttons instead of free text, sensible defaults that work out of the box. |
