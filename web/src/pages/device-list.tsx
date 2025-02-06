import { useState, useEffect } from "react";

const DeviceTracker = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState("");

  const fetchDevices = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:3200/scan");
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
      const response = await fetch(`http://localhost:3200/find?device=${searchTerm}`);
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
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-green-500">Device Tracker</h1>

      <div className="mt-6 flex gap-3">
        <input
          type="text"
          placeholder="Find a device (e.g., iPhone 11)"
          className="px-4 py-2 rounded bg-gray-800 text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
          onClick={searchDevice}
        >
          Search
        </button>
      </div>

      {loading && <p className="mt-4">Loading...</p>}
      {error && <p className="mt-4 text-red-400">{error}</p>}

      {searchResult && (
        <div className="mt-6 p-4 bg-gray-800 rounded shadow">
          <p className="font-semibold">Closest Match:</p>
          <p className="text-green-400">{searchResult.name} - {searchResult.distance}</p>
        </div>
      )}

      <div className="mt-8 w-full max-w-md">
        <h2 className="text-xl font-semibold">Nearby Devices</h2>
        <ul className="mt-3">
          {devices.length > 0 ? (
            devices.map((device, index) => (
              <li key={index} className="p-2 bg-gray-800 rounded mt-2">
                {device.name} - {device.distance}
              </li>
            ))
          ) : (
            <p>No devices found.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DeviceTracker;
