import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "联系我 — Jojo's Blog",
  description: "给 Jojo 留言",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-warm-bg">
      <div className="max-w-lg mx-auto px-6 py-12">
        <h1 className="font-hand text-3xl text-warm-text mb-2">联系我</h1>
        <p className="font-body text-base text-warm-textSec mb-8">
          有任何想说的，都可以在这里留言。我会尽快回复 ✉️
        </p>
        <ContactForm />
      </div>
    </div>
  );
}
