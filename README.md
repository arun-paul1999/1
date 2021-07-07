# tuya-cloud-led

This project is developed using Tuya SDK, which enables you to quickly develop smart devices, branded APP, cloud development project, etc.

For more information, please check Tuya Developer Click and Connect Challenge https://pages.tuya.com/develop/ClickAndConnect_TuyaDeveloper?_source=e9684c7ca6b31e7221c8420f5af94631


<h3>Install:</h3>

```
pip install paho-mqtt
```

```
pip install pycryptodome
```

```
pip3 install tuya-iot-py-sdk
```


<h3>Demo code:</h3>

```Python

import logging
from env import ENDPOINT, ACCESS_ID, ACCESS_KEY, USERNAME, PASSWORD
from tuya_iot import (
    TuyaOpenAPI,
    ProjectType,
    TuyaOpenMQ,
    TuyaDeviceManager,
    TuyaHomeManager,
    TuyaDeviceListener,
    TuyaDevice,
    TuyaTokenInfo,
    tuya_logger
)

tuya_logger.setLevel(logging.DEBUG)
# Init
openapi = TuyaOpenAPI(ENDPOINT, ACCESS_ID, ACCESS_KEY, ProjectType.INDUSTY_SOLUTIONS)

openapi.login(USERNAME, PASSWORD)
openmq = TuyaOpenMQ(openapi)
openmq.start()

print("device test-> ", openapi.token_info.uid)
# Get device list
# assetManager = TuyaAssetManager(openapi)
# devIds = assetManager.getDeviceList(ASSET_ID)


# Update device status
deviceManager = TuyaDeviceManager(openapi, openmq)


homeManager = TuyaHomeManager(openapi, openmq, deviceManager)
homeManager.update_device_cache()
# # deviceManager.updateDeviceCaches(devIds)
# device = deviceManager.deviceMap.get(DEVICE_ID)


class tuyaDeviceListener(TuyaDeviceListener):
    def update_device(self, device: TuyaDevice):
        print("_update-->", device)

    def add_device(self, device: TuyaDevice):
        print("_add-->", device)

    def remove_device(self, device_id: str):
        pass


deviceManager.add_device_listener(tuyaDeviceListener())

# Turn on the light
# deviceManager.sendCommands(device.id, [{'code': 'switch_led', 'value': True}])
# time.sleep(1)
# print('status: ', device.status)

# # Turn off the light
# deviceManager.sendCommands(device.id, [{'code': 'switch_led', 'value': False}])
# time.sleep(1)
# print('status: ', device.status)

flag = True
while True:
    input()
    # flag = not flag
    # commands = {'commands': [{'code': 'switch_led', 'value': flag}]}
    response = openapi.post(
        "/v1.0/iot-03/users/token/{}".format(openapi.token_info.refresh_token)
    )
    openapi.token_info = TuyaTokenInfo(response)
    # openapi.post('/v1.0/iot-03/devices/{}/commands'.format(DEVICE_ID), commands)

```

<h3>Fill the details:</h3>

```
# ACCESS_ID = # your_access_id
# ACCESS_KEY = # your_access_key
# USERNAME = # your_username
# PASSWORD = # your_password
# ASSET_ID = # your_asset_id
# DEVICE_ID = # your_device_id
# ENDPOINT = "https://openapi.tuyacn.com"
```

<h3>Procedure:</h3>

#### Step 1: CLIENT_ID and SECRET_KEY
- Register or Login on <a href="https://auth.tuya.com" target="_blanck">Tuya</a>.
1. Create a cloud development project <a href="https://iot.tuya.com/cloud" target="_blanck">Cloud -> Project</a>.
2. After successful creation, you will receive the **Client ID** and **Secret Key**.


#### Step 2: DEVICE_ID
1. Install **Tuya Smart** app or **Smart Life** app on your mobile phone.
2. Go to <a href="https://iot.tuya.com/cloud/appinfo/cappId/device" target="_blanck">Cloud -> Link Devices</a> page.
3. Selecting a tab **Link Devices by App Account**.
4. Click **Add App Account** and scan the QR code with **Tuya Smart** app or **Smart Life** app.
5. Now you can go to devices <a href="https://iot.tuya.com/cloud/appinfo/cappId/deviceList" target="_blanck">Cloud -> Device List</a> and copy **Device ID**.
    * Notes: Try to select a your region if devices are not displayed.


#### Step 3: Request access to API calls
Go to <a href="https://iot.tuya.com/cloud/appinfo/cappId/setting" target="_blanck">Cloud -> API Group</a> and enable **Authorization management**, **Device Management** and **Device Control**.

<br>
<h3>Note:</h3>
In case of errors comment on this project.


