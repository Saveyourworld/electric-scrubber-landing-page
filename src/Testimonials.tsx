
import { useRef } from "react";

type Review = {
  id: number;
  name: string;
  location: string;
  rating?: number;
  text: string;
  date?: string;
  verified: boolean;
  image: string;
  color: string;
};

const REVIEWS: Review[] = [
  {
    id: 1,
    name: "Shegun Michael",
    location: "Lagos",
    text: "My tiles always looked clean but not bright, now they actually shine. Even the corners that used to stress me are easy now. This is none of my best online purchases this year.",
    verified: false,
    image: "/review.jpg",
    color: "bg-sky-600",
  },
  {
    id: 2,
    name: "Chioma Uchenna",
    location: "Abuja",
    text: "I used to finish cleaning and feel angry for no reason. Now I realize it was just stress and tiredness. Since I started using this, cleaning doesn't frustrate me anymore.",
    verified: false,
    image: "/review1.jpg",
    color: "bg-violet-600",
  },
  {
    id: 3,
    name: "Patricia Okon",
    location: "Uyo",
    text: "As a pregnant woman, this long lasting electric scrubber have saved me. You don't need to wait until you are pregnant, get this for your household to save the stress.",
    verified: false,
    image: "/review2.jpg",
    color: "bg-emerald-600",
  },
  {
    id: 4,
    name: "Musa Saheed",
    location: "Kaduna",
    text: "Omo these people are for real. I got my package with the free gift, free delivery, delivered directly to my door post within the speculated time.",
    verified: false,
    image: "/review3.jpg",
    color: "bg-rose-600",
  },
];

function Stars({ rating }: { rating: number }) {
  const safeRating = Math.max(0, Math.min(5, rating));

  return (
    <div
      className="flex items-center gap-1 text-xl text-amber-500"
      role="img"
      aria-label={`${safeRating} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, index) => (
        <span key={index} aria-hidden="true">
          {index < safeRating ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const hasFeedback = review.text.trim().length > 0;
  const initial = hasFeedback
    ? review.name.charAt(0).toUpperCase()
    : String(review.id);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg">
      {/* CUSTOMER IDENTITY */}
      <div className="p-4 pb-0 sm:p-5 sm:pb-0">
        <div className="flex items-start gap-3">
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-lg font-black text-white ${review.color}`}
            aria-hidden="true"
          >
            {initial}
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-black text-[#101A35] sm:text-base">
              {hasFeedback ? review.name : `Customer Photo ${review.id}`}
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              {hasFeedback && review.location
                ? review.location
                : "Product photo"}
            </p>
          </div>

          {hasFeedback && review.verified && (
            <span className="shrink-0 rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-black text-emerald-800">
              ✓ Verified
            </span>
          )}
        </div>

        {/* STARS — ONLY WHEN REAL RATING EXISTS */}
        {hasFeedback && review.rating !== undefined && (
          <div className="mt-4">
            <Stars rating={review.rating} />
          </div>
        )}

        {/* WRITTEN CUSTOMER REVIEW */}
        {hasFeedback ? (
          <blockquote className="mt-3 min-h-20 text-sm leading-6 text-slate-700">
            “{review.text}”
          </blockquote>
        ) : (
          <div className="mt-4 rounded-lg bg-slate-50 px-3 py-3 text-xs leading-5 text-slate-500">
            Customer feedback will be displayed here once
            the review details are added.
          </div>
        )}

        {hasFeedback && review.date && (
          <p className="mt-3 text-xs font-medium text-slate-400">
            {review.date}
          </p>
        )}
      </div>

      {/* REVIEW IMAGE BELOW THE REVIEW TEXT */}
      <div className="mt-4 border-t border-slate-100 bg-slate-50 p-3 sm:p-4">
        <img
          src={review.image}
          alt={`Product image associated with review ${review.id}`}
          loading="lazy"
          decoding="async"
          className="aspect-[4/3] w-full rounded-xl bg-white object-contain"
        />
      </div>
    </article>
  );
}

export default function Testimonials() {
  const sliderRef = useRef<HTMLDivElement>(null);

  function scrollReviews(direction: -1 | 1) {
    const slider = sliderRef.current;

    if (!slider) return;

    const firstCard = slider.querySelector<HTMLElement>(
      "article"
    );

    const distance = firstCard
      ? firstCard.getBoundingClientRect().width + 16
      : 300;

    slider.scrollBy({
      left: distance * direction,
      behavior: "smooth",
    });
  }

  const completedReviews = REVIEWS.filter(
    (review) => review.text.trim().length > 0
  );

  const ratedReviews = completedReviews.filter(
    (review) => review.rating !== undefined
  );

  const averageRating =
    ratedReviews.length > 0
      ? ratedReviews.reduce(
          (sum, review) => sum + (review.rating ?? 0),
          0
        ) / ratedReviews.length
      : null;

  return (
    <section
      id="customer-reviews"
      className="scroll-mt-28 bg-[#F8FAFC] px-4 py-12 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-6xl">
        {/* HEADING */}
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <p className="text-xs font-black uppercase tracking-widest text-sky-700">
            Customer Experiences
          </p>

          <h2 className="mt-3 text-3xl font-black leading-tight text-[#101A35] sm:text-4xl lg:text-5xl">
            Real Product Photos
            <span className="block text-[#B78B16]">
              & Customer Feedback
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            Take a closer look at the product photos.
            Customer ratings and written experiences appear
            alongside the images when available.
          </p>

          {averageRating !== null && (
            <div className="mt-5 flex items-center justify-center gap-3">
              <Stars rating={Math.round(averageRating)} />

              <span className="font-black text-[#101A35]">
                {averageRating.toFixed(1)}/5
              </span>

              <span className="text-sm text-slate-500">
                ({ratedReviews.length} rated reviews)
              </span>
            </div>
          )}
        </div>

        {/* SLIDER CONTROLS */}
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="text-xs font-semibold text-slate-500 sm:text-sm">
            Swipe to explore the photos →
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollReviews(-1)}
              aria-label="Scroll reviews left"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-lg font-black text-[#101A35] transition hover:bg-sky-50"
            >
              ←
            </button>

            <button
              type="button"
              onClick={() => scrollReviews(1)}
              aria-label="Scroll reviews right"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-lg font-black text-[#101A35] transition hover:bg-sky-50"
            >
              →
            </button>
          </div>
        </div>

        {/* HORIZONTAL REVIEW CARDS */}
        <div
          ref={sliderRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-5 [scrollbar-width:thin]"
          aria-label="Customer review and product photo gallery"
        >
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="w-[85%] shrink-0 snap-start sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)]"
            >
              <ReviewCard review={review} />
            </div>
          ))}
        </div>

        {/* CALL TO ACTION */}
        <div className="mt-10 overflow-hidden rounded-3xl bg-[#101A35] px-5 py-9 text-center shadow-xl sm:px-10 sm:py-12">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-3xl">
            🛡️
          </div>

          <h3 className="mt-4 text-2xl font-black text-white sm:text-3xl">
            Order With Confidence
          </h3>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
            Your order includes free cleaning gloves,
            free delivery, pay on delivery, and our
            money-back guarantee, subject to the offer terms.
          </p>

          <div className="mx-auto mt-6 flex max-w-2xl flex-wrap justify-center gap-2">
            {[
              "✓ Money-Back Guarantee",
              "✓ Free Delivery",
              "✓ Pay on Delivery",
              "✓ Free Cleaning Gloves",
            ].map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/20 bg-white/10 px-3 py-2 text-xs font-bold text-white"
              >
                {item}
              </span>
            ))}
          </div>

          <a
            href="#order-form"
            className="mx-auto mt-7 flex w-full max-w-lg items-center justify-center rounded-xl bg-[#D5A51E] px-6 py-4 text-base font-black text-[#101A35] shadow-lg transition hover:bg-[#E7BA36] sm:text-lg"
          >
            🛒 ORDER NOW — ₦43,000
          </a>

          <p className="mt-3 text-xs font-medium text-slate-300">
            No upfront payment required
          </p>
        </div>
      </div>
    </section>
  );
}
