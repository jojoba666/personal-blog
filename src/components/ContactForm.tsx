"use client";

import { useState, FormEvent } from "react";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [statusMsg, setStatusMsg] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setStatusMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("sent");
        setStatusMsg(data.message || "消息已发送！");
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        setStatus("error");
        setStatusMsg(data.error || "发送失败，请稍后重试");
      }
    } catch {
      setStatus("error");
      setStatusMsg("网络错误，请稍后重试");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block font-hand text-base text-warm-text mb-2">
          姓名 *
        </label>
        <input
          id="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-warm-border bg-surface
            font-body text-base text-warm-text
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
            placeholder:text-warm-muted transition-colors"
          placeholder="你的名字"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block font-hand text-base text-warm-text mb-2">
          邮箱 *
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-warm-border bg-surface
            font-body text-base text-warm-text
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
            placeholder:text-warm-muted transition-colors"
          placeholder="your@email.com"
        />
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject" className="block font-hand text-base text-warm-text mb-2">
          主题
        </label>
        <input
          id="subject"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-warm-border bg-surface
            font-body text-base text-warm-text
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
            placeholder:text-warm-muted transition-colors"
          placeholder="留言主题（可选）"
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block font-hand text-base text-warm-text mb-2">
          消息 *
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-warm-border bg-surface
            font-body text-base text-warm-text resize-y
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
            placeholder:text-warm-muted transition-colors"
          placeholder="想说点什么..."
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "sending"}
        className="px-6 py-3 bg-primary text-white font-hand text-base rounded-xl
          hover:bg-primary-hover transition-colors
          disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "sending" ? "发送中..." : "发送消息 ✉️"}
      </button>

      {/* Status */}
      {statusMsg && (
        <p
          className={`font-body text-sm mt-4 ${
            status === "sent" ? "text-accent-green" : "text-accent-red"
          }`}
        >
          {statusMsg}
        </p>
      )}
    </form>
  );
}
