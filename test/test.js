var assert = require('assert');
var fs = require('fs');
var path = require('path');
var cheerio = require('cheerio');

var scrapers = require('../src/scrapers.js');

var PATH_TESTDATA = path.resolve(__dirname, '../testdata');


describe('Scrapers', function() {
  describe('#parseStripeStatusPage()', function() {
    var testfile = path.resolve(PATH_TESTDATA, 'Stripe_System_Status_01.html');

    it('should extract the webpage properly', function(done) {

      fs.readFile(testfile, function(err, data) {
        if (err) {
          console.log(err.message);
        }

        parsed = scrapers.parseStripeStatusPage(data.toString());
        assert.equal('All services are online.', parsed.summary);
        assert.equal('API', parsed.services[0].name);
        assert.equal('Dashboard', parsed.services[1].name);
        assert.equal('Stripe.js', parsed.services[2].name);
        assert.equal('Checkout.js', parsed.services[3].name);

        done();
      });

    });
  });
});
