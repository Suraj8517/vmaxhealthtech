import { Gem, Crown } from "lucide-react";

export default function OurProducts() {
  const plans = [
    {
      name: "Gold",
      icon: Gem,
      duration: "360 Days",
      price: "68,788",
      accent: "#C9A227",
      accentSoft: "rgba(201,162,39,0.10)",
    },
    {
      name: "Platinum",
      icon: Crown,
      duration: "360 Days",
      price: "5,20,000",
      accent: "#C7CDD1",
      accentSoft: "rgba(199,205,209,0.10)",
    },
  ];

  return (
    <section className="bg-[#0e0e0c] py-28 px-6">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="mt-3 font-serif text-4xl text-red-500 sm:text-5xl">
            Our Products
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-neutral-500">
            Two membership tiers, each built around a full year of active
            benefits.
          </p>
        </div>

        {/* Split panel */}
        <div className="grid overflow-hidden rounded-3xl border border-white/10 sm:grid-cols-2">
          {plans.map((plan, i) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.name}
                className={`relative flex flex-col items-center justify-center px-10 py-16 text-center ${
                  i === 0 ? "sm:border-r sm:border-white/10" : ""
                }`}
                style={{ background: plan.accentSoft }}
              >
                {/* watermark icon */}
                <Icon
                  size={180}
                  strokeWidth={0.75}
                  className="pointer-events-none absolute -right-8 -top-8 opacity-[0.06]"
                  style={{ color: plan.accent }}
                />

                <Icon
                  size={28}
                  strokeWidth={1.5}
                  style={{ color: plan.accent }}
                  className="mb-5"
                />

                <h3 className="font-serif text-2xl text-neutral-50">
                  {plan.name}
                </h3>

                <div className="mt-8 flex items-baseline gap-1.5">
                  <span
                    className="font-serif text-3xl"
                    style={{ color: plan.accent }}
                  >
                    ₹
                  </span>
                  <span
                    className="font-serif text-5xl font-medium tracking-tight sm:text-6xl"
                    style={{ color: plan.accent }}
                  >
                    {plan.price}
                  </span>
                </div>

                <div
                  className="mt-6 h-px w-10"
                  style={{ background: plan.accent, opacity: 0.4 }}
                />

                <span className="mt-6 text-sm text-neutral-400">
                  for {plan.duration}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}