# Product Brief: AI Customer Service Tool for Drop Shippers

## What we're building

A lightweight, email-only AI customer service tool built for drop shippers. It handles incoming customer emails automatically — answering questions, preventing returns, and escalating to the owner when needed. It sends replies from the merchant's own domain, so it feels like a real person is responding.

The ROI story is simple: a Filipino VA costs €4–5/hour, roughly €80–150/month for a typical store. This tool costs less and handles 80%+ of cases automatically. The "saves" dashboard makes the value visible.

---

## Core use cases

1. **Return prevention** — customer wants to return an item; AI tries to save the sale with a staged discount offer (e.g. 20% first, escalate to 50% if they push back)
2. **Order status questions** — "where is my package?"; AI looks up the order in Shopify and replies with real data
3. **Product questions** — answered using a product knowledge base the merchant provides
4. **General queries** — handled by configurable rules the merchant sets up

---

## Functional requirements

### Email infrastructure

- Send emails from the merchant's own domain (e.g. `support@theirstore.com`)
- Use Postmark, Mailgun, or SendGrid for delivery — not Gmail/Outlook relay
- Require SPF, DKIM, and DMARC DNS records on the merchant's domain
- Provide a guided DNS setup wizard: detect registrar, show step-by-step instructions with screenshots
- Receive inbound email via MX record routing or forwarding to our processing endpoint
- All outbound emails must pass spam checks before sending

### Conversation threading

- Group all emails from the same customer about the same issue into a single case
- Track full conversation history per case: what was said, what was offered, what the outcome was
- Never repeat a discount offer already made in the same case
- Mark cases as open, resolved, or escalated

### Shopify integration

- Connect via Shopify OAuth (merchant installs our app or connects via API key)
- Look up orders by email address or order number in real time
- Retrieve: order status, tracking number, estimated delivery, line items, fulfilment status
- Handle gracefully: order not found, multiple orders from same customer, partially fulfilled orders

### Knowledge base

- Merchant can upload or paste: product descriptions, FAQ, return policy, shipping policy
- AI uses this to answer product questions accurately
- Merchant can update it at any time; changes apply to new conversations immediately

### Rules engine

- Merchant defines response rules in plain language (e.g. "If the customer wants to return, first offer 20% off. If they decline, offer 50% off. If they still decline, escalate.")
- Rules apply per topic: returns, shipping delays, wrong item, damaged goods, etc.
- Rules are editable without technical knowledge — plain text or simple form UI

### Escalation

- Configurable escalation triggers: number of replies without resolution, specific keywords (e.g. "chargeback", "lawyer", "fraud"), customer sentiment, or manual merchant rules
- Escalated cases go to a simple review queue
- Owner gets a push notification (mobile) or email alert
- Owner can: approve the AI's draft reply, edit and send, or write a manual reply
- Escalated cases are flagged visibly in the dashboard

### Dashboard

- Per-case view: full email thread, AI actions taken, outcome
- "Saves" metric: number of returns prevented, estimated value saved (in euros)
- Resolution rate: % of cases handled without escalation
- Escalation rate and reason breakdown
- Response time average
- Filter by date range and case status

---

## Technical architecture

### Email sending

**Approach:** Custom domain authentication via transactional email provider (Postmark recommended for deliverability).

Each merchant gets:
- A sending identity configured on our Postmark/Mailgun account
- DNS records to add to their domain: SPF, DKIM (provider-generated), DMARC
- Onboarding wizard to walk them through DNS setup step by step

**Inbound routing:**
- Merchant adds an MX record pointing to our inbound processing endpoint
- Or: sets up email forwarding from their support address to a unique address we assign them
- We receive the raw email, parse it (headers, body, threading), and process it

**Libraries/services:**
- Postmark for sending and inbound webhooks
- `mailparser` (Node) or `email` (Python) for parsing raw MIME
- Store raw email headers to preserve `Message-ID` and `References` for proper threading

### Conversation threading logic

- Use email `Message-ID`, `In-Reply-To`, and `References` headers to group emails into threads
- Fall back to: same sender email + same subject line (normalised, "Re:" stripped)
- Store full thread history in database, pass relevant history to LLM on each new email

### AI response generation

- Model: Claude via Anthropic API (claude-sonnet-4-20250514)
- System prompt includes: merchant's rules, knowledge base excerpt, conversation history, Shopify order data
- Response must be a single plain-text (or light HTML) email reply
- Implement staged offer logic: track what has already been offered per case and pass this in context
- Temperature: low (0.3–0.5) for consistent, professional tone

### Shopify integration

- OAuth 2.0 flow for merchant authentication
- Scopes needed: `read_orders`, `read_products`, `read_customers`
- On each incoming email: attempt to match sender email to a Shopify customer, fetch their recent orders
- Cache order data briefly (60 seconds) to avoid redundant API calls
- Handle rate limits gracefully with exponential backoff

### Escalation queue

- Simple web UI: list of escalated cases with preview
- Each case shows: full thread, AI draft (if available), reason for escalation
- Actions: send AI draft, edit and send, write manually, mark as resolved
- Push notifications via FCM (Firebase) for mobile, or email digest

### Data model (simplified)

```
Merchant
  - id, domain, shopify_store_url, shopify_access_token
  - postmark_sender_signature_id
  - rules (JSON), knowledge_base (text)

Case
  - id, merchant_id, customer_email, status (open/resolved/escalated)
  - created_at, resolved_at
  - outcome (resolved_by_ai / escalated / saved_return / unsaved_return)
  - estimated_value_saved

Message
  - id, case_id, direction (inbound/outbound)
  - raw_email, parsed_body, message_id_header
  - sent_at, ai_generated (bool)

Offer
  - id, case_id, offer_type, offer_value, customer_response
```

---

## What we are not building (v1)

- Live chat or chatbot widget
- SMS or WhatsApp
- Phone support
- Multi-agent / team inbox with multiple human agents
- Integrations beyond Shopify (WooCommerce, etc. — later)
- Sentiment analysis model (use heuristics and keywords for now)

---

## Competitor landscape

| Tool | Target | Shopify? | AI? | Price | Gap |
|---|---|---|---|---|---|
| Gorgias | E-commerce brands | Yes | Yes | €10+/seat | Too heavy, too expensive for drop shippers |
| eDesk | E-commerce | Yes | Partial | €69+/mo | Built for teams, not solo operators |
| Richpanel | E-commerce | Yes | Yes | €29+/mo | Aimed at growth brands, not drop shippers |
| Tidio | SMBs | Yes | Yes | Freemium | Chat-first, not email-first |
| Freshdesk | General | Plugin | Add-on | Complex | Overkill |

**Our position:** email-only, drop-shipper-specific, priced against the VA cost (not against other software), with a "saves" dashboard that makes ROI tangible.

---

## Pricing model (proposed)

- **Starter:** €29/month — up to 200 cases/month, 1 store
- **Growth:** €59/month — up to 600 cases/month, 3 stores
- **Scale:** €99/month — unlimited cases, unlimited stores

Anchor the conversation on VA cost saved, not on feature comparison.

---

## Risks and open questions

| Risk | Mitigation |
|---|---|
| DNS setup drops conversion | Invest heavily in guided wizard; offer white-glove setup for first 50 customers |
| AI repeats offers or loses thread context | Robust case memory; always pass full offer history in prompt |
| High LLM API costs at volume | Monitor cost per case; set per-plan case limits; optimise prompt length |
| Drop shippers are high-churn | Price low enough to stay, build stickiness via saves dashboard and historical data |
| Spam / deliverability issues | Use Postmark (best deliverability), enforce DKIM/DMARC, monitor bounce rates |
| Merchants use it for policy-violating products | Terms of service enforcement; account review process |

---

## Build order (suggested)

1. Email infrastructure: inbound parsing + outbound sending via Postmark with DNS wizard
2. Shopify OAuth + order lookup
3. Basic rules engine + AI response generation (Claude API)
4. Conversation threading and case management
5. Escalation queue (web UI)
6. Dashboard with saves metric
7. Knowledge base upload and management
8. Mobile push notifications for escalations
