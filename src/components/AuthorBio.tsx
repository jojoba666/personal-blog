import Image from "next/image";
import { SocialLinks } from "./SocialLinks";

export function AuthorBio() {
  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-8 bg-surface border border-warm-border rounded-xl">
      {/* Avatar */}
      <div className="shrink-0 w-24 h-24 rounded-full border-2 border-primary-muted overflow-hidden bg-surface-hover">
        <Image
          src="/avatar.jpg"
          alt="avatar"
          width={96}
          height={96}
          className="w-full h-full object-cover"
          priority
        />
      </div>

      {/* Text */}
      <div className="text-center sm:text-left">
        <h1 className="font-hand text-2xl text-warm-text mb-2">
          Hi，我是 <span className="text-primary">Joey</span>
        </h1>
        <p className="font-body text-base text-warm-textSec mb-4 leading-relaxed">
          CS 学生，喜欢写点东西、鼓捣 Linux、学 Rust。
          这里记录一些学习笔记和胡思乱想。
        </p>
        <SocialLinks />
      </div>
    </div>
  );
}
