# Seedr.cc API
![seedr.cc](https://user-images.githubusercontent.com/17960677/97034774-0b55bf00-1583-11eb-9529-807646a216de.png)
Unofficial API wrapper for seedr.cc
## Example
The Following Code snipet will help you understand how to use this.

```js
var Seedr = require("seedr");
var seedr = new Seedr();
await seedr.login("email@example.com","password");
await seedr.add("magnet_link");
// Starts doenloading, wait till that happens
var contents = await seedr.get();
// An object containing list of all files and folders
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

