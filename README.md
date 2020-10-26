# Seedr.cc API
![seedr.cc](https://user-images.githubusercontent.com/17960677/97034774-0b55bf00-1583-11eb-9529-807646a216de.png)  
  
    

Unofficial API wrapper for seedr.cc
## Example
The Following Code snipet will help you understand how to use this.

```js
var Seedr = require("seedr");
var seedr = new Seedr();
await seedr.login("email@example.com","password");
await seedr.addMagnet("magnet_link");
// Starts downloading, wait till that happens
var contents = await seedr.getVideos();
// An object containing list of all files and folders
```

## Documentation

### Logging in

There are two ways to login, that is,

* using username and password
* using device code

the username and password method returns a token with short lifetime while device id method returns a 1 year lifetime token.

```js
var Seedr = require("seedr");
var seedr = new Seedr();
await seedr.login("email@example.com","password");
```

![Seedr.cc Devices](https://user-images.githubusercontent.com/17960677/97114270-95359180-1715-11eb-91f1-59273a488ca5.png)

```js
var Seedr = require("seedr");
var seedr = new Seedr();
await seedr.getDeviceCode();
// prints a device code and user code, go to seedr.cc/devices and add user code
// after adding user code, pass the device code parameter to getToken function

await seedr.getToken("device_code");
// returns a token with 1 year lifetime
```

** using an old token to log in directly **

```js
var Seedr = require("seedr");
var seedr = new Seedr();
await seedr.addToken("token");
```
### Adding magnet link

Magnet link can be added using `addMagnet` function

```js
var Seedr = require("seedr");
var seedr = new Seedr();
await seedr.login("email@example.com","password");

await seedr.addMagnet("magnet_link");

// adds a magnet link, wait till it downloads
```

### Getting contents

To get contents (only videos), use the `getVideos` function

```js
var Seedr = require("seedr");
var seedr = new Seedr();
await seedr.login("email@example.com","password");

await seedr.getVideos();

/*
Prints Array of Arrays with file data

[
  [
    {
      "fid": 124291671, // folder id
      "id": 636235280, // file id
      "name": "File Name"
    },
    ...
  ],
  ...
]
*/
```
### Deleting contents

To delete Folders use `deleteFolder` function and to delete files, use `deleteFiles` function

```js
var Seedr = require("seedr");
var seedr = new Seedr();
await seedr.login("email@example.com","password");

await seedr.deleteFile("file_id");

await seedr.deleteFolder("folder_id");
```

## Contributing

Thank you for your interest in contributing, If you feel like there's something missing or any new feature can be added, just create a PR and I will see the rest.

## Help

You can contact me on social media, Everything about me can be found [here](https://theabbie.github.io)

## Installation

### Requirements

* Node.Js installed

### Dev Dependencies

* Axios

## Credits

* [Seedr.cc](https://seedr.cc) For making an excellent tool

## Contact

Contact me anywhere, just visit [my portfolio](https://theabbie.github.io)

## License

This project is licensed under MIT License, See [LICENSE](/LICENSE) for more information

