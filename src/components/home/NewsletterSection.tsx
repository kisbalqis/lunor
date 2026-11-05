
"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim()) return;

    // Frontend demo only. No email is stored or sent.
    setSubmitted(true);
    setEmail("");
  }

  return (
    <section className="bg-[#eeece6] px-6 py-24 md:px-12 md:py-28">
      <div className="mx-auto max-w-[700px] text-center">
        <p className="mb-5 text-[9px] tracking-[0.25em] text-[#918879]">
          THE LUNOR JOURNAL
        </p>

        <h2 className="font-serif text-4xl text-[#252521] md:text-6xl">
          A little inspiration,
          <br />
          delivered.
        </h2>

        <p className="mx-auto mt-6 max-w-[420px] text-sm leading-7 text-[#77736b]">
          Discover new collections, thoughtful interiors and
          stories behind the pieces we love.
        </p>

        {submitted ? (
          <p className="mt-9 text-sm text-[#55534d]">
            Thank you for your interest in LUNOR.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-9 flex max-w-[480px] border-b border-[#aaa398]"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Your email address"
              className="h-14 min-w-0 flex-1 bg-transparent text-sm text-[#252521] outline-none placeholder:text-[#aaa398]"
            />

            <button
              type="submit"
              aria-label="Subscribe"
              className="flex items-center gap-3 text-[9px] tracking-[0.18em] text-[#252521] transition-opacity hover:opacity-50"
            >
              SUBSCRIBE
              <ArrowRight size={16} />
            </button>
          </form>
        )}

        <p className="mt-5 text-[9px] text-[#918879]">
          By subscribing, you agree to receive updates from LUNOR.
        </p>
      </div>
    </section>
  );
}
