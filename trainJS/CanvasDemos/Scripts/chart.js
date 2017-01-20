

/*
 var canvas ;
 var context ;
 var Val_max;
 var Val_min;
 var sections;
 var xScale;
 var yScale;
    // Values for the Data Plot, they can also be obtained from a external file
    var Apple =  [];
    var Samsung = [];

    function init() {
    // set these values for your data 
    sections = 20;
    Val_max = 100;
    Val_min = -10;
    var stepSize = 20;
    var columnSize = 50;
    var rowSize = 50;
    var margin = 5;
    var xAxis = [" ",
                "-23",
                "22",
                "21",
                "-20",
                "19", 
                "18", 
                "17", 
                "16", 
                "15", 
                "14", 
                "13", 
                "12", 
                "11", 
                "-10", 
                "9", 
                "8", 
                "7", 
                "6", 
                "5", 
                "4", 
                "3", 
                "2", 
                "1", 
                "0"] 
    //
    
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    context.fillStyle = "#cecece"
    context.font = "20 pt Verdana"

    yScale = (canvas.height - columnSize - margin) / (Val_max - Val_min);
    xScale = (canvas.width - rowSize-20) / sections  ;

  context.strokeStyle="#009933"; // color of grid lines
  context.beginPath();
    // print Parameters on X axis, and grid lines on the graph
    for (i=1;i<=sections;i++) {
      var x = i * xScale;
      context.fillText(xAxis[i], x,columnSize - margin);
      context.moveTo(x, columnSize);
      context.lineTo(x, canvas.height - margin);
    }
    // print row header and draw horizontal grid lines
    var count =  0;
    for (scale=Val_max;scale >= Val_min; scale = scale - stepSize) {
      var y = columnSize + (yScale * count * stepSize); 
      context.fillText(scale, margin,y + margin);
      context.moveTo(rowSize,y)
      context.lineTo(canvas.width,y)
      count++;
    }
    context.stroke();

    context.translate(rowSize,canvas.height + Val_min * yScale);
    context.scale(1,-1 * yScale);

    // Color of each dataplot items
    
    context.strokeStyle="#FF0066";
    plotData(Apple);
    context.strokeStyle="#9933FF";
    plotData(Samsung);
  }

  function plotData(dataSet) {
    context.beginPath();
    context.moveTo(0, dataSet[0]);
    for (i=1;i<sections;i++) {
      context.lineTo(i * xScale, dataSet[i]);
    }
    context.stroke();
  }
  */
  /*
  var CanvasChart = function () {
    var ctx;
    var margin = { top: 40, left: 75, right: 0, bottom: 75 };
    var Val_max;
    var Val_min;
    var chartHeight, chartWidth, yMax, xMax, data;

    var renderChart = function () {
        renderBackground();
        renderText();
        renderLinesAndLabels();

        //render data based upon type of renderType(s) that client supplies
        if (data.renderTypes == undefined || data.renderTypes == null) data.renderTypes = [renderType.lines];
        for (var i = 0; i < data.renderTypes.length; i++) {
            renderData(data.renderTypes[i]);
        }
    };

    var renderBackground = function() {
        var lingrad = ctx.createLinearGradient(margin.left, margin.top, xMax - margin.right, yMax);
        lingrad.addColorStop(1, '#ffffcc');
        ctx.fillStyle = lingrad;
        ctx.fillRect(margin.left, margin.top, xMax - margin.left, yMax - margin.top);
        ctx.fillStyle = 'black';
    };

    var init = function() {
       sections = 20;
        Val_max = 100;
        Val_min = -10;
        var stepSize = 20;
        var columnSize = 50;
    };

  }();
*/