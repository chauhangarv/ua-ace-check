export interface ValidationCheck {
  label: string;
  passed: boolean;
  detail: string;
  requirement: string;
}

export interface ValidationResult {
  passed: boolean;
  summary: string;
  checks: ValidationCheck[];
  suggestion: string;
}

function getLabelLengths(name: string): number[] {
  return name.split(".").map((l) => new TextEncoder().encode(l).length);
}

function hasUnicode(str: string): boolean {
  return /[^\x00-\x7F]/.test(str);
}

export function validateEmail(email: string): ValidationResult {
  const checks: ValidationCheck[] = [];
  let allPassed = true;

  const fail = (label: string, detail: string, requirement: string) => {
    checks.push({ label, passed: false, detail, requirement });
    allPassed = false;
  };
  const pass = (label: string, detail: string, requirement: string) => {
    checks.push({ label, passed: true, detail, requirement });
  };

  // Exactly one @
  const atCount = (email.match(/@/g) || []).length;
  if (atCount !== 1) {
    fail("@ Symbol", `Found ${atCount} '@' symbol(s) — exactly one is required.`, "RFC 5321: Exactly one '@' separates local and domain parts.");
    return { passed: false, summary: "Invalid email structure — missing or multiple '@' symbols.", checks, suggestion: "Ensure the email contains exactly one '@' symbol separating the local part from the domain." };
  }

  const [localPart, domainPart] = email.split("@");

  // Non-empty parts
  if (!localPart) {
    fail("Local Part", "Local part (before @) is empty.", "The local part must contain at least one character.");
    allPassed = false;
  } else {
    pass("Local Part", `"${localPart}" — ${hasUnicode(localPart) ? "contains Unicode characters (internationalized)" : "ASCII characters"}.`, "UA requires systems to accept Unicode local parts (RFC 6531).");
  }

  if (!domainPart) {
    fail("Domain Part", "Domain part (after @) is empty.", "A valid domain is required after '@'.");
    return { passed: false, summary: "Invalid email — missing domain part.", checks, suggestion: "Add a valid domain after the '@' symbol." };
  }

  // Total length
  const totalBytes = new TextEncoder().encode(email).length;
  if (totalBytes > 254) {
    fail("Total Length", `${totalBytes} bytes — exceeds 254-byte limit.`, "RFC 5321: Total email address must not exceed 254 octets.");
  } else {
    pass("Total Length", `${totalBytes} bytes (limit: 254).`, "RFC 5321: Total email address must not exceed 254 octets.");
  }

  // Domain validation checks
  const domainChecks = validateDomainInternal(domainPart);
  checks.push(...domainChecks.checks);
  if (!domainChecks.passed) allPassed = false;

  const summary = allPassed
    ? `This email address is UA-compliant. ${hasUnicode(email) ? "It uses internationalized characters and would be accepted by UA-ready systems." : "It uses standard ASCII and is universally accepted."}`
    : "This email address has UA compliance issues that need attention.";

  const suggestion = allPassed
    ? "A UA-compliant system should accept this email for registration, login, and communication without modification."
    : "A UA-compliant system should be updated to handle internationalized email addresses per RFC 6531 (SMTPUTF8).";

  return { passed: allPassed, summary, checks, suggestion };
}

function validateDomainInternal(domain: string): { passed: boolean; checks: ValidationCheck[] } {
  const checks: ValidationCheck[] = [];
  let allPassed = true;

  const fail = (label: string, detail: string, requirement: string) => {
    checks.push({ label, passed: false, detail, requirement });
    allPassed = false;
  };
  const pass = (label: string, detail: string, requirement: string) => {
    checks.push({ label, passed: true, detail, requirement });
  };

  // Has dot
  if (!domain.includes(".")) {
    fail("Domain Structure", "No dot found — domain must have at least two labels.", "Domains require at least one dot separating labels (e.g., example.com).");
    return { passed: false, checks };
  }

  const labels = domain.split(".");
  const tld = labels[labels.length - 1];

  // TLD length
  const tldBytes = new TextEncoder().encode(tld).length;
  if (tldBytes < 2) {
    fail("TLD Length", `TLD "${tld}" is ${tldBytes} byte(s) — minimum is 2.`, "ICANN requires TLDs to be at least 2 characters.");
  } else {
    const tldInfo = hasUnicode(tld)
      ? `"${tld}" — internationalized TLD (IDN)`
      : tld.length > 4
        ? `".${tld}" — new gTLD (${tld.length} chars)`
        : `".${tld}" — standard TLD`;
    pass("TLD Validity", tldInfo, "UA requires acceptance of all ICANN-delegated TLDs including new gTLDs and IDN TLDs.");
  }

  // IDN detection
  if (hasUnicode(domain)) {
    pass("IDN Support", "Domain contains internationalized (non-ASCII) characters.", "UA requires systems to support Internationalized Domain Names (IDNs) per RFC 5890.");
  } else if (domain.startsWith("xn--") || labels.some((l) => l.startsWith("xn--"))) {
    pass("IDN Support", "Domain uses Punycode (ACE) encoding for internationalized characters.", "Punycode-encoded IDNs (xn--) must be accepted as valid domains.");
  } else {
    pass("Domain Characters", "Domain uses standard ASCII characters.", "ASCII domains are universally accepted.");
  }

  // Label lengths
  const labelLengths = getLabelLengths(domain);
  const maxLabel = Math.max(...labelLengths);
  if (maxLabel > 63) {
    fail("Label Length", `Longest label is ${maxLabel} bytes — exceeds 63-byte limit.`, "RFC 1035: Each label between dots must not exceed 63 octets.");
  } else {
    pass("Label Length", `All labels within 63-byte limit (longest: ${maxLabel} bytes).`, "RFC 1035: Each label between dots must not exceed 63 octets.");
  }

  // Total domain length
  const totalBytes = new TextEncoder().encode(domain).length;
  if (totalBytes > 253) {
    fail("Domain Length", `${totalBytes} bytes — exceeds 253-byte limit.`, "RFC 1035: Total domain name must not exceed 253 octets.");
  } else {
    pass("Domain Length", `${totalBytes} bytes (limit: 253).`, "RFC 1035: Total domain name must not exceed 253 octets.");
  }

  return { passed: allPassed, checks };
}

export function validateDomain(domain: string): ValidationResult {
  if (!domain || !domain.trim()) {
    return {
      passed: false,
      summary: "Please enter a domain name to validate.",
      checks: [],
      suggestion: "Enter a domain like example.com or example.भारत",
    };
  }

  const result = validateDomainInternal(domain.trim());

  const isIDN = hasUnicode(domain) || domain.includes("xn--");
  const summary = result.passed
    ? `This domain is UA-compliant. ${isIDN ? "It uses internationalized characters and should be accepted by UA-ready systems." : "It uses standard characters and is universally accepted."}`
    : "This domain has UA compliance issues.";

  const suggestion = result.passed
    ? "A UA-compliant system should accept this domain for web addresses, email routing, and DNS lookups without modification."
    : "Systems should be updated to handle internationalized domain names and new gTLDs per ICANN Universal Acceptance guidelines.";

  return { passed: result.passed, summary, checks: result.checks, suggestion };
}
