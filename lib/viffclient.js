var request = require('request');
var fs = require('fs');

module.exports = ViffClient;

function ViffClient(viffHost, opts) {
  this.options = opts || {};
  this.viffHost = viffHost;
}

ViffClient.prototype = {
  post: function (url, imagePath, callback) {
    var pathParam;
    var r = request.post(this.viffHost, callback);
    var form = r.form();

    form.append('capabilities', JSON.stringify(this.options.capabilities));
    form.append('host', this.options.host);
    form.append('name', this.options.name);
    form.append('url', JSON.stringify(url));
    form.append('image', fs.createReadStream(imagePath));;
  },
  generateReport: function (callback) {
    return request.get(this.viffHost + '/generate-report', callback);
  },
  end: function (callback) {
    return request.get(this.viffHost + '/end', callback);
  }
};
