import { useState, useEffect } from "react";

type Device = {
    name: string;
    distance: string;
  };
  
  const DeviceTracker = () => {
    const [devices, setDevices] = useState<Device[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [searchResult, setSearchResult] = useState<Device | null>(null);
    const [error, setError] = useState("");

    if(error){
      console.log("error", error);
    }

    if(devices){
      console.log("devices", devices);
    }
  
    const fetchDevices = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch("http://localhost:3600/find");
        const data = await response.json();
        if (data.success) {
          setDevices(data.devices);
        } else {
          setError("Failed to fetch devices.");
        }
      } catch (err) {
        setError("Error connecting to server.");
      }
      setLoading(false);
    };
  
    const searchDevice = async () => {
      if (!searchTerm) return;
      setLoading(true);
      setError("");
      try {
        const response = await fetch(`http://localhost:3600/find?device=${searchTerm}`);
        const data = await response.json();
        setSearchResult(data.success ? data.closestDevice : null);
        if (!data.success) setError(data.message);
      } catch (err) {
        setError("Error connecting to server.");
      }
      setLoading(false);
    };
  
    useEffect(() => {
      fetchDevices();
    }, []);
  
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6 pt-[50px]">
        <h1 className="md:text-4xl font-bold text-green-500 bg-transparent text-[2rem]">Find Device</h1>
  
        <div className="mt-6 flex gap-3">
          <input
            type="text"
            placeholder="Find a device (e.g., iPhone 11)"
            className="px-4 py-2 rounded bg-gray-800 text-white shadow-md backdrop-blur-lg bg-opacity-30 placeholder:text-[10px] outline-none text-[13px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="px-4 py-1 bg-green-500 hover:bg-green-600 text-white rounded shadow-lg backdrop-blur-md text-[13px]"
            onClick={searchDevice}
          >
            Search
          </button>
        </div>
  
        {loading && <p className="mt-4 bg-transparent">Loading...</p>}
  
        <div className="mt-8 w-full max-w-md rounded-[12px] p-[30px]">
          <h2 className="text-2xl font-semibold text-green-400">Found Device</h2>
          
          <ul className={`mt-3 ${loading ? "hidden": "flex"} `} >
          {searchResult && (
                  <p className="text-gray-400 text-xl">{searchResult.name} - {searchResult.distance}</p>
          )}
          </ul>
        </div>
      </div>
    );
  };
  
  export default DeviceTracker;