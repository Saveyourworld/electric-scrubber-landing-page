
import { useRef, useState } from "react";

const PRODUCT_VIDEO = "/Scrubbing-Device.mp4";
const VIDEO_POSTER = "/Scrubber.jpg";

const benefits = [
  {
    icon: "⚡",
    title: "Powered Rotating Scrubbing",
    description:
      "Tired of moving a hand brush back and forth over stubborn dirt? Let the motor-powered rotating brush assist with the scrubbing instead.",
  },
  {
    icon: "🧽",
    title: "Multiple Cleaning Attachments",
    description:
      "Different cleaning jobs need different tools. Switch between the supplied brush heads for a range of suitable household surfaces.",
  },
  {
    icon: "🛁",
    title: "Bathroom & Kitchen Cleaning",
    description:
      "From bathroom tiles and bathtubs to kitchen sinks, make routine cleaning more convenient with the appropriate attachment.",
  },
  {
    icon: "🙌",
    title: "Less Repetitive Hand Scrubbing",
    description:
      "Give your hands a break from repeated scrubbing movements. The powered brush helps you work through everyday cleaning tasks.",
  },
];

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [soundEnabled, setSoundEnabled] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const toggleSound = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (!video.muted) {
      video.muted = true;
      setSoundEnabled(false);
      return;
    }

    video.muted = false;

    try {
      await video.play();
      setSoundEnabled(true);
    } catch {
      video.muted = true;
      setSoundEnabled(false);
    }
  };

  return (
    <>
      {/* FIXED OFFER BAR */}
      <div className="fixed inset-x-0 top-0 z-[90] border-b border-red-800 bg-[#991B1B] px-3 py-3 text-white shadow-xl sm:px-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] font-black uppercase tracking-wider text-red-100 sm:text-xs">
              ⚡ SPECIAL PRODUCT OFFER
            </p>

            <p className="mt-1 text-sm font-black leading-tight sm:text-lg">
              Save ₦22,000
              <span className="ml-2 text-xs font-semibold text-red-100 sm:text-sm">
                + Free Cleaning Gloves
              </span>
            </p>
          </div>

          <a
            href="#order-form"
            className="shrink-0 rounded-xl bg-[#D5A51E] px-4 py-3 text-xs font-black text-[#101A35] shadow-lg transition hover:bg-[#E7B82F] sm:px-7 sm:text-base"
          >
            ORDER NOW →
          </a>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="bg-[#FFFCF4] px-4 pb-12 pt-28 text-[#101A35] sm:pt-32 lg:pb-20">
        <div className="mx-auto max-w-6xl">

          {/* 1. MAIN HEADLINE AND DESCRIPTION */}
          <div className="mx-auto max-w-5xl text-center">
            <p className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-[10px] font-black uppercase tracking-wider text-sky-800 sm:text-xs">
              9-IN-1 ELECTRIC CLEANING BRUSH
            </p>

            <h1 className="mx-auto mt-5 max-w-5xl text-[clamp(2rem,5.5vw,4.5rem)] font-black leading-[1.08] tracking-tight">
              Still Scrubbing Stubborn Dirt
              <span className="text-[#B91C1C]">
                {" "}By Hand?
              </span>

              <span className="mt-2 block text-sky-600">
                Give Your Hands a Break.
                Let the Brush Do the Work.
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-slate-700 sm:text-lg sm:leading-8">
              Are you tired of scrubbing your bathroom tiles over and over, yet they still look dull? 😩

What about those stubborn stains in your kitchen sink, dirty tile corners, and bathroom floors that refuse to come clean no matter how hard you scrub?

Why stress yourself when you can clean smarter?
            </p>

            <p className="mx-auto mt-3 max-w-3xl text-sm font-semibold leading-7 text-[#101A35] sm:text-lg sm:leading-8">
              The 9-in-1 Electric Cleaning Brush uses powered
              rotation and interchangeable cleaning heads to
              help you tackle everyday cleaning jobs with
              less repetitive manual effort.
            </p>
          </div>

          {/* 2. CENTERED PRODUCT VIDEO */}
          <div className="mx-auto mt-8 w-full max-w-3xl sm:mt-10">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-[#101A35] shadow-xl">

              {videoError ? (
                <div className="flex min-h-64 flex-col items-center justify-center gap-3 p-6 text-center text-white">
                  <span className="text-4xl" aria-hidden="true">
                    🎬
                  </span>

                  <p className="font-bold">
                    Demonstration video unavailable
                  </p>

                  <p className="text-sm text-slate-300">
                    Check that Scrubbing-Device.mp4 exists
                    inside your public folder.
                  </p>
                </div>
              ) : (
                <div className="relative w-full">
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls
                    preload="metadata"
                    poster={VIDEO_POSTER}
                    onError={() => setVideoError(true)}
                    onVolumeChange={(event) => {
                      setSoundEnabled(
                        !event.currentTarget.muted &&
                        event.currentTarget.volume > 0
                      );
                    }}
                    className="block h-auto w-full"
                  >
                    <source
                      src={PRODUCT_VIDEO}
                      type="video/mp4"
                    />

                    Your browser does not support video playback.
                  </video>

                  <button
                    type="button"
                    onClick={toggleSound}
                    className="absolute right-3 top-3 z-10 rounded-full bg-black/75 px-3 py-2 text-xs font-black text-white shadow-lg backdrop-blur-sm transition hover:bg-black/90"
                  >
                    {soundEnabled
                      ? "🔊 Sound On"
                      : "🔇 Tap for Sound"}
                  </button>
                </div>
              )}

              <div className="flex items-center justify-between gap-3 bg-[#101A35] px-4 py-3 text-white sm:px-5">
                <span className="text-xs font-black sm:text-sm">
                  ▶ See the Electric Scrubber in Action
                </span>

                <span className="text-[10px] font-bold uppercase tracking-wider text-sky-200">
                  Product Demo
                </span>
              </div>
            </div>
          </div>

          {/* 3. PRODUCT BENEFITS BELOW VIDEO */}
          <div className="mx-auto mt-10 max-w-5xl sm:mt-14">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-700">
                Why Keep Doing All the Scrubbing Yourself?
              </p>

              <h2 className="mt-3 text-2xl font-black leading-tight text-[#101A35] sm:text-3xl lg:text-4xl">
                Your Cleaning Routine Needs
                <span className="text-sky-600">
                  {" "}More Power, Not More Effort.
                </span>
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                An ordinary hand brush depends entirely on
                your arm and wrist movements. This electric
                scrubber adds powered rotation, helping you
                clean suitable surfaces without having to
                perform every scrubbing movement yourself.
              </p>
            </div>

            {/* FOUR BENEFIT CARDS */}
            <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-sky-200 hover:shadow-md"
                >
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-2xl"
                    aria-hidden="true"
                  >
                    {benefit.icon}
                  </span>

                  <div>
                    <h3 className="text-base font-black text-[#101A35]">
                      {benefit.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* BATTERY INFORMATION CARD */}
            <div className="mt-4 rounded-2xl border border-sky-200 bg-sky-50 p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <span
                  className="text-3xl"
                  aria-hidden="true"
                >
                  🔋
                </span>

                <div>
                  <h3 className="text-lg font-black text-[#101A35]">
                    Battery & Charging Information
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-slate-700">
                    Want to know how long the brush runs
                    per charge? Contact our team for the
                    battery capacity, charging time, and
                    operating runtime of the model supplied
                    with your order.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 4. PRICE AND PROMOTIONAL OFFER */}
          <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-3xl border-2 border-amber-200 bg-white shadow-xl">

            <div className="bg-[#101A35] px-5 py-4 text-center text-white">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-amber-300">
                Make Your Next Cleaning Session Easier
              </p>

              <h2 className="mt-2 text-xl font-black sm:text-2xl">
                Get Your 9-in-1 Electric Cleaning Brush
              </h2>
            </div>

            <div className="p-5 sm:p-8">

              {/* PRICE */}
              <div className="flex flex-wrap items-center justify-center gap-3 text-center">
                <span className="text-4xl font-black text-[#101A35] sm:text-5xl">
                  ₦43,000
                </span>

                <span className="text-xl font-bold text-slate-400 line-through">
                  ₦65,000
                </span>

                <span className="rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-black text-emerald-800">
                  SAVE ₦22,000
                </span>
              </div>

              {/* FREE GLOVES */}
              <div className="mt-6 flex items-center gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-3 sm:p-5">
                <img
                  src="/gloves.jpeg"
                  alt="Free cleaning gloves included with your order"
                  loading="lazy"
                  decoding="async"
                  className="h-24 w-24 shrink-0 rounded-xl bg-white object-contain sm:h-32 sm:w-32"
                />

                <div>
                  <p className="text-xs font-black uppercase tracking-wide text-amber-800">
                    🎁 COMPLIMENTARY GIFT
                  </p>

                  <h3 className="mt-1 text-base font-black text-[#101A35] sm:text-xl">
                    Free Cleaning Gloves Included
                  </h3>

                  <p className="mt-2 text-xs leading-6 text-slate-600 sm:text-sm">
                    Your cleaning brush order also comes
                    with complimentary cleaning gloves,
                    at no additional cost.
                  </p>
                </div>
              </div>

              {/* ORDER BUTTON */}
              <a
                href="#order-form"
                className="mt-6 flex min-h-14 w-full items-center justify-center rounded-xl bg-[#D5A51E] px-5 py-4 text-center text-base font-black text-[#101A35] shadow-lg transition hover:bg-[#E7B82F] active:scale-[0.99] sm:text-lg"
              >
                YES! I WANT MY ELECTRIC SCRUBBER →
              </a>

              <p className="mt-4 text-center text-xs font-semibold leading-6 text-slate-600 sm:text-sm">
                🚚 Free Delivery Where Available · 💵 Pay on Delivery Where Available · 🎁 Free Gloves
              </p>
            </div>
          </div>

          {/* 5. CLOSING SALES MESSAGE */}
          <div className="mx-auto mt-10 max-w-3xl text-center">
            <h2 className="text-xl font-black leading-tight text-[#101A35] sm:text-2xl">
              You Don't Have to Keep Cleaning
              Everything the Hard Way.
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
              Whether it's the bathroom tiles, the kitchen
              sink, or another suitable household surface,
              give yourself a more convenient way to tackle
              routine cleaning.
            </p>

            <a
              href="#order-form"
              className="mt-5 inline-flex items-center justify-center text-sm font-black text-sky-700 underline decoration-2 underline-offset-4 hover:text-[#101A35]"
            >
              Order Your 9-in-1 Cleaning Brush Today →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
