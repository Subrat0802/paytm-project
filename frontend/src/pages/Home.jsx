
const Home = () => {
  return (
     <div className="w-full min-h-screen bg-white text-gray-900 flex flex-col">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r  py-20 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Simple, Secure & Fast Payments
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Send, receive, and manage your money with ease — anytime, anywhere.
        </p>
        <button className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-2xl shadow hover:bg-gray-100 transition">
          Get Started for Free
        </button>
      </section>

      {/* Features Section */}
      <section className="w-full  py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
        <div className=" text-center">
          <div className="p-6 shadow rounded-2xl hover:shadow-lg transition">
            <span className="text-4xl">🔒</span>
            <h3 className="font-bold text-xl mt-4">Bank-Grade Security</h3>
            <p className="text-gray-600 mt-2">
              Your money and data are always protected with encryption.
            </p>
          </div>
          <div className="p-6 shadow rounded-2xl hover:shadow-lg transition">
            <span className="text-4xl">⚡</span>
            <h3 className="font-bold text-xl mt-4">Instant Transfers</h3>
            <p className="text-gray-600 mt-2">
              Send and receive money in seconds, no delays.
            </p>
          </div>
          <div className="p-6 shadow rounded-2xl hover:shadow-lg transition">
            <span className="text-4xl">🌍</span>
            <h3 className="font-bold text-xl mt-4">Global Access</h3>
            <p className="text-gray-600 mt-2">
              Pay anyone, anywhere, anytime with ease.
            </p>
          </div>
          <div className="p-6 shadow rounded-2xl hover:shadow-lg transition">
            <span className="text-4xl">📱</span>
            <h3 className="font-bold text-xl mt-4">Smart Dashboard</h3>
            <p className="text-gray-600 mt-2">
              Track and manage all your transactions in one place.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="w-full bg-gray-50 py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-8">
          Trusted by Thousands
        </h2>
        <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto mb-12">
          Join a growing community that already uses our app for secure digital
          payments every day.
        </p>
        <div className="flex justify-center space-x-6">
          <div className="p-4 bg-white rounded-2xl flex flex-col justify-between shadow w-64">
            <p className="italic text-sm">“Super easy and reliable. Love it!”</p>
            <span className="block mt-4 font-bold">– Rohan, Delhi</span>
          </div>
          <div className="p-4 bg-white rounded-2xl shadow w-64 hidden md:block">
            <p className="italic text-sm">“Best app for quick money transfers.”</p>
            <span className="block mt-4 font-bold ">– Neha, Mumbai</span>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full py-20 px-6 text-center bg-gradient-to-r from-black via-blue-700 to-blue-600 text-white">
        <h2 className="text-4xl font-bold mb-6">
          Ready to simplify payments?
        </h2>
        <p className="text-lg mb-8">
          Download the app today and experience the future of digital payments.
        </p>
        <button className="px-8 py-3 bg-white text-blue-700 font-semibold rounded-2xl shadow hover:bg-gray-100 transition">
          Download Now
        </button>
      </section>
    </div>
  )
}

export default Home