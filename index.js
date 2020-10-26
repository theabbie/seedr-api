var axios = require("axios");
var FormData = require('form-data');

module.exports = class Seedr {
  constructor() {}

  async login(username, password) {
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
      data: data
    });
    this.token = token.data["access_token"];
    this.rft = token.data["refresh_token"];
    return this.token;
  }

  async getDeviceCode() {
    var dc = await axios("https://www.seedr.cc/api/device/code?client_id=seedr_xbmc");
    this.devc = dc.data["device_code"];
    this.usc = dc.data["user_code"];
    console.log(this.usc, this.devc);
    return this.usc;
  }

  async getToken(devc) {
    var token = await axios("https://www.seedr.cc/api/device/authorize?device_code=" + devc + "&client_id=seedr_xbmc");
    this.token = token.data["access_token"];
    return this.token;
  }

  async addToken(token) {
    this.token = token;
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
      data: data
    });
    return res.data;
  }

  async getVideos() {
    var res = [];

    var data = await axios("https://www.seedr.cc/api/folder?access_token=" + this.token);

    for (var folder of data.data.folders) {
      res.push((await axios("https://www.seedr.cc/api/folder/" + folder.id + "?access_token=" + this.token)).data.files.filter(x => x["play_video"]).map(x => {
        return {
          fid: folder.id,
          id: x["folder_file_id"],
          name: x.name
        }
      }));
    }

    return res;
  }

  async getFile(id) {
    var data = new FormData();
    data.append('access_token', this.token);
    data.append('func', 'fetch_file');
    data.append('folder_file_id', id);

    var res = await axios({
      method: 'post',
      url: 'https://www.seedr.cc/oauth_test/resource.php',
      headers: data.getHeaders(),
      data: data
    });
    return res.data;
  }

  async deleteFolder(id) {
    var data = new FormData();
    data.append('access_token', this.token);
    data.append('func', 'delete');
    data.append('delete_arr', JSON.stringify([{
      type: 'folder',
      id: id
    }]));

    var res = await axios({
      method: 'post',
      url: 'https://www.seedr.cc/oauth_test/resource.php',
      headers: data.getHeaders(),
      data: data
    });
    return res.data;
  }

  async deleteFile(id) {
    var data = new FormData();
    data.append('access_token', this.token);
    data.append('func', 'delete');
    data.append('delete_arr', JSON.stringify([{
      type: 'file',
      id: id
    }]));

    var res = await axios({
      method: 'post',
      url: 'https://www.seedr.cc/oauth_test/resource.php',
      headers: data.getHeaders(),
      data: data
    });
    return res.data;
  }
}
