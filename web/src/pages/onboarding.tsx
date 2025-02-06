import { Link } from "react-router-dom";

const Onboarding = () => {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-white px-6 bg-gray-900">
        
        <h1 className="font-bold italic text-[3rem] text-green-500 mb-4 bg-transparent">Finder</h1>
        <p className="text-lg text-gray-300 text-center max-w-md bg-transparent">
          Locate nearby devices effortlessly. Enter a device name and find it instantly.
        </p>
        <div className="flex gap-4 bg-transparent">
        <Link to={"/find"} className="bg-transparent">
        <button className="mt-6 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition-all w-[180px]">
          Nearby devices
        </button>
        </Link>
        <Link to={"/scan"} className="bg-transparent">
        <button className="mt-6 px-6 py-3 bg-transparent border border-green-500 text-white font-semibold rounded-lg shadow-md transition-all w-[180px]">
          Find a device
        </button>
        </Link>
        </div>
      </div>
    );
  };
  
  export default Onboarding;
  