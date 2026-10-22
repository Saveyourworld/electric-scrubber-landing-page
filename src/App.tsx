
import { useState } from "react";

import HeroSection from "./HeroSection";
import Features from "./Features";
import ProductBox from "./ProductBox";
import Testimonials from "./Testimonials";
import OrderForm from "./OrderForm";
import Footer from "./Footer";

function App() {
  const [openModal, setOpenModal] = useState<
    "privacy" | "terms" | null
  >(null);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-sans text-slate-900 antialiased selection:bg-amber-100 selection:text-[#101A35]">
      {/* SKIP LINK FOR KEYBOARD USERS */}
      <a
        href="#main-content"
        className="fixed left-3 top-24 z-[110] -translate-y-40 rounded-lg bg-white px-4 py-3 font-bold text-[#101A35] shadow-lg focus:translate-y-0"
      >
        Skip to main content
      </a>

      {/* MAIN LANDING PAGE */}
      <main id="main-content">
        {/* HERO: Fixed top countdown, video and offer */}
        <HeroSection />

        {/* FEATURES: Benefits and product image gallery */}
        <Features />

        {/* PRODUCT: Second demonstration video */}
        <ProductBox />

        {/* TESTIMONIALS: Review images and feedback */}
        <Testimonials />

        {/* CHECKOUT: EmailJS and WhatsApp */}
        <OrderForm />
      </main>

      {/* FOOTER AND LEGAL MODALS */}
      <Footer
        openModal={openModal}
        setOpenModal={setOpenModal}
      />

      {/* MOBILE STICKY PURCHASE BAR */}
      <div
        className="fixed inset-x-0 bottom-0 z-40 border-t border-[#D5A51E]/30 bg-[#101A35] px-3 py-2.5 shadow-[0_-8px_30px_rgba(0,0,0,0.18)] lg:hidden"
        role="region"
        aria-label="Quick purchase"
      >
        <div className="mx-auto flex max-w-lg items-center justify-between gap-3">
          {/* PRODUCT IMAGE + PRICE */}
          <div className="flex min-w-0 items-center gap-2.5">
            <img
              src="/Electric Scrubber.jpg"
              alt=""
              aria-hidden="true"
              className="h-12 w-12 shrink-0 rounded-lg bg-white object-contain p-1"
            />

            <div className="min-w-0">
              <p className="text-[9px] font-black uppercase tracking-wider text-amber-300">
                Special Offer
              </p>

              <p className="text-xl font-black leading-tight text-white">
                ₦43,000
              </p>

              <p className="text-[10px] font-medium text-slate-300">
                Free Delivery
              </p>
            </div>
          </div>

          {/* CHECKOUT BUTTON */}
          <a
            href="#order-form"
            className="flex min-h-12 shrink-0 items-center justify-center rounded-xl bg-[#D5A51E] px-4 py-3 text-xs font-black text-[#101A35] shadow-lg transition hover:bg-[#E7B82F] active:scale-95 sm:px-6 sm:text-sm"
          >
            🛒 ORDER NOW →
          </a>
        </div>
      </div>

      {/* MOBILE BOTTOM SAFE SPACE */}
      <div
        className="h-24 bg-[#0B142B] lg:hidden"
        aria-hidden="true"
      />
    </div>
  );
}

export default App;
