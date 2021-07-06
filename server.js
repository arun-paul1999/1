const express = require('express');
const TuyAPI = require('tuyapi');
require('dotenv').config();

const app = express();

const device = new TuyAPI({
    id: process.env.DEVICE_ID,
    key: process.env.DEVICE_KEY,
    ip: process.env.IP_ADDRESS,
    version: '3.3',
    issueRefreshOnConnect: true
});

app.get('/lights/1/on', (req, res) => {
    try {
        stateHasChanged = false;

        device.find().then(() => {
            device.connect();
        });
    
        device.on('connected', () => {
            console.log('Connected to device!');
        });
    
        device.on('disconnected', () => {
            console.log('Disconnected from device.');
        });

        device.on('data', data => {   
            device.set({dps: 20, set: true});
        });

        device.disconnect();
        return res.status(200).json({ message: 'light was turn on' });
    } catch (error) {
        return res.status(500).json({ message: 'internal server error' });
    }
})

app.get('/lights/1/off', (req, res) => {
    try {
        stateHasChanged = false;

        device.find().then(() => {
            device.connect();
        });
    
        device.on('connected', () => {
            console.log('Connected to device!');
        });
    
        device.on('disconnected', () => {
            console.log('Disconnected from device.');
        });

        device.on('data', data => {   
            device.set({dps: 20, set: false});
        });

        device.disconnect();
        return res.status(200).json({ message: 'light was turn off' });
    } catch (error) {
        return res.status(500).json({ message: 'internal server error' });
    }
})

app.listen(5500, () => console.log('server running'));