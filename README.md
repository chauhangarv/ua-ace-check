# 🌐 UA-ACE Check — Universal Acceptance Validator

A browser-based tool that validates whether email addresses and domain names comply with ICANN’s **Universal Acceptance (UA)** standards.

🔗 **Live Demo:** https://ua-ace-check.vercel.app

---

## 🌍 What is Universal Acceptance?

Universal Acceptance (UA) ensures that **all valid domain names and email addresses** — including Internationalized Domain Names (IDNs) and non-Latin scripts — are correctly accepted, validated, and processed by internet systems.

Without UA compliance, users with identities in scripts like Hindi, Arabic, Chinese, or Tamil are often rejected by systems designed only for ASCII — leading to **systemic digital exclusion**.

---

## 🎯 Purpose of This Project

Across the Asia-Pacific region, rapid digitisation of public services has not always accounted for Universal Acceptance. This creates barriers in:

- Welfare access  
- Healthcare systems  
- Education platforms  
- Civic participation  

This tool is built to:

- 🧠 Educate developers and policymakers about UA compliance  
- 🔬 Demonstrate practical implementation of UA validation  
- 🌉 Bridge the gap between policy and technical systems  

This project aligns with:

- ICANN Public Comment on *Draft Guidelines for Advancing UA Adoption* (March 2026)  
- Research: *The Illiterate Citizen in a Digital State (2026)*  

---

## ✨ Features

- ✅ Email validation with internationalization support (EAI)
- 🌐 Domain validation with IDN and Punycode support
- 📏 RFC-compliant length and structure checks
- ⚡ Real-time browser-based validation
- 🧩 Extendable architecture for additional checks

---

## 🔍 What It Validates

### 📧 Email Addresses
- Exactly one `@` symbol (**RFC 5321**)
- Unicode local parts (**RFC 6531**)
- Maximum length: 254 bytes
- Valid domain with IDN support

### 🌐 Domain Names
- Valid TLDs (including new gTLDs and IDNs)
- Unicode + Punycode (`xn--`) encoding (**RFC 5890**)
- Label length ≤ 63 bytes (**RFC 1035**)
- Total length ≤ 253 bytes

---

## 🧪 Example Test Cases

### ✅ UA-Compliant Inputs
- `उपयोगकर्ता@उदाहरण.भारत` (Hindi)
- `用户@例子.广告` (Chinese)
- `user@example.academy` (new gTLD)
- `xn--p1ai` (Punycode encoded IDN)

### ❌ Common Failure Cases (Non-UA Systems)
- Emails with non-ASCII local parts rejected
- Domains with long or new TLDs rejected
- IDN domains not supported

---

## 📚 Standards Referenced

- RFC 5321 — Simple Mail Transfer Protocol  
- RFC 6531 — Internationalized Email (EAI)  
- RFC 5890 — IDNA (Internationalized Domain Names)  
- RFC 1035 — Domain Name Specifications  
- ICANN Universal Acceptance Steering Group (UASG)

---

## 🛠️ Tech Stack

- TypeScript  
- React  
- Vercel  

---

## 🚀 Getting Started

```bash
git clone https://github.com/chauhangarv/ua-ace-check.git
cd ua-ace-check
npm install
npm run dev
