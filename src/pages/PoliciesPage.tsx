import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Shield, FileText, Truck, RotateCcw, Lock, Check, ChevronDown } from "lucide-react";
import { policies } from "@/data/policies";
import DagwoodHeader from "@/components/DagwoodHeader";
import PolicyAcceptance from "@/components/PolicyAcceptance";

const policyIcons: Record<string, React.ReactNode> = {
  terms: <FileText className="h-5 w-5" />,
  privacy: <Lock className="h-5 w-5" />,
  shipping: <Truck className="h-5 w-5" />,
  returns: <RotateCcw className="h-5 w-5" />,
};

const PoliciesPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activePolicy, setActivePolicy] = useState(policies[0].id);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  // Handle hash navigation
  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash && policies.find((p) => p.id === hash)) {
      setActivePolicy(hash);
    }
  }, [location.hash]);

  const currentPolicy = policies.find((p) => p.id === activePolicy)!;

  const toggleSection = (title: string) => {
    setExpandedSections((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    currentPolicy.sections.forEach((s) => (all[s.title] = true));
    setExpandedSections(all);
  };

  const collapseAll = () => setExpandedSections({});

  return (
    <div className="min-h-screen bg-background">
      <DagwoodHeader />

      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Menu
        </button>

        {/* Page header */}
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl">Our Policies</h1>
            <p className="text-sm text-muted-foreground">Transparency is at the heart of everything we do</p>
          </div>
        </div>

        {/* Policy tabs */}
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {policies.map((policy) => (
            <button
              key={policy.id}
              onClick={() => {
                setActivePolicy(policy.id);
                setExpandedSections({});
                window.history.replaceState(null, "", `#${policy.id}`);
              }}
              className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-all ${
                activePolicy === policy.id
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-secondary text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {policyIcons[policy.id]}
              <span className="hidden sm:inline">{policy.title}</span>
              <span className="sm:hidden">
                {policy.id === "terms" ? "Terms" : policy.id === "privacy" ? "Privacy" : policy.id === "shipping" ? "Shipping" : "Returns"}
              </span>
            </button>
          ))}
        </div>

        {/* Policy content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePolicy}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            {/* Policy card header */}
            <div className="mb-4 rounded-2xl border border-border bg-card p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="font-display text-xl font-bold text-card-foreground">{currentPolicy.title}</h2>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Effective: {currentPolicy.effectiveDate} · Version {currentPolicy.version}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={expandAll}
                    className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary"
                  >
                    Expand All
                  </button>
                  <button
                    onClick={collapseAll}
                    className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary"
                  >
                    Collapse All
                  </button>
                </div>
              </div>
            </div>

            {/* Sections */}
            <div className="space-y-3 pb-32">
              {currentPolicy.sections.map((section) => {
                const isExpanded = expandedSections[section.title] ?? false;
                return (
                  <div
                    key={section.title}
                    className="overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-sm"
                  >
                    <button
                      onClick={() => toggleSection(section.title)}
                      className="flex w-full items-center justify-between px-5 py-4 text-left"
                    >
                      <h3 className="text-sm font-semibold text-card-foreground sm:text-base">{section.title}</h3>
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          exit={{ height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-border px-5 py-4">
                            <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                              {section.content}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Policy acceptance widget */}
      <PolicyAcceptance />
    </div>
  );
};

export default PoliciesPage;
