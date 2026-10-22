import { useRef, useState } from "react";
import type { FormEvent } from "react";
import emailjs from "@emailjs/browser";

const PRODUCT_NAME = "9-in-1 Electric Cleaning Brush";
const UNIT_PRICE = 43000;
const ORIGINAL_PRICE = 65000;
const WHATSAPP_NUMBER = "2349064543927";

const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi",
  "Bayelsa", "Benue", "Borno", "Cross River", "Delta",
  "Ebonyi", "Edo", "Ekiti", "Enugu", "Federal Capital Territory",
  "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina",
  "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger",
  "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers",
  "Sokoto", "Taraba", "Yobe", "Zamfara",
];

const formatNaira = (amount: number) =>
  `₦${amount.toLocaleString("en-NG")}`;

type CheckoutStatus = "idle" | "email-sent" | "email-failed";

function CheckIcon() {
  return (
    <span
      aria-hidden="true"
      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-black text-emerald-700"
    >
      ✓
    </span>
  );
}

function TrustCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-2xl">
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-[#101A35]">{title}</h4>
        <p className="mt-1 text-sm leading-6 text-slate-600">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function OrderForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const [quantity, setQuantity] = useState(1);
  const [country, setCountry] = useState("Nigeria");
  const [state, setState] = useState("");
  const [otherCountry, setOtherCountry] = useState("");
  const [region, setRegion] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkoutStatus, setCheckoutStatus] =
    useState<CheckoutStatus>("idle");
  const [whatsappURL, setWhatsappURL] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const productTotal = UNIT_PRICE * quantity;
  const originalTotal = ORIGINAL_PRICE * quantity;
  const totalSaved = originalTotal - productTotal;
  const deliveryFee = 0;
  const grandTotal = productTotal + deliveryFee;

  const selectedCountry =
    country === "Other" ? otherCountry.trim() : country;

  const selectedRegion =
    country === "Nigeria" ? state : region.trim();

  const changeQuantity = (amount: number) => {
    setQuantity((current) => Math.max(1, current + amount));
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (loading || !formRef.current) return;

    const form = formRef.current;

    if (!form.reportValidity()) return;

    const formData = new FormData(form);

    const name = String(formData.get("customer_name") || "").trim();
    const phone = String(formData.get("customer_phone") || "").trim();
    const email = String(formData.get("customer_email") || "").trim();
    const address = String(formData.get("customer_address") || "").trim();

    const message = [
      "🛒 *NEW PRODUCT ORDER*",
      "",
      `📦 Product: ${PRODUCT_NAME}`,
      `🔢 Quantity: ${quantity}`,
      "",
      "*CUSTOMER DETAILS*",
      `👤 Name: ${name}`,
      `📞 Phone: ${phone}`,
      `📧 Email: ${email || "Not provided"}`,
      "",
      "*DELIVERY DETAILS*",
      `🌍 Country: ${selectedCountry}`,
      `📍 State/Region: ${selectedRegion}`,
      `🏠 Address: ${address}`,
      "",
      "*ORDER BREAKDOWN*",
      `💵 Unit Price: ${formatNaira(UNIT_PRICE)}`,
      `📦 Product Total: ${formatNaira(productTotal)}`,
      `🚚 Delivery: FREE`,
      `💰 TOTAL: ${formatNaira(grandTotal)}`,
      "",
      "🎁 Free Cleaning Gloves Included",
      "💳 Payment on Delivery",
      "🛡️ Money-Back Guarantee",
      "",
      "Please confirm my order and delivery details.",
    ].join("\n");

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;

    setWhatsappURL(url);
    setLoading(true);
    setCheckoutStatus("idle");

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    let emailSucceeded = false;

    if (serviceId && templateId && publicKey) {
      try {
        await emailjs.sendForm(
          serviceId,
          templateId,
          form,
          publicKey
        );

        emailSucceeded = true;
      } catch (error) {
        console.error("EmailJS notification failed:", error);
      }
    } else {
      console.warn("EmailJS environment variables are missing.");
    }

    setCheckoutStatus(emailSucceeded ? "email-sent" : "email-failed");
    setLoading(false);
    setShowConfirmation(true);
  };

  return (
    <section
      id="order-form"
      className="scroll-mt-28 bg-[#F8FAFC] px-4 py-12 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section heading */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-sky-700">
            Secure Your Order
          </p>

          <h2 className="text-3xl font-black leading-tight text-[#101A35] sm:text-4xl lg:text-5xl">
            Get Yours Today.
            <span className="block text-sky-700">
              Pay When It Arrives.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            No upfront payment required. Fill in your delivery details,
            review your order, and complete your request through WhatsApp.
          </p>
        </div>

        {/* Checkout progress */}
        <div className="mx-auto mb-10 flex max-w-2xl items-center justify-center gap-2 text-xs font-semibold sm:gap-4 sm:text-sm">
          <span className="rounded-full bg-[#101A35] px-3 py-2 text-white">
            1. Your Details
          </span>
          <span className="h-px w-5 bg-slate-300 sm:w-12" />
          <span className="rounded-full bg-sky-100 px-3 py-2 text-sky-800">
            2. Review
          </span>
          <span className="h-px w-5 bg-slate-300 sm:w-12" />
          <span className="rounded-full bg-sky-100 px-3 py-2 text-sky-800">
            3. WhatsApp
          </span>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-[1fr_1.12fr] lg:gap-12">
          {/* LEFT: Product and guarantees */}
          <div className="space-y-6">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="bg-[#101A35] p-6 text-white">
                <p className="text-xs font-bold uppercase tracking-widest text-sky-200">
                  Your Selected Product
                </p>

                <h3 className="mt-2 text-2xl font-black">
                  9-in-1 Electric Cleaning Brush
                </h3>

                <p className="mt-2 text-sm text-slate-200">
                  Multi-purpose electric cleaning solution
                </p>
              </div>

              <div className="p-6">
                <div className="flex flex-wrap items-end gap-3">
                  <span className="text-3xl font-black text-[#101A35]">
                    {formatNaira(UNIT_PRICE)}
                  </span>
                  <span className="pb-1 text-base text-slate-400 line-through">
                    {formatNaira(ORIGINAL_PRICE)}
                  </span>
                </div>

                <p className="mt-2 text-sm font-bold text-emerald-700">
                  Save {formatNaira(ORIGINAL_PRICE - UNIT_PRICE)} per unit
                </p>

                <div className="mt-6 space-y-3">
                  {[
                    "9-in-1 electric cleaning brush",
                    "Interchangeable cleaning attachments",
                    "Free cleaning gloves",
                    "Free delivery",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckIcon />
                      <span className="text-sm font-medium text-slate-700">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                  <p className="text-center text-sm font-black text-amber-950">
                    🎁 YOUR ORDER INCLUDES FREE CLEANING GLOVES
                  </p>
                  <div className="mt-4 flex items-center justify-center gap-2 sm:gap-4">
                    <div className="min-w-0 flex-1 rounded-xl bg-white p-2 text-center shadow-sm">
                      <img
                        src="/7 in 1 .jpeg"
                        alt="9-in-1 electric cleaning brush"
                        loading="lazy"
                        className="aspect-square w-full object-contain"
                      />
                      <p className="mt-2 text-xs font-bold text-[#101A35]">Cleaning Brush</p>
                    </div>
                    <span className="shrink-0 text-3xl font-black text-amber-700" aria-hidden="true">+</span>
                    <div className="min-w-0 flex-1 rounded-xl bg-white p-2 text-center shadow-sm">
                      <img
                        src="/gloves.jpeg"
                        alt="Free cleaning gloves included with your order"
                        loading="lazy"
                        className="aspect-square w-full object-contain"
                      />
                      <p className="mt-2 text-xs font-bold text-[#101A35]">FREE Gloves</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <TrustCard
                icon="💳"
                title="Pay on Delivery — Worldwide"
                description="No upfront payment. Your payment is collected when your order is delivered."
              />

              <TrustCard
                icon="🚚"
                title="Free Delivery"
                description="Delivery is included in your order price, with no additional shipping fee."
              />

              <TrustCard
                icon="🛡️"
                title="100% Money-Back Guarantee"
                description="Your purchase is backed by our money-back guarantee, subject to our return and refund terms."
              />

              <TrustCard
                icon="📦"
                title="Inspect Your Package"
                description="Check your package at delivery according to our delivery and inspection policy."
              />
            </div>

            <div className="rounded-2xl border border-sky-100 bg-sky-50 p-5">
              <p className="font-bold text-[#101A35]">
                How your order works
              </p>

              <ol className="mt-3 list-inside list-decimal space-y-2 text-sm leading-6 text-slate-700">
                <li>Enter your contact and delivery information.</li>
                <li>Choose the number of brushes you want.</li>
                <li>Review your total and submit your details.</li>
                <li>Send the prepared order message on WhatsApp.</li>
                <li>Our team confirms delivery arrangements with you.</li>
              </ol>
            </div>
          </div>

          {/* RIGHT: Checkout form */}
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl sm:p-8">
            <form ref={formRef} onSubmit={handleSubmit}>
              <div className="mb-7">
                <h3 className="text-2xl font-black text-[#101A35]">
                  Complete Your Order
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  Fields marked * are required.
                </p>
              </div>

              {/* Contact information */}
              <div className="mb-8">
                <h4 className="mb-4 border-b border-slate-100 pb-3 text-base font-black text-[#101A35]">
                  01 — Contact Information
                </h4>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="customer_name"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Full Name *
                    </label>
                    <input
                      id="customer_name"
                      name="customer_name"
                      type="text"
                      autoComplete="name"
                      placeholder="Enter your full name"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="customer_phone"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      WhatsApp / Phone Number *
                    </label>
                    <input
                      id="customer_phone"
                      name="customer_phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="Include country code if outside Nigeria"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="customer_email"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Email Address (Optional)
                    </label>
                    <input
                      id="customer_email"
                      name="customer_email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery information */}
              <div className="mb-8">
                <h4 className="mb-4 border-b border-slate-100 pb-3 text-base font-black text-[#101A35]">
                  02 — Delivery Information
                </h4>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="delivery_country"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Country *
                    </label>

                    <select
                      id="delivery_country"
                      name="delivery_country"
                      value={country}
                      onChange={(event) => {
                        setCountry(event.target.value);
                        setState("");
                        setRegion("");
                        setOtherCountry("");
                      }}
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                    >
                      <option value="Nigeria">Nigeria</option>
                      <option value="Ghana">Ghana</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="South Africa">South Africa</option>
                      <option value="Other">Other Country</option>
                    </select>
                  </div>

                  {country === "Other" && (
                    <div>
                      <label
                        htmlFor="other_country"
                        className="mb-2 block text-sm font-semibold text-slate-700"
                      >
                        Enter Your Country *
                      </label>
                      <input
                        id="other_country"
                        name="other_country"
                        type="text"
                        value={otherCountry}
                        onChange={(event) =>
                          setOtherCountry(event.target.value)
                        }
                        required
                        placeholder="Your country"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                      />
                    </div>
                  )}

                  {country === "Nigeria" ? (
                    <div>
                      <label
                        htmlFor="customer_state"
                        className="mb-2 block text-sm font-semibold text-slate-700"
                      >
                        State *
                      </label>

                      <select
                        id="customer_state"
                        name="customer_state"
                        value={state}
                        onChange={(event) => setState(event.target.value)}
                        required
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                      >
                        <option value="">Select your state</option>
                        {NIGERIAN_STATES.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <div>
                      <label
                        htmlFor="customer_region"
                        className="mb-2 block text-sm font-semibold text-slate-700"
                      >
                        State / Province / Region *
                      </label>

                      <input
                        id="customer_region"
                        name="customer_region"
                        type="text"
                        value={region}
                        onChange={(event) => setRegion(event.target.value)}
                        required
                        placeholder="Enter your state or region"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                      />
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor="customer_address"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Full Delivery Address *
                    </label>
                    <textarea
                      id="customer_address"
                      name="customer_address"
                      rows={3}
                      autoComplete="street-address"
                      placeholder="House number, street, area, city/town and postal code if applicable"
                      required
                      className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                    />
                  </div>

                </div>
              </div>

              {/* Quantity */}
              <div className="mb-8">
                <h4 className="mb-4 border-b border-slate-100 pb-3 text-base font-black text-[#101A35]">
                  03 — Choose Quantity
                </h4>

                <div className="flex items-center justify-between rounded-2xl bg-sky-50 p-4">
                  <div>
                    <p className="font-bold text-[#101A35]">
                      Electric Cleaning Brush
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      {formatNaira(UNIT_PRICE)} each
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => changeQuantity(-1)}
                      disabled={quantity === 1}
                      aria-label="Decrease quantity"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl font-bold shadow-sm disabled:opacity-40"
                    >
                      −
                    </button>

                    <span
                      aria-live="polite"
                      className="w-6 text-center text-xl font-black text-[#101A35]"
                    >
                      {quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() => changeQuantity(1)}
                      aria-label="Increase quantity"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl font-bold shadow-sm"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Hidden fields for EmailJS */}
              <input type="hidden" name="selected_country" value={selectedCountry} />
              <input type="hidden" name="selected_region" value={selectedRegion} />
              <input
                type="hidden"
                name="product_name"
                value={PRODUCT_NAME}
              />
              <input
                type="hidden"
                name="order_items"
                value={`${quantity} × ${PRODUCT_NAME}`}
              />
              <input
                type="hidden"
                name="quantity"
                value={quantity}
              />
              <input
                type="hidden"
                name="order_total"
                value={grandTotal.toLocaleString("en-NG")}
              />
              <input
                type="hidden"
                name="total_saved"
                value={totalSaved.toLocaleString("en-NG")}
              />
              <input
                type="hidden"
                name="customer_note"
                value={`${selectedCountry}, ${selectedRegion}`}
              />
              <input
                type="hidden"
                name="payment_method"
                value="Pay on Delivery"
              />
              <input
                type="hidden"
                name="delivery_fee"
                value="FREE"
              />

              {/* Final summary */}
              <div className="mb-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h4 className="mb-5 text-lg font-black text-[#101A35]">
                  04 — Review Your Order
                </h4>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between gap-4 text-slate-600">
                    <span>Original price × {quantity}</span>
                    <span className="text-slate-400 line-through">
                      {formatNaira(originalTotal)}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4 text-slate-600">
                    <span>Offer price × {quantity}</span>
                    <span className="font-bold text-[#101A35]">
                      {formatNaira(productTotal)}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-slate-600">Your savings</span>
                    <span className="font-bold text-emerald-700">
                      {formatNaira(totalSaved)}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-slate-600">Delivery fee</span>
                    <span className="font-bold text-emerald-700">
                      FREE
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-slate-600">Free gift</span>
                    <span className="font-bold text-emerald-700">
                      Cleaning Gloves
                    </span>
                  </div>

                  <div className="mt-4 border-t border-slate-200 pt-5">
                    <div className="flex items-end justify-between gap-3">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-sky-700">
                          Total to Pay on Delivery
                        </p>
                        <p className="mt-1 text-3xl font-black text-[#101A35]">
                          {formatNaira(grandTotal)}
                        </p>
                      </div>

                      <span className="rounded-full bg-emerald-100 px-3 py-2 text-xs font-bold text-emerald-800">
                        No Upfront Payment
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Guarantee reassurance */}
              <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🛡️</span>
                  <div>
                    <p className="font-black text-emerald-900">
                      Your Purchase Is Protected
                    </p>
                    <p className="mt-1 text-sm leading-6 text-emerald-800">
                      Enjoy our money-back guarantee, free delivery,
                      and payment on delivery. No advance transfer
                      is required.
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#101A35] px-5 py-5 text-base font-black text-white shadow-lg transition hover:bg-sky-800 focus:outline-none focus:ring-4 focus:ring-sky-200 disabled:cursor-not-allowed disabled:opacity-60 sm:text-lg"
              >
                {loading ? (
                  "Preparing Your Order..."
                ) : (
                  <>
                    Confirm Order — {formatNaira(grandTotal)}
                    <span aria-hidden="true">→</span>
                  </>
                )}
              </button>

              <p className="mt-4 text-center text-xs leading-6 text-slate-500">
                After submitting, you will be asked to send your
                prepared order message through WhatsApp so our team
                can confirm your delivery.
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp support — raised above the mobile order bar */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello, I have a question about the 9-in-1 Electric Cleaning Brush.")}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with customer support on WhatsApp"
        title="Chat with us on WhatsApp"
        className="fixed bottom-24 right-4 z-[80] flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-[#25D366] text-2xl font-black text-white shadow-xl transition hover:scale-105 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-green-600 sm:bottom-6 sm:right-6"
      >
        <span aria-hidden="true">✆</span>
      </a>

      {/* Confirmation modal */}
      {showConfirmation && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="checkout-confirmation-title"
        >
          <div className="my-auto w-full max-w-md rounded-3xl bg-white p-6 text-center shadow-2xl sm:p-8">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-4xl text-emerald-700">
              ✓
            </div>

            <h3
              id="checkout-confirmation-title"
              className="text-2xl font-black text-[#101A35]"
            >
              Almost Done!
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              Your order details are ready. Tap the button below
              to open WhatsApp, then press <strong>Send</strong> to
              complete your order request.
            </p>

            {checkoutStatus === "email-sent" && (
              <p className="mt-4 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800">
                Your details were sent by email. Please also send your WhatsApp message so we can confirm the order.
              </p>
            )}

            {checkoutStatus === "email-failed" && (
              <p className="mt-4 rounded-xl bg-amber-50 p-3 text-sm leading-6 text-amber-900">
                Email notification could not be confirmed.
                Please send your order through WhatsApp.
              </p>
            )}

            <a
              href={whatsappURL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex w-full items-center justify-center rounded-xl bg-green-600 px-5 py-4 font-black text-white transition hover:bg-green-700"
            >
              Continue to WhatsApp →
            </a>

            <button
              type="button"
              onClick={() => setShowConfirmation(false)}
              className="mt-3 w-full rounded-xl px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-100"
            >
              Return to Checkout
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
