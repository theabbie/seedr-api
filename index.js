var axios = require("axios");
var FormData = require('form-data');

module.exports = class Seedr {
  constructor() {}

  async  login(username,password) {
    this.username = username;
    this.password = password;
    var data = new FormData();
    data.append('grant_type', 'password');
	data.append('client_id', 'seedr_chrome');
	data.append('type', 'login');
	data.append('username', this.username);
	data.append('password', this.password);
	var token = await axios({
  		method: 'post',
  		url: 'https://www.seedr.cc/oauth_test/token.php',
  		headers: data.getHeaders(),
  		data : data
	});
	this.token = token.data["access_token"];
	this.rft = token.data["refresh_token"];
	return this.token;
  }

  async getDeviceCode() {
    var dc = await axios("https://www.seedr.cc/api/device/code?client_id=seedr_xbmc");
    this.devc = dc.data["device_code"];
    this.usc = dc.data["user_code"];
    console.log(this.usc,this.devc);
    return this.usc;
  }

  async getToken(devc) {
    var token = await axios("https://www.seedr.cc/api/device/authorize?device_code="+devc+"&client_id=seedr_xbmc");
    this.token = token.data["access_token"];
    return this.token;
  }

  async addMagnet(magnet) {
  	var data = new FormData();
	data.append('access_token', this.token);
	data.append('func', 'add_torrent');
	data.append('torrent_magnet', magnet);

	var res = await axios({
  		method: 'post',
  		url: 'https://www.seedr.cc/oauth_test/resource.php',
  		headers: data.getHeaders(),
  		data : data
	});
	return res;
  }
}


