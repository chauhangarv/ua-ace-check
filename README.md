# UA-Check — Universal Acceptance Validator

A browser-based tool that checks whether an email address or domain name 
is compliant with ICANN's Universal Acceptance (UA) standards.

Live: https://ua-ace-check.vercel.app

---

## What is Universal Acceptance?

Universal Acceptance ensures that all valid domain names and email 
addresses — including Internationalized Domain Names (IDNs) in non-Latin 
scripts — are correctly accepted, validated, and processed by all 
internet-enabled applications and systems.

Without UA compliance, users with email addresses or domain names in 
scripts like Hindi, Arabic, Chinese, or Tamil are rejected by systems 
that only recognize ASCII characters — effectively excluding them from 
digital services.

---

## Why I Built This

Across Asia Pacific, governments are rapidly digitising essential 
services — welfare registration, healthcare, education, civic 
participation. Many of these systems were built without Universal 
Acceptance as a design principle, systematically excluding communities 
whose digital identities exist outside ASCII assumptions.

This tool was built to:
- Educate developers and policymakers about UA compliance
- Demonstrate technically what UA validation looks like in practice
- Connect the policy gap to a working technical solution

This project connects directly to my ICANN public comment submission on 
the Draft Guidelines for Advancing UA Adoption (March 2026) and my 
research paper — *The Illiterate Citizen in a Digital State: Digital 
Exclusion and the Denial of Social Rights in Rural India*.

---

## What It Validates

### Email Addresses
- Exactly one @ symbol (RFC 5321)
- Unicode local parts — internationalized email (RFC 6531)
- Total length within 254 bytes (RFC 5321)
- Valid domain part with IDN support

### Domain Names
- Valid TLD — including new gTLDs and IDN TLDs
- Internationalized characters and Punycode (xn--) encoding (RFC 5890)
- Label length within 63 bytes (RFC 1035)
- Total domain length within 253 bytes (RFC 1035)

---

## Example Test Cases

**Valid UA-compliant inputs:**
- उपयोगकर्ता@उदाहरण.भारत — Hindi email address
- user@example.academy — new gTLD
- 用户@例子.广告 — Chinese email address
- xn--p1ai — Russian IDN domain (Punycode encoded)

**Inputs that expose UA failures in non-compliant systems:**
- Any email with non-ASCII local part
- Any domain with TLD longer than 6 characters
- Any IDN domain in non-Latin script

---

## Technical Standards Referenced

- RFC 5321 — Simple Mail Transfer Protocol
- RFC 6531 — SMTP Extension for Internationalized Email
- RFC 5890 — Internationalized Domain Names for Applications (IDNA)
- RFC 1035 — Domain Names Implementation and Specification
- ICANN Universal Acceptance Steering Group (UASG) Guidelines

---

## Built With

- TypeScript
- React
- Vercel

---

## Author

**Garv Chauhan**
B.Tech - M.Tech CSE (Cybersecurity)
National Forensic Sciences University, New Delhi
NetMission Asia Research Fellow

ICANN Public Comment on UA Draft Guidelines: March 2026
Research: The Illiterate Citizen in a Digital State (2026)

---

## Related Work

- ICANN UA Draft Guidelines Public Comment — March 2026
- CircleID Article — Universal Acceptance and India's Welfare Crisis
- Research Paper — The Illiterate Citizen in a Digital State