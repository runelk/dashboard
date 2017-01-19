var cheerio = require('cheerio');


var parseStripeStatusPage = function (content) {
  var $ = cheerio.load(content);

  var summary = $('div.largestatus').find('span.title').text();
  var services = $('div.block-chart').map(function(i, elm) {
    var statName = $(elm).prev().find('span.uptime-stat-name').text();
    var attrTitle = $(elm).find('div.bar').last()
          .attr('title').split('<br>')
          .map(function (elm) { return elm.trim(); });

    return {
      name: statName,
      status: {
        date: attrTitle[0],
        message: attrTitle[1]
      }
    };
  }).get();

  return {
    summary: summary,
    services: services
  };
};


module.exports = {
  parseStripeStatusPage: parseStripeStatusPage
};
