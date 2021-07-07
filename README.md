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
<br>
Step 1: CLIENT_ID and SECRET_KEY<br>
<br>
Get these details from after making a project in the tuya cloud api. <br>
Both client id, client key.
<br>
<br>
Step 2: DEVICE_ID<br>
<br>
After adding a device to the project you can get the id of the device.
<br>
<br>
Step 3: Request access to API calls<br>
<br>
Use the api of tuya and makeapi calls to test the device.
<br>
<br>

<h3>Note:</h3>
In case of errors comment on this project.


