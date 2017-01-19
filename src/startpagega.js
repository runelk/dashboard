
const setupGa = function() {

  const authorizeUser = () => {
    var CLIENT_ID = '545740641298-2vtm14smqak9fblaabsm5e8h5jo65p1a.apps.googleusercontent.com';

    gapi.analytics.auth.authorize({
      container: 'auth-button',
      clientid: CLIENT_ID
    });
  };

  const createViewSelector = () => {
    return new gapi.analytics.ViewSelector({
      container: 'view-selector'
    });
  };

  const createTimelineChart = () => {
    return new gapi.analytics.googleCharts.DataChart({
      reportType: 'ga',
      query: {
        'dimensions': 'ga:date',
        'metrics': 'ga:sessions',
        'start-date': '30daysAgo',
        'end-date': 'yesterday'
      },
      chart: {
        type: 'LINE',
        container: 'timeline'
      }
    });
  };

  gapi.analytics.ready(function() {

    authorizeUser();
    let viewSelector = createViewSelector();
    let timeline = createTimelineChart();

    // Hook up the components to work together.
    gapi.analytics.auth.on('success', function(response) {
      viewSelector.execute();
    });

    viewSelector.on('change', function(ids) {
      var newIds = {
        query: {
          ids: ids
        }
      };
      timeline.set(newIds).execute();
    });
  });
};

setupGa();
