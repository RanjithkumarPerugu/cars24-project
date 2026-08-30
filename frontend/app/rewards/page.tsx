import Navbar from "@/components/Navbar";
import ReferralSystem from "@/components/ReferralSystem";
import PointsWallet from "@/components/PointsWallet";

export default function RewardsPage() {
  return (
    <div>
      {/* NAVBAR */}
      <Navbar />

      {/* PAGE HEADER */}
      <section className="bg-gray-100 py-12">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            Rewards & Referral Program
          </h1>

          <p className="mt-4 text-gray-600">
            Invite your friends, earn points, and redeem exciting rewards.
          </p>
        </div>
      </section>

      {/* REFERRAL SYSTEM */}
      <section className="bg-white">
        <ReferralSystem />
      </section>

      {/* DIVIDER */}
      <div className="mx-auto max-w-6xl border-t" />

      {/* POINTS WALLET */}
      <section className="bg-gray-50">
        <PointsWallet />
      </section>
    </div>
  );
}