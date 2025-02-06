const express = require('express');
//const noble = require('@abandonware/noble');
const wifi = require('node-wifi');
const cors = require('cors');
const geolocation = require('geolocation');
const app = express();
const port = 3200;
app.use(cors());

wifi.init({ iface: null }); 

const estimateDistance = (rssi) => {
    return Math.round(Math.pow(10, (-69 - rssi) / (10 * 2))) + "M Away From You";
};

/*const scanBluetoothDevices = () => {
    return new Promise((resolve) => {
        noble.on('discover', (peripheral) => {
            resolve([{
                name: peripheral.advertisement.localName || 'Anonymous Device',
                distance: estimateDistance(peripheral.rssi)
            }]);
        });

        noble.startScanning();
        setTimeout(() => noble.stopScanning(), 5000);
    });
};
*/
const scanWiFiDevices = async () => {
    return new Promise((resolve, reject) => {
        wifi.scan((err, networks) => {
            if (err) reject(err);
            const result = networks.map(n => ({
                name: n.ssid || 'Unknown Device',
                distance: estimateDistance(n.signal_level) 
            }));
            resolve(result);
        });
    });
};

const getLocation = () => {
    return new Promise((resolve, reject) => {
        geolocation.getCurrentPosition((err, position) => {
            if (err) reject(err);
            resolve({ latitude: position.coords.latitude, longitude: position.coords.longitude });
        });
    });
};

app.get('/scan', async (req, res) => {
    try {
        const btDevices = await scanBluetoothDevices();
        const wifiDevices = await scanWiFiDevices();
        const location = await getLocation();
        const devices = [...btDevices, ...wifiDevices];
        res.json({ success: true, devices, location });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

app.get('/find', async (req, res) => {
    const { device } = req.query;
    if (!device) return res.status(400).json({ success: false, message: 'Device name is required' });
    
    try {
        const btDevices = await scanBluetoothDevices();
        const wifiDevices = await scanWiFiDevices();
        const location = await getLocation();
        const devices = [...btDevices, ...wifiDevices];
        
        const matches = devices.filter(d => d.name.toLowerCase().includes(device.toLowerCase()));
        if (matches.length === 0) return res.json({ success: false, message: `${device} is not nearby📍` });
        
        const closestDevice = matches.reduce((prev, curr) => (prev.distance < curr.distance ? prev : curr));
        res.json({ success: true, closestDevice, location });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
