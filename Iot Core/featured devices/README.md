# Featured Devices

This pages describes the devices, that are available via the `featuredDevices` function in `IotCore`.
The following devices are supported:

## Sensors:

### CONTACT:

Event subscription to the events `contact` and `nocontact`. `contact` used if the sensor is covered. `nocontact` means the sensor is not covered. Just create the `contact` or `nocontact` event without a value.
Example:
```
const payload = {
  token: "2435256436-6346436-643643634",
  device: "5bfd6c80145c9ede1cb78ea7",
  event: "nocontact"
};
await mydaco.interface('IotCore', 'createEvent', payload);
```

### MOTION:
Subscribe to the event `motion`. It is triggered when the motion sensor detections a motion. There is not need to send a value.
Example:
```
const payload = {
  token: "2435256436-6346436-643643634",
  device: "5bfd6c80145c9ede1cb78ea7",
  event: "motion"
};
await mydaco.interface('IotCore', 'createEvent', payload);
```

### BUTTON
Event subscriptions to the events `click`, `doubleclick`, and `longclick` are possible. It triggers if you do a single-click, double click or long click the button. As well, there is no value needed.
Example:
```
const payload = {
  token: "2435256436-6346436-643643634",
  device: "5bfd6c80145c9ede1cb78ea7",
  event: "click"
};
await mydaco.interface('IotCore', 'createEvent', payload);
```

## Actuators:

### LAMP:
Lamps being used for the Hackathon support three properties `on_off`, `brightness` and `color` to turn the lamp on and off, change its brightness and color respectively. `on_off` supports boolean values. `brightness` supports integers between 10 and 100 in increments of 10 (i.e. 10, 20, 30, ..., 100). Color supports any RGB hexstring (i.e. ff0055).
Examples:
```
const payload1 = {
  device: '5bfd6c80145c9ede1cb78ea7',
  property: 'on_off',
  value: true
};
const payload2 = {
  device: '5bfd6c80145c9ede1cb78ea7',
  property: 'brightness',
  value: 40
};
const payload3 = {
  device: '5bfd6c80145c9ede1cb78ea7',
  property: 'color',
  value: 'ff0055'
};
await mydaco.interface('IotCore', 'actuate', payload1);
await mydaco.interface('IotCore', 'actuate', payload2);
await mydaco.interface('IotCore', 'actuate', payload3);
```

## DOORLOCK:
It supports the property `locked`. Setting it to true will lock the door, setting it to false will unlock the door. The Nuki lock might need up to 30 seconds between requests, so you may not be able to open/close the lock in rapid successions. 
Example:
```
const payload = {
  device: '5bfd6c80145c9ede1cb78ea7',
  property: 'locked',
  value: true
};
await mydaco.interface('IotCore', 'actuate', payload);
```

## AUDIO
The audio device supports `playing`/`pausing` the playback and setting the `volume`. Playback can be controlled by setting the property `playing` to true (play) or false (pause). Volume is set by setting the property `volume` to an integer between 0 and 100 in increments of 10 (i.e. 0, 10, 20, ..., 100).
You should use the Sonos app to set a playlist and then you will be able to control the states of the device.
Examples:
```
const payload1 = {
  device: '5bfd6c80145c9ede1cb78ea7',
  property: 'playing',
  value: true
};
const payload2 = {
  device: '5bfd6c80145c9ede1cb78ea7',
  property: 'volume',
  value: 40
};
await mydaco.interface('IotCore', 'actuate', payload1);
await mydaco.interface('IotCore', 'actuate', payload2);
```

## PLUG:
The plug can be turned on and off with the property `on_off`. You pass true to turn it on, and false to turn it off.
Example:
```
const payload = {
  device: '5bfd6c80145c9ede1cb78ea7',
  property: 'on_off',
  value: false
};
await mydaco.interface('IotCore', 'actuate', payload);
```
