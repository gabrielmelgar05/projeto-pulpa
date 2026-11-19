"use client";

import { useRef } from "react";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { RotatingBadge } from "@/components/ui/RotatingBadge";
import { Blob, Flower, Leaf, Sparkle, WaveRibbon } from "@/components/ui/Decor";
import { useScrollReveals } from "@/hooks/useScrollReveals";
import { useLanguage } from "@/components/providers/LanguageProvider";

export function Philosophy() {
  const root = useRef<HTMLElement>(null);
  const { messages, locale } = useLanguage();
  useScrollReveals(root);
  return (
    <section ref={root} id="story" tabIndex={-1} aria-labelledby="story-title"
      className="philosophy relative z-10 -mt-12 isolate overflow-hidden rounded-t-[2.5rem] pt-24 pb-28 text-charcoal outline-none sm:rounded-t-[3.5rem] lg:pt-32 lg:pb-40">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <span className="absolute -top-8 -left-12 w-[clamp(10rem,22vw,20rem)] rotate-[30deg] text-vera/55">
          <Leaf className="h-auto w-full" />
        </span>
        <span data-speed="-0.08" className="absolute -right-[12%] top-[8%] w-[55%] text-sola/40">
          <Blob className="h-auto w-full" />
        </span>
        <span className="absolute -bottom-10 -left-[20%] w-[140%] -rotate-6 text-rubra/15">
          <WaveRibbon className="h-[clamp(7rem,18vw,18rem)] w-full" />
        </span>
        <span data-float className="absolute bottom-[18%] left-[46%] w-14 text-marea/60">
          <Flower className="h-auto w-full" />
        </span>
      </div>
      <div className="container-x relative grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="min-w-0 lg:col-span-7">
          <h2 key={locale} id="story-title" data-reveal="words-scrub"
            className="t-display text-[clamp(1.5rem,6.4vw,4.4rem)] lg:text-[clamp(2.5rem,3.6vw,5rem)]">
            {messages.philosophy.title}
          </h2>
          <div className="mt-10 grid gap-6 text-[1.02rem] leading-relaxed sm:grid-cols-2 lg:mt-14">
            {messages.philosophy.paragraphs.map((text, i) => (
              <p key={i} data-reveal="fade" data-delay={i * 0.1}>{text}</p>
            ))}
          </div>
          <ol className="mt-12 grid gap-7 sm:grid-cols-3 lg:mt-16">
            {messages.philosophy.principles.map((principle, i) => (
              <li key={i} data-reveal="fade" data-delay={i * 0.1}
                className="philosophy-principle rounded-2xl border-t-[3px] px-4 pt-5 pb-4"
                style={{ borderColor: ["#F2CC58", "#BC4358", "#A9C77D"][i] }}>
                <h3 className="t-heading text-[1.25rem]">{principle.title}</h3>
                <p className="mt-3 text-[0.9rem] leading-relaxed text-charcoal/80">{principle.text}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="relative lg:col-span-5 lg:pt-6">
          <div data-speed="-0.12" className="relative ml-auto w-[88%] lg:w-full">
            <ImageSlot id="philosophy-editorial"
              className="aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] rounded-tr-[9rem]"
              tone={["#BC4358", "#7A2135"]} />
          </div>
          <div data-speed="0.25" className="absolute bottom-[-6%] left-0 w-[42%] lg:-left-[5%]">
            <ImageSlot id="philosophy-detail"
              className="aspect-square w-full overflow-hidden rounded-full ring-[10px] ring-ivory"
              tone={["#FBEFC6", "#F2CC58"]} />
          </div>
          <div className="absolute -top-8 right-[-2%] w-[clamp(7rem,13vw,10rem)] text-charcoal" data-reveal="pop">
            <div className="rounded-full bg-vera p-1">
              <RotatingBadge text={messages.philosophy.badge} />
            </div>
          </div>
          <span aria-hidden data-float className="absolute top-[42%] -left-6 w-10 text-rubra lg:-left-12">
            <Sparkle className="h-auto w-full" />
          </span>
        </div>
      </div>
    </section>
  );
}
