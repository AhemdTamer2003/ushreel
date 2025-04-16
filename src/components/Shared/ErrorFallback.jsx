import PropTypes from "prop-types";

export const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div className="min-h-screen flex items-center justify-center bg-black">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-[#D4A537] mb-4">Oops!</h1>
      <p className="text-xl text-white mb-4">Something went wrong</p>
      <p className="text-gray-400 mb-8">{error.message}</p>
      <button
        onClick={resetErrorBoundary}
        className="bg-[#D4A537] text-white px-6 py-2 rounded-full hover:bg-[#b88c2e] transition-colors"
      >
        Try again
      </button>
    </div>
  </div>
);

ErrorFallback.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string,
  }).isRequired,
  resetErrorBoundary: PropTypes.func.isRequired,
};
