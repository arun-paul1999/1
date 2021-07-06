# tuya-cloud-lamp

This project is developed using Tuya SDK, which enables you to quickly develop smart devices, branded APP, cloud development project, etc.

For more information, please check Tuya Developer Click and Connect Challenge https://pages.tuya.com/develop/ClickAndConnect_TuyaDeveloper?_source=e9684c7ca6b31e7221c8420f5af94631


<h3>Requirements:</h3>

```
pip install tuyaapi
```
```
express frame work
```

<h3>Example code:</h3>

```Javascript
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
```


<h3>Need to fill:</h3>

```
IP_ADDRESS=   //ip address of which u r connecting
DEVICE_ID=    //device id can be found from tuya website devices list
DEVICE_KEY=   //can be found from tuya website
```
<br>
<h3>Steps to proceed:</h3><br>

Step 1: CLIENT_ID and SECRET_KEY<br>
Register or Login on Tuya.<br>
Create a cloud development project Cloud -> Project.<br>
After successful creation, you will receive the Client ID and Secret Key.<br>
<br>
<br>
Step 2: DEVICE_ID<br>
Install Tuya Smart app or Smart Life app on your mobile phone.<br>
Go to Cloud -> Link Devices page.<br>
Selecting a tab Link Devices by App Account.<br>
Click Add App Account and scan the QR code with Tuya Smart app or Smart Life app.<br>
Now you can go to devices Cloud -> Device List and copy Device ID.
<br>
<br>
Step 3: Request access to API calls<br>
Go to Cloud -> API Group and enable Authorization management, Device Management and Device Control.
<br>
<br>
Now you can use the project.
