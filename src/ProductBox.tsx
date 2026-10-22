
import { useRef, useState } from "react";

const PRODUCT_VIDEO = "/Electric-Scrubber.mp4";
const VIDEO_POSTER = "/scrubbing device.jpeg";

const benefits = [
  {
    icon: "😩",
    pain: "Tired of scrubbing stubborn dirt by hand?",
    benefit: "Let the rotating brush assist with repetitive scrubbing.",
  },
  {
    icon: "⏳",
    pain: "Does bathroom cleaning take too much effort?",
    benefit: "Make routine cleaning of suitable tiles, tubs, and shower areas more convenient.",
  },
  {
    icon: "🧽",
    pain: "Using different tools for every cleaning task?",
    benefit: "Switch between interchangeable brush heads for different suitable surfaces.",
  },
  {
    icon: "🙌",
    pain: "Fed up with uncomfortable manual scrubbing?",
    benefit: "Use the powered brush to reduce the amount of scrubbing you do by hand.",
  },
];

export default function ProductBox() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [videoError, setVideoError] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const enableSound = async () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;

    try {
      await video.play();
      setSoundEnabled(true);
    } catch {
      video.muted = true;
      setSoundEnabled(false);
    }
  };

  const muteVideo = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    setSoundEnabled(false);
  };

  return (
    <section
      id="product-demonstration"
      className="scroll-mt-28 bg-white px-4 py-14 sm:py-20"
    >
      <div className="mx-auto max-w-6xl">

        {/* SECTION HEADING */}
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-rose-50 px-4 py-2 text-xs font-black uppercase tracking-wider text-rose-700">
            Tired of Endless Scrubbing?
          </span>

          <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-[#101A35] sm:text-4xl lg:text-5xl">
            Stop Fighting Dirt.
            <span className="block text-sky-600">
              Make Cleaning Feel Easier.
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            You have better things to do than spend your free time
            scrubbing sinks, bathroom tiles, and bathtubs by hand.
            See how the 9-in-1 Electric Cleaning Brush can help.
          </p>
        </div>

        {/* VIDEO + BENEFITS */}
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">

          {/* INSTAGRAM-STYLE VIDEO */}
          <div className="mx-auto w-full max-w-[360px] sm:max-w-[400px]">
            <div className="relative overflow-hidden rounded-[2rem] border-4 border-[#101A35] bg-[#101A35] shadow-2xl">

              {videoError ? (
                <div className="flex aspect-[9/16] flex-col items-center justify-center gap-4 p-6 text-center text-white">
                  <span className="text-5xl">🎬</span>
                  <p className="font-bold">
                    Demonstration video unavailable
                  </p>
                  <p className="text-sm text-slate-300">
                    Check that Scrubbing-Device.mp4 exists
                    inside your public folder.
                  </p>
                </div>
              ) : (
                <div className="relative aspect-[9/16]">
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
                    className="absolute inset-0 h-full w-full object-cover"
                  >
                    <source
                      src={PRODUCT_VIDEO}
                      type="video/mp4"
                    />
                    Your browser does not support video playback.
                  </video>

                  {/* SOUND CONTROL */}
                  <div className="absolute right-3 top-3 z-10">
                    <button
                      type="button"
                      onClick={soundEnabled ? muteVideo : enableSound}
                      className="rounded-full bg-black/75 px-4 py-2 text-xs font-black text-white shadow-lg backdrop-blur-sm"
                    >
                      {soundEnabled
                        ? "🔊 Sound On"
                        : "🔇 Tap for Sound"}
                    </button>
                  </div>

                  {/* VIDEO OVERLAY */}
                  <div className="pointer-events-none absolute bottom-14 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-5 pb-4 pt-16 text-white">
                    <p className="text-xs font-black uppercase tracking-widest text-amber-300">
                      Watch It Work
                    </p>
                    <p className="mt-1 text-xl font-black leading-tight">
                      Less Manual Scrubbing.
                      <br />
                      More Convenient Cleaning.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <p className="mt-4 text-center text-xs leading-5 text-slate-500">
              Video plays automatically without sound.
              Tap the sound button to listen.
            </p>
          </div>

          {/* PERSUASIVE PRODUCT DETAILS */}
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-700">
              One Powered Tool. Multiple Cleaning Tasks.
            </p>

            <h3 className="mt-3 text-2xl font-black leading-tight text-[#101A35] sm:text-3xl">
              Your Cleaning Routine Doesn't Have to Be So Exhausting.
            </h3>

            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              Think about the time and effort you put into
              cleaning your bathroom, kitchen sink, and other
              household surfaces. The 9-in-1 Electric Cleaning
              Brush is designed to make suitable cleaning tasks
              more convenient with powered rotation and
              interchangeable attachments.
            </p>

            {/* PAIN POINTS + BENEFITS */}
            <div className="mt-7 space-y-3">
              {benefits.map((item) => (
                <div
                  key={item.pain}
                  className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-[#F8FAFC] p-4"
                >
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-2xl shadow-sm"
                    aria-hidden="true"
                  >
                    {item.icon}
                  </span>

                  <div>
                    <h4 className="text-sm font-black text-[#101A35] sm:text-base">
                      {item.pain}
                    </h4>

                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {item.benefit}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* OFFER */}
            <div className="mt-7 rounded-2xl border-2 border-amber-200 bg-amber-50 p-5 sm:p-6">
              <p className="text-xs font-black uppercase tracking-widest text-amber-800">
                Upgrade Your Cleaning Routine
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-3">
                <span className="text-4xl font-black text-[#101A35]">
                  ₦43,000
                </span>

                <span className="text-lg font-bold text-slate-400 line-through">
                  ₦65,000
                </span>
              </div>

              <p className="mt-3 text-sm font-bold text-emerald-800">
                ✓ Free Cleaning Gloves
                <br />
                ✓ Free Delivery
                <br />
                ✓ Pay on Delivery
              </p>

              <a
                href="#order-form"
                className="mt-5 flex min-h-14 w-full items-center justify-center rounded-xl bg-[#D5A51E] px-5 py-4 text-center text-base font-black text-[#101A35] shadow-lg transition hover:bg-[#E7B82F] active:scale-[0.99]"
              >
                YES! I WANT EASIER CLEANING →
              </a>

              <p className="mt-3 text-center text-xs text-slate-600">
                Order now and confirm delivery arrangements
                with our team.
              </p>
            </div>
          </div>
        </div>

        {/* PRODUCT + FREE GIFT */}
        <div className="mt-14 rounded-3xl border border-slate-200 bg-[#F8FAFC] p-5 sm:p-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-black uppercase tracking-wider text-sky-700">
              What You'll Receive
            </p>

            <h3 className="mt-3 text-2xl font-black text-[#101A35] sm:text-3xl">
              Your Electric Cleaning Brush + Free Gloves
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              Your order includes the electric cleaning brush
              and its supplied attachments, plus complimentary
              cleaning gloves.
            </p>
          </div>

          <div className="mx-auto mt-8 flex max-w-xl items-center justify-center gap-3 sm:gap-8">
            <div className="min-w-0 flex-1 overflow-hidden rounded-2xl bg-white p-3 shadow-sm">
              <img
                src="/scrubber.jpeg"
                alt="9-in-1 electric cleaning brush"
                loading="lazy"
                decoding="async"
                className="aspect-square w-full object-contain"
              />
              <p className="mt-2 text-center text-xs font-black text-[#101A35] sm:text-sm">
                Electric Cleaning Brush
              </p>
            </div>

            <span
              className="shrink-0 text-2xl font-black text-[#D5A51E] sm:text-4xl"
              aria-hidden="true"
            >
              +
            </span>

            <div className="min-w-0 flex-1 overflow-hidden rounded-2xl bg-white p-3 shadow-sm">
              <img
                alt="Complimentary cleaning gloves"
                loading="lazy"
                decoding="async"
                className="aspect-square w-full object-contain"
              />
              <p className="mt-2 text-center text-xs font-black text-[#101A35] sm:text-sm">
                FREE Cleaning Gloves
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <a
              href="#order-form"
              className="inline-flex min-h-14 w-full items-center justify-center rounded-xl bg-[#101A35] px-7 py-4 font-black text-white transition hover:bg-sky-900 sm:w-auto sm:min-w-[320px]"
            >
              GET MY CLEANING KIT →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
