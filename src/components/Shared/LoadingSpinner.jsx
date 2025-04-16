export const LoadingSpinner = () => (
  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-[#D4A537] border-opacity-20 rounded-full animate-spin"></div>
      <div className="w-16 h-16 border-4 border-t-[#D4A537] rounded-full animate-spin absolute top-0 left-0"></div>
    </div>
  </div>
);
