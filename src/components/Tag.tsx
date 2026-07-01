import Link from "next/link";

export function Tag({ children, href }: { children: string; href?: string }) {
  const TagWrapper = href ? Link : "span";
  return (
    <TagWrapper
      href={href ?? "#"}
      className="inline-flex items-center px-3 py-1
        font-decor text-sm italic
        bg-primary-light text-primary
        border border-primary-muted
        rounded-full
        hover:bg-primary hover:text-white
        transition-colors cursor-pointer
        select-none"
    >
      #{children}
    </TagWrapper>
  );
}
