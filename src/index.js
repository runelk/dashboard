var request = require('superagent');
var startpagega = require('./startpagega.js');

function testRequest() {
  request
    .get('http://localhost:4041/stripe')
    .end(function (err, res) {
      if (err) {
        document.querySelector('#error-messages').innerHTML = err.message;
        console.log(err);
      } else {
        var divStatusStripe = document.querySelector('#status-stripe');
        var h4MainStatus = document.createElement('h4');
        var ulServices = document.createElement('ul');

        var data = JSON.parse(res.text);
        h4MainStatus.innerHTML = data.summary;
        data.services.forEach(function (service) {
          var liService = document.createElement('li');
          liService.innerHTML = `${service.name} - (${service.status.date}) ${service.status.message}`;
          ulServices.appendChild(liService);
        });

        divStatusStripe.appendChild(h4MainStatus);
        divStatusStripe.appendChild(ulServices);
        console.log(res);
      }
    });
}

testRequest();
