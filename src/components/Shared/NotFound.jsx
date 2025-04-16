export const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-black">
    <div className="text-center">
      <h1 className="text-6xl font-bold text-[#D4A537] mb-4">404</h1>
      <p className="text-xl text-white mb-8">Page not found</p>
      <button
        onClick={() => window.history.back()}
        className="bg-[#D4A537] text-white px-6 py-2 rounded-full hover:bg-[#b88c2e] transition-colors"
      >
        Go Back
      </button>
    </div>
  </div>
);
