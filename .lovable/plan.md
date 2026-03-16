

# UA-Check — Universal Acceptance Validator

## Overview
A client-side tool that validates email addresses and domain names for Universal Acceptance compliance, helping developers and users understand IDN, new gTLD, and non-ASCII support.

## Design
- **Centered utility card** (max 800px) on a soft gray background
- **Inter** font throughout
- **Tabbed interface**: Email Validator | Domain Validator
- **PASS/FAIL banner** with green (#10B981) / red (#EF4444) high-contrast results
- **Two-column results grid** (technical reason + UA requirement) below the banner
- ICANN Blue (#00539B) for headers and primary actions
- Mobile-responsive, stacked layout on small screens

## Pages & Sections

### 1. Validator Card (Main)
- Tab switcher (Email / Domain)
- Input field + "Check" button
- Result hero banner (PASS/FAIL with icon + text)
- Detailed explanation: why it passed/failed, what a UA-compliant system should do
- Example test cases as clickable chips users can try

### 2. Educational Section (below card)
- "What is Universal Acceptance" — plain language paragraph
- "Why It Matters" — India/Asia Pacific context
- Three real UA failure examples (CoWIN, government portals, welfare systems)
- Link to ICANN UASG resources

### 3. Footer
- ICANN/UASG reference, creator attribution

## Validation Logic (all client-side)

**Email rules:**
- Exactly one `@` symbol
- Local part allows Unicode characters
- Domain part allows IDN characters
- TLD ≥ 2 chars, supports new gTLDs and non-Latin TLDs
- Total length ≤ 254 chars
- Each label ≤ 63 chars

**Domain rules:**
- At least one dot
- Allows Unicode/IDN characters
- Any valid TLD (new gTLDs, IDN TLDs)
- Each label ≤ 63 chars
- Total length ≤ 253 chars

## Key Interactions
- Clicking example test cases auto-fills the input and runs validation
- Tab switching is instant (no animation)
- Results slide down with a snappy reveal
- PASS/FAIL always accompanied by text labels + colors (never icons alone)

## Technical Notes
- Built as a React SPA (per project stack), not a single HTML file
- All validation is pure client-side JavaScript — no backend needed
- Separate validator utility module for testability

