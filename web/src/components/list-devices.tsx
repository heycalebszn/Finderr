import { useState, useEffect } from "react";

const DeviceList = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDevices = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch("http://localhost:3600/scan");
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

      <ul className="mt-6 w-full max-w-md bg-white/10 backdrop-blur-md rounded-xl p-4 shadow-lg">
        {devices.length > 0 ? (
          devices.map((device, index) => (
            <li key={index} className="p-3 bg-gray-800/50 rounded-lg mt-2 text-white bg-transparent">
                {loading && (<h3>Loading</h3>)}
              <span className="font-semibold bg-transparent" >{device.name}</span> - {device.distance}
            </li>
          ))
        ) : (
          <p className="text-white bg-transparent text-center">Scanning...</p>
        )}
      </ul>
    </div>
  );
};

export default DeviceList;
