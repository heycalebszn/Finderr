import { useState, useEffect } from "react";

interface DeviceProps{
    name: string;
    distance: string;
}

const DeviceList = () => {
  const [devices, setDevices] = useState<DeviceProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if(loading){
    console.log("loading");
  }

  useEffect(() => {
    const fetchDevices = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch("https://finderr-5h9x.onrender.com/scan");
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

    fetchDevices();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 p-6">
      <h1 className="text-3xl font-bold text-green-500 bg-transparent">Nearby Devices</h1>
      {error && <p className="mt-4 text-red-400">{error}</p>}

      <ol className="mt-8 w-full max-w-md rounded-[12px] p-[30px] bg-transparent border border-gray-600 shadow-2xl">
        <h2 className="bg-transparent text-white border-b pb-[10px] border-gray-700">Devices near you</h2>
        {devices.length > 0 ? (
          devices.map((device, index) => (
            <li key={index} className="p-3 bg-gray-800/50 rounded-lg mt-2 text-white bg-transparent list-inside">
              <span className="font-semibold bg-transparent" >{device.name}</span> - {device.distance}
            </li>
          ))
        ) : (
          <p className="text-white bg-transparent text-center py-[10px]">Scanning...</p>
        )}
      </ol>
    </div>
  );
};

export default DeviceList;
