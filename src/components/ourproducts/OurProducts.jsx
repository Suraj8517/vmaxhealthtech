import { Check, Crown, Gem } from "lucide-react";

export default function OurProducts() {
  const plans = [
    {
      name: "Gold",
      icon: Gem,
      duration: "360 Days",
      price: "68,788",
      features: [
        "360-day active membership",
        "Priority support access",
        "Standard reward tracking",
        "Monthly performance report",
      ],
      ring: "border-yellow-600/50",
      iconBg: "bg-yellow-600/15 text-yellow-500",
      priceColor: "text-yellow-500",
      check: "text-yellow-500",
      glow: "shadow-[0_0_40px_-14px_rgba(202,138,4,0.45)]",
    },
    {
      name: "Platinum",
      icon: Crown,
      duration: "360 Days",
      price: "5,20,000",
      features: [
        "360-day active membership",
        "Dedicated relationship manager",
        "Advanced reward tracking",
        "Weekly performance report",
        "Early access to new offers",
      ],
      ring: "border-slate-400/50",
      iconBg: "bg-slate-300/15 text-slate-300",
      priceColor: "text-slate-200",
      check: "text-slate-300",
      glow: "shadow-[0_0_40px_-14px_rgba(203,213,225,0.4)]",
    },
  ];

  return (
    <section className="bg-neutral-950 py-24 px-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="text-sm tracking-wide text-red-500">Our Plans</span>
          <h2 className="mt-3 font-serif text-4xl text-neutral-50 sm:text-5xl">
            Choose your membership
          </h2>
        </div>

        {/* Cards */}
        <div className="grid gap-8 sm:grid-cols-2">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.name}
                className={`flex flex-col rounded-2xl border bg-neutral-900/60 p-8 ${plan.ring} ${plan.glow}`}
              >
                <div className="mb-6 flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full ${plan.iconBg}`}>
                    <Icon size={20} />
                  </div>
                  <h3 className="font-serif text-2xl text-neutral-50">{plan.name}</h3>
                </div>

                <div className="mb-1 flex items-baseline gap-2">
                  <span className={`text-4xl font-semibold ${plan.priceColor}`}>₹{plan.price}</span>
                </div>
                <span className="mb-6 text-sm text-neutral-500">for {plan.duration}</span>

                <ul className="flex flex-col gap-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-neutral-300">
                      <Check size={16} className={`mt-0.5 shrink-0 ${plan.check}`} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}