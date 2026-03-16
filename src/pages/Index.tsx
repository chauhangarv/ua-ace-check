import { useState } from "react";
import { CheckCircle2, XCircle, ArrowRight, Mail, Globe } from "lucide-react";
import { validateEmail, validateDomain, type ValidationResult } from "@/lib/ua-validator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const EMAIL_EXAMPLES = [
  { label: "उपयोगकर्ता@उदाहरण.भारत", desc: "Hindi email" },
  { label: "user@example.academy", desc: "New gTLD" },
  { label: "用户@例子.广告", desc: "Chinese email" },
  { label: "user@xn--p1ai", desc: "Russian IDN" },
  { label: "test@example.photography", desc: "Long gTLD" },
];

const DOMAIN_EXAMPLES = [
  { label: "उदाहरण.भारत", desc: "Hindi IDN" },
  { label: "example.academy", desc: "New gTLD" },
  { label: "例え.jp", desc: "Japanese IDN" },
  { label: "xn--11b4c3d.com", desc: "Punycode" },
  { label: "example.photography", desc: "Long gTLD" },
];

function ResultBanner({ result }: { result: ValidationResult }) {
  return (
    <div className="animate-slide-down space-y-4">
      <div
        className={`flex items-center gap-3 rounded-lg px-5 py-4 ${
          result.passed ? "bg-success text-success-foreground" : "bg-fail text-fail-foreground"
        }`}
      >
        {result.passed ? <CheckCircle2 className="h-6 w-6 shrink-0" /> : <XCircle className="h-6 w-6 shrink-0" />}
        <div>
          <p className="text-lg font-bold">{result.passed ? "PASS — UA Compliant" : "FAIL — Not UA Compliant"}</p>
          <p className="text-sm opacity-90">{result.summary}</p>
        </div>
      </div>

      {result.checks.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Detailed Checks</h3>
          <div className="grid gap-2">
            {result.checks.map((check, i) => (
              <div key={i} className="flex gap-3 rounded-md border bg-card p-3 text-sm">
                {check.passed ? (
                  <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-success" />
                ) : (
                  <XCircle className="h-4 w-4 mt-0.5 shrink-0 text-fail" />
                )}
                <div className="min-w-0">
                  <p className="font-medium text-card-foreground">{check.label}</p>
                  <p className="text-muted-foreground">{check.detail}</p>
                  <p className="text-xs text-muted-foreground/70 mt-1 italic">{check.requirement}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-md border border-primary/20 bg-primary/5 p-4 text-sm">
        <p className="font-medium text-primary mb-1">What should a UA-compliant system do?</p>
        <p className="text-muted-foreground">{result.suggestion}</p>
      </div>
    </div>
  );
}

function ValidatorTab({
  type,
  examples,
}: {
  type: "email" | "domain";
  examples: { label: string; desc: string }[];
}) {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<ValidationResult | null>(null);

  const runCheck = (value?: string) => {
    const val = (value ?? input).trim();
    if (!val) return;
    setResult(type === "email" ? validateEmail(val) : validateDomain(val));
  };

  const handleExample = (label: string) => {
    setInput(label);
    setResult(type === "email" ? validateEmail(label) : validateDomain(label));
  };

  return (
    <div className="space-y-5">
      <div className="flex gap-2">
        <div className="relative flex-1">
          {type === "email" ? (
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          ) : (
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          )}
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && runCheck()}
            placeholder={type === "email" ? "Enter email address…" : "Enter domain name…"}
            className="pl-10 h-12 text-base"
          />
        </div>
        <Button onClick={() => runCheck()} size="lg" className="h-12 px-6 font-semibold">
          Check <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>

      <div>
        <p className="text-xs font-medium text-muted-foreground mb-2">Try these examples:</p>
        <div className="flex flex-wrap gap-2">
          {examples.map((ex) => (
            <button
              key={ex.label}
              onClick={() => handleExample(ex.label)}
              className="inline-flex items-center gap-1.5 rounded-full border bg-card px-3 py-1.5 text-xs font-medium text-card-foreground hover:bg-secondary transition-colors"
            >
              <span>{ex.label}</span>
              <span className="text-muted-foreground">({ex.desc})</span>
            </button>
          ))}
        </div>
      </div>

      {result && <ResultBanner result={result} />}
    </div>
  );
}

function EducationalSection() {
  return (
    <section className="mt-12 max-w-3xl mx-auto space-y-8 px-4">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-3">What is Universal Acceptance?</h2>
        <p className="text-muted-foreground leading-relaxed">
          Universal Acceptance (UA) is the principle that all valid domain names and email addresses should be accepted,
          validated, stored, processed, and displayed correctly by all internet-connected applications and systems. This
          includes internationalized domain names (IDNs) written in scripts like Devanagari, Arabic, or Chinese, as well
          as new generic top-level domains (gTLDs) like .academy, .photography, or .app that go beyond the traditional
          .com, .org, and .net.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-foreground mb-3">Why It Matters</h2>
        <p className="text-muted-foreground leading-relaxed">
          For billions of internet users across India, the Asia Pacific, the Middle East, and Africa, their native
          language and script are not Latin-based. When websites and government portals reject email addresses or domain
          names written in Hindi, Chinese, Arabic, or other scripts, these users face a digital barrier that excludes
          them from essential services. Universal Acceptance is foundational to a truly multilingual internet where no
          user is left behind because of the script they write in.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-foreground mb-3">Real-World UA Failures</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              title: "CoWIN Portal",
              text: "India's COVID-19 vaccination platform rejected email addresses with new gTLDs and internationalized domains, preventing millions from registering with their valid email addresses.",
            },
            {
              title: "Government Portals",
              text: "Several Indian state e-governance portals fail to accept .भारत domain-based email addresses, despite the government promoting Digital India in local languages.",
            },
            {
              title: "Welfare Systems",
              text: "Social welfare registration systems across Asia Pacific reject valid internationalized email addresses, creating barriers for the very populations they are designed to serve.",
            },
          ].map((item) => (
            <Card key={item.title} className="border-fail/20">
              <CardContent className="p-4">
                <h3 className="font-semibold text-card-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="rounded-lg border bg-card p-5">
        <h3 className="font-semibold text-card-foreground mb-2">Learn More</h3>
        <p className="text-sm text-muted-foreground mb-3">
          The Universal Acceptance Steering Group (UASG) — an initiative by ICANN — works to ensure all domain names
          and email addresses are treated equally by software and systems.
        </p>
        <a
          href="https://uasg.tech"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          Visit UASG.tech <ArrowRight className="h-3 w-3" />
        </a>
      </div>
    </section>
  );
}

export default function Index() {
  return (
    <div className="min-h-screen pb-16">
      {/* Header */}
      <header className="py-8 text-center px-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
          UA-Check
        </h1>
        <p className="mt-2 text-muted-foreground max-w-lg mx-auto">
          Validate email addresses and domain names for Universal Acceptance compliance. Test IDNs, new gTLDs, and non-ASCII inputs.
        </p>
      </header>

      {/* Validator Card */}
      <main className="max-w-3xl mx-auto px-4">
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <Tabs defaultValue="email">
              <TabsList className="w-full mb-6">
                <TabsTrigger value="email" className="flex-1 gap-2">
                  <Mail className="h-4 w-4" /> Email Validator
                </TabsTrigger>
                <TabsTrigger value="domain" className="flex-1 gap-2">
                  <Globe className="h-4 w-4" /> Domain Validator
                </TabsTrigger>
              </TabsList>
              <TabsContent value="email">
                <ValidatorTab type="email" examples={EMAIL_EXAMPLES} />
              </TabsContent>
              <TabsContent value="domain">
                <ValidatorTab type="domain" examples={DOMAIN_EXAMPLES} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>

      {/* Educational */}
      <EducationalSection />

      {/* Footer */}
      <footer className="mt-16 border-t py-6 text-center text-xs text-muted-foreground px-4">
        <p>
          Built in support of{" "}
          <a href="https://www.icann.org/ua" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            ICANN Universal Acceptance
          </a>{" "}
          initiative •{" "}
          <a href="https://uasg.tech" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            UASG
          </a>
        </p>
        <p className="mt-1">National Forensic Sciences University (NFSU)</p>
      </footer>
    </div>
  );
}
