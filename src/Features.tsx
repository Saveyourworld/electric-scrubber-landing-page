
import { useState } from "react";

const features = [
  {
    number: "01",
    icon: "🧹",
    title: "One Kit. Multiple Cleaning Tasks.",
    description:
      "Switch between the included brush attachments to tackle different cleaning jobs around your home.",
    tag: "9-IN-1 CLEANING KIT",
  },
  {
    number: "02",
    icon: "🛁",
    title: "Tackle Bathroom Buildup",
    description:
      "Clean suitable bathroom surfaces, including tiles, shower areas and bathtubs, with a rotating brush designed to assist your cleaning routine.",
    tag: "BATHROOM CARE",
  },
  {
    number: "03",
    icon: "🍳",
    title: "Make Kitchen Cleaning Easier",
    description:
      "Use the appropriate attachment for suitable kitchen surfaces, sinks and other everyday cleaning tasks.",
    tag: "KITCHEN CARE",
  },
  {
    number: "04",
    icon: "💪",
    title: "Less Repetitive Manual Scrubbing",
    description:
      "Let the powered brush do the rotating while you guide it over the surface.",
    tag: "POWER-ASSISTED CLEANING",
  },
  {
    number: "05",
    icon: "↗️",
    title: "Reach More Conveniently",
    description:
      "Depending on the handle supplied with your model, reach suitable areas without relying entirely on a small hand-held scrubber.",
    tag: "EVERYDAY CONVENIENCE",
  },
  {
    number: "06",
    icon: "🎁",
    title: "Get Free Cleaning Gloves",
    description:
      "Your promotional offer includes reusable cleaning gloves as an extra household cleaning accessory.",
    tag: "FREE GIFT INCLUDED",
  },
];

const productImages = [
  {
    src: "/scr.jpeg",
    alt: "Electric cleaning brush product image",
    label: "Explore the Cleaning Kit",
  },
  {
    src: "/scrub.webp",
    alt: "9-in-1 electric cleaning brush",
    label: "Product Close-Up",
  },
  {
    src: "/scrub1.webp",
    alt: "Electric scrubber cleaning demonstration",
    label: "See It in Action",
  },
  {
    src: "/scrubbing device.jpeg",
    alt: "Electric scrubbing device",
    label: "Cleaning Accessories",
  },
  {
    src: "/scrub2.webp",
    alt: "Additional electric cleaning brush product image",
    label: "More Product Details",
  },
];

export default function Features() {
  const [activeImage, setActiveImage] = useState<string | null>(
    null
  );

  return (
    <section
      id="product-benefits"
      className="overflow-hidden bg-[#FFFCF4] px-4 py-12 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-6xl">
        {/* INTRODUCTION */}
        <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-12">
          <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-xs font-extrabold uppercase tracking-widest text-sky-800">
            A Smarter Cleaning Routine
          </span>

          <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-[#101A35] sm:text-4xl lg:text-5xl">
            Spend Less Time{" "}
            <span className="text-sky-600">
              Fighting Stubborn Messes.
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-lg">
            From bathroom upkeep to everyday kitchen cleaning,
            discover how a versatile electric scrubbing brush can
            make your household cleaning routine more convenient.
          </p>
        </div>

        {/* FEATURE CARDS */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.number}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-lg sm:p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-2xl">
                  {feature.icon}
                </div>

                <span className="text-sm font-black text-slate-300">
                  {feature.number}
                </span>
              </div>

              <p className="mt-4 text-[10px] font-extrabold uppercase tracking-widest text-sky-700">
                {feature.tag}
              </p>

              <h3 className="mt-2 text-lg font-extrabold leading-snug text-[#101A35] sm:text-xl">
                {feature.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {feature.description}
              </p>

              <div className="mt-4 h-1 w-12 rounded-full bg-sky-400 transition-all group-hover:w-20" />
            </article>
          ))}
        </div>

        {/* PRODUCT IMAGE GALLERY */}
        <div
          id="product-gallery"
          className="mt-14 scroll-mt-24 sm:mt-20"
        >
          <div className="mx-auto mb-8 max-w-3xl text-center">
            <span className="inline-flex rounded-full bg-amber-100 px-4 py-2 text-xs font-black uppercase tracking-wider text-amber-900">
              Take a Closer Look
            </span>

            <h2 className="mt-4 text-3xl font-black text-[#101A35] sm:text-4xl">
              Explore Your{" "}
              <span className="text-sky-600">
                9-in-1 Cleaning Brush
              </span>
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
              Take a closer look at the product and its cleaning
              applications. Tap any image to enlarge it.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {productImages.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => setActiveImage(image.src)}
                className={`group overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${
                  index === 4
                    ? "col-span-2 lg:col-span-4"
                    : ""
                }`}
                aria-label={`Enlarge ${image.label}`}
              >
                <div
                  className={
                    index === 4
                      ? "aspect-[16/9] overflow-hidden bg-slate-100 sm:aspect-[21/9]"
                      : "aspect-square overflow-hidden bg-slate-100"
                  }
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="flex items-center justify-between gap-2 p-3 sm:p-4">
                  <span className="text-xs font-bold text-[#101A35] sm:text-sm">
                    {image.label}
                  </span>

                  <span
                    className="text-lg text-sky-600"
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* FREE GIFT */}
        <div className="mt-12 grid items-center gap-6 rounded-3xl border border-amber-200 bg-amber-50 p-5 sm:p-8 md:grid-cols-[180px_1fr]">
          <div className="mx-auto w-full max-w-[200px] overflow-hidden rounded-2xl bg-white p-3 shadow-sm">
            <img
              src="/gloves.jpeg"
              alt="Free cleaning gloves included with the order"
              loading="lazy"
              className="aspect-square w-full object-contain"
            />
          </div>

          <div className="text-center md:text-left">
            <p className="text-xs font-black uppercase tracking-widest text-amber-800">
              Free Gift With Your Order
            </p>

            <h3 className="mt-2 text-2xl font-black text-[#101A35]">
              Free Reusable Cleaning Gloves!
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              Get a pair of cleaning gloves included with your
              9-in-1 Electric Cleaning Brush at no additional cost.
            </p>

            <a
              href="#order-form"
              className="mt-5 inline-flex items-center justify-center rounded-xl bg-[#101A35] px-6 py-3 font-bold text-white transition hover:bg-sky-900"
            >
              Claim Your Offer →
            </a>
          </div>
        </div>

        {/* OFFER REMINDER */}
        <div className="mt-10 rounded-2xl bg-[#101A35] p-6 text-center shadow-lg sm:p-9">
          <p className="text-sm font-bold uppercase tracking-widest text-sky-300">
            Your Cleaning Upgrade
          </p>

          <h3 className="mt-3 text-2xl font-black leading-tight text-white sm:text-3xl">
            Get the 9-in-1 Cleaning Kit for ₦43,000
          </h3>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
            Plus free cleaning gloves and free delivery.
            Pay on delivery.
          </p>

          <a
            href="#order-form"
            className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-[#D5A51E] px-6 py-4 text-base font-black text-[#101A35] transition hover:bg-[#E7B82F] sm:w-auto sm:min-w-[280px]"
          >
            ORDER NOW — ₦43,000 →
          </a>
        </div>
      </div>

      {/* IMAGE LIGHTBOX */}
      {activeImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged product image"
          onClick={() => setActiveImage(null)}
        >
          <button
            type="button"
            onClick={() => setActiveImage(null)}
            className="absolute right-5 top-5 rounded-full bg-white px-4 py-2 text-lg font-bold text-slate-900"
            aria-label="Close enlarged image"
          >
            ✕
          </button>

          <img
            src={activeImage}
            alt="Enlarged electric cleaning brush product"
            className="max-h-[85vh] max-w-full rounded-xl object-contain"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
