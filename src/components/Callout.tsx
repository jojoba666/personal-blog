type CalloutType = "info" | "warning" | "tip" | "danger";

const variants: Record<CalloutType, string> = {
  info: "border-l-accent-blue bg-blue-50",
  warning: "border-l-accent-yellow bg-yellow-50",
  tip: "border-l-accent-green bg-green-50",
  danger: "border-l-accent-red bg-red-50",
};

const labels: Record<CalloutType, string> = {
  info: "💡 提示",
  warning: "⚠️ 注意",
  tip: "🌱 小贴士",
  danger: "🔥 警告",
};

export function Callout({
  type = "info",
  children,
}: {
  type?: CalloutType;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`border-l-4 pl-5 py-4 pr-5 my-6 rounded-r-lg font-body text-sm text-warm-text ${variants[type]}`}
    >
      <span className="font-hand text-base block mb-1">{labels[type]}</span>
      {children}
    </div>
  );
}
