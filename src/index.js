var request = require('superagent');
var startpagega = require('./startpagega.js');

function testRequest() {
  request
    .get('http://localhost:4041/stripe')
    .end(function (err, res) {
      if (err) {
        document.querySelector('#error-messages').innerHTML = err.message;
        // console.log(err);
      } else {
        var divStatusStripe = document.querySelector('#status-stripe');
        var h4MainStatus = document.createElement('h4');
        var ulServices = document.createElement('ul');

        ulServices.classList.add('list-group');

        var data = JSON.parse(res.text);
        h4MainStatus.innerHTML = data.summary;
        data.services.forEach(function (service) {
          var liService = document.createElement('li');
          liService.classList.add('list-group-item');
          liService.innerHTML = `${service.name} - (${service.status.date}) ${service.status.message}`;
          ulServices.appendChild(liService);
        });

        divStatusStripe.appendChild(h4MainStatus);
        divStatusStripe.appendChild(ulServices);
        // console.log(res);
      }
    });
}

const fetchIntercomStatus = () => {
  var sp = new StatusPage.page({ page : '1m1j8k4rtldg' });
  sp.summary({
    success : function(data) {
      let divStatusIntercom = document.querySelector('#status-intercom'),
          h4MainStatus = document.createElement('h4'),
          ulServices = document.createElement('ul');

      ulServices.classList.add('list-group');
      divStatusIntercom.innerHTML = '';
      h4MainStatus.textContent = data.status.description;

      data.components.forEach(comp => {
        let liService = document.createElement('li');
        liService.classList.add('list-group-item');
        liService.innerHTML = `${comp.description} - ${comp.status}`;
        ulServices.appendChild(liService);
      });

      divStatusIntercom.appendChild(h4MainStatus);
      divStatusIntercom.appendChild(ulServices);
    }
  });
};



testRequest();
fetchIntercomStatus();
