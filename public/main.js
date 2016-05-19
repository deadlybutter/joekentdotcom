// ---
// Graph functions
// ---

function drawRenewableStates(datasets, canvas, ctx) {
  console.log(datasets);
}

var GRAPH_DICTIONARY = {
  "renewable_states": drawRenewableStates
}

// ---
// Data functions
// ---

function loadCSV(path, removeHeaders, callback) {
  Papa.parse("data/" + path, {
    	download: true,
    	complete: function(results) {
        if (removeHeaders) {
          results.data.splice(0, 1);
        }

        callback(results.data);
    	}
    });
}

function filterData(data, includes) {

}

// ---
// Init + Helper functions
// ---

var graphs = [];

function getCtx(canvas) {
  return canvas.getContext('2d');
}

function clearCanvas(canvas) {
  getCtx(canvas).clearRect(0, 0, canvas.width, canvas.height);
}

function sizeCanvas(canvas) {
  canvas.width = $('.container').width();
  canvas.height = Math.round($(window).height() * .75);
}

function drawGraph(content, canvas) {
  var count = 0;
  content.datasets.forEach(function(dataset) {
    loadCSV(dataset.path, dataset.remove_headers || false, function(data) {
      dataset.data = data;
      count++;

      if (count >= content.datasets.length) {
        GRAPH_DICTIONARY[content.id](content.datasets, canvas, getCtx(canvas));
      }
    });
  });
}

$(document).on('ready', function() {

  $('.viz-canvas').each(function() {
    var content = $(this).data('content');
    console.log(content);
    $(this).attr('id', content.id);
    var canvas = document.getElementById(content.id);
    sizeCanvas(canvas);
    drawGraph(content, canvas);
    graphs.push([content, canvas]);
  });

  $(window).on('resize', function() {
    graphs.forEach(function(g) {
      sizeCanvas(g[1]);
      clearCanvas(g[1]);
      drawGraph(g[0], g[1]);
    });
  });

});
