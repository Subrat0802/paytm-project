import {
  Shield,
  Zap,
  Globe,
  CreditCard,
  Users,
  ArrowRight,
} from "lucide-react";

const Home = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col">
      <section className="w-full flex flex-col text-center px-6 py-20">
        <h1 className="text-4xl font-extrabold leading-tight bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          The Future of Payments
        </h1>
        <p className="mt-4 text-base text-gray-300">
          Fast, global, and secure money at your fingertips.
        </p>
        <div className="mt-6 text-sm inline-block  py-2 rounded-xl">
          <p className="font-semibold text-white">
            🎁 Get ₹100 – ₹1000 bonus on your first signup!
          </p>
        </div>
        <button className="mt-8 w-fit mx-auto  px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-semibold shadow-lg hover:scale-105 transition">
          Get Started
        </button>
      </section>

      {/* Features */}
      <section className="w-full px-6 py-12 space-y-6">
        <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md shadow flex flex-col items-center text-center">
          <Shield className="w-10 h-10 text-blue-400" />
          <h3 className="mt-3 font-semibold text-lg">Bank-Grade Security</h3>
          <p className="mt-2 text-sm text-gray-300">
            Advanced encryption keeps your money safe.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md shadow flex flex-col items-center text-center">
          <Zap className="w-10 h-10 text-yellow-400" />
          <h3 className="mt-3 font-semibold text-lg">Instant Transfers</h3>
          <p className="mt-2 text-sm text-gray-300">
            Send and receive funds instantly — worldwide.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md shadow flex flex-col items-center text-center">
          <Globe className="w-10 h-10 text-green-400" />
          <h3 className="mt-3 font-semibold text-lg">Global Reach</h3>
          <p className="mt-2 text-sm text-gray-300">
            Pay or get paid across borders with zero hassle.
          </p>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="w-full px-6 py-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-3xl text-center">
        <h2 className="text-xl font-bold mb-6">Trusted Worldwide</h2>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-2xl font-extrabold">10M+</p>
            <p className="text-sm text-gray-200">Users</p>
          </div>
          <div>
            <p className="text-2xl font-extrabold">50+</p>
            <p className="text-sm text-gray-200">Countries</p>
          </div>
          <div>
            <p className="text-2xl font-extrabold">₹100B+</p>
            <p className="text-sm text-gray-200">Transactions</p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="w-full px-6 py-12 space-y-6">
        <h2 className="text-xl font-bold text-center">How It Works</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 rounded-xl bg-white/10">
            <CreditCard className="w-6 h-6 text-purple-400" />
            <p className="text-sm">1. Create your free account in seconds.</p>
          </div>
          <div className="flex items-center space-x-4 p-4 rounded-xl bg-white/10">
            <Users className="w-6 h-6 text-green-400" />
            <p className="text-sm">2. Add contacts or link your bank.</p>
          </div>
          <div className="flex items-center space-x-4 p-4 rounded-xl bg-white/10">
            <ArrowRight className="w-6 h-6 text-blue-400" />
            <p className="text-sm">3. Send & receive money instantly.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full px-6 py-12 space-y-6">
        <h2 className="text-xl font-bold text-center text-gray-100">
          What Users Say
        </h2>
        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl shadow">
          <p className="italic text-sm text-gray-300">
            “Fast, secure, and easy to use. My go-to payments app.”
          </p>
          <span className="block mt-4 font-bold text-blue-400">
            – Neha, Mumbai
          </span>
        </div>
        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl shadow">
          <p className="italic text-sm text-gray-300">
            “Beautiful design and instant transfers. I recommend it to
            everyone.”
          </p>
          <span className="block mt-4 font-bold text-purple-400">
            – Rohan, Delhi
          </span>
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full px-6 py-12 text-center bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-3xl">
        <h2 className="text-2xl font-bold">Ready to get started?</h2>
        <p className="mt-2 text-sm text-gray-100">
          Join millions already enjoying fast, secure payments.
        </p>
        <button className="mt-6 w-full py-3 bg-white text-blue-700 font-bold rounded-xl shadow hover:scale-105 transition">
          Create Free Account
        </button>
      </section>
    </div>
  );
};

export default Home;
