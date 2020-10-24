var axios = require("axios");

module.exports = class Seedr {
  constructor() {}

  async  login(username,password) {
    this.username = username;
    this.password = password;
  }

  async getDeviceCode() {
    var dc = await axios("https://www.seedr.cc/api/device/code?client_id=seedr_xbmc");
    this.devc = dc.data["device_code"];
    this.usc = dc.data["user_code"];
    console.log(this.usc);
    return this.usc;
  }

  async getToken() {
    var token = await axios("https://www.seedr.cc/api/device/authorize?device_code="+this.devc+"&client_id=seedr_xbmc");
    this.token = token.data["access_token"];
  }
}

