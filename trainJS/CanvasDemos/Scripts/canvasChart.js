var CanvasChart = function () {
    var ctx;
    var margin = { top: 40, left: 75, right: 0, bottom: 75 };
    var chartHeight, chartWidth, yMax, xMax, data;
    var maxYValue = 0;
    var ratio = 0;
    var renderType = { lines: 'lines', points: 'points' };
    var renderType1 = { lines1: 'lines', points1: 'points' };

    var render = function(canvasId, dataObj) {
        data = dataObj;
        getMaxDataYValue();
        var canvas = document.getElementById(canvasId);
        chartHeight = canvas.getAttribute('height');
        chartWidth = canvas.getAttribute('width');
        xMax = chartWidth - (margin.left + margin.right);
        yMax = chartHeight - (margin.top + margin.bottom);
        ratio = yMax / maxYValue;
        ctx = canvas.getContext("2d");
        renderChart();
    };

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

    var getMaxDataYValue = function () {
        for (var i = 0; i < data.dataPoints.length; i++) {
            if (data.dataPoints[i].y > maxYValue) maxYValue = data.dataPoints[i].y;
        }
    };

    var renderBackground = function() {
        var lingrad = ctx.createLinearGradient(margin.left, margin.top, xMax - margin.right, yMax);
        lingrad.addColorStop(1, '#ffffcc');
        ctx.fillStyle = lingrad;
        ctx.fillRect(margin.left, margin.top, xMax - margin.left, yMax - margin.top);
        ctx.fillStyle = 'black';
    };

    var renderText = function() {
        var labelFont = (data.labelFont != null) ? data.labelFont : '10pt Arial';
        ctx.font = labelFont;
        ctx.textAlign = "center";

        //Title
        var txtSize = ctx.measureText(data.title);
        ctx.fillText(data.title, (chartWidth / 2), (margin.top / 2));

        var txt1 = '○ C';
        ctx.fillText(txt1, 60, 20);


        var txt2 = '%';
        ctx.fillText(txt2, 15, 20);

        //X-axis text
        txtSize = ctx.measureText(data.xLabel);
        ctx.fillText(data.xLabel, margin.left + (xMax / 2) - (txtSize.width / 2), yMax + (margin.bottom / 1.2));
    };

    var renderLinesAndLabels = function () {
        //Vertical guide lines
        var yInc = yMax / data.dataPoints.length;
        var yPos = 0;
        //var yLabelInc = (maxYValue * ratio) / data.dataPoints.length;
        var xInc = getXInc();
        var xPos = margin.left;
        for (var i = 0; i < data.dataPoints.length; i++) {
            yPos += (i == 0) ? margin.top : yInc;
            //Draw horizontal lines
            drawLine(margin.left, yPos, xMax+22, yPos, '#E8E8E8');

            //y axis labels
            ctx.font = (data.dataPointFont != null) ? data.dataPointFont : '5pt Calibri';
            var txt = Math.round(maxYValue - ((i == 0) ? 0 : yPos / ratio));
            var txtSize = ctx.measureText(txt);
            ctx.fillText(txt, margin.left - ((txtSize.width >= 50) ? txtSize.width : 10) - 10, yPos -3);

            //x axis labels
            txt = data.dataPoints[i].x;
            txtSize = ctx.measureText(txt);
            ctx.fillText(txt, xPos, yMax + (margin.bottom / 5));
            xPos += xInc;
        }

        //Vertical line
        drawLine(margin.left, margin.top, margin.left, yMax, '#353534');
        drawLine(margin.left+669, margin.top, margin.left+669, yMax, '#353534');
        drawLine(margin.left+87, margin.top, margin.left+87, yMax, '#353534'); //20
        drawLine(margin.left+377, margin.top, margin.left+377, yMax, '#353534'); //10

        drawLine(margin.left+29, margin.top, margin.left+29, yMax, '#dedede');//22
        drawLine(margin.left+58, margin.top, margin.left+58, yMax, '#dedede');//21
        drawLine(margin.left+116, margin.top, margin.left+116, yMax, '#dedede');//19
        drawLine(margin.left+145, margin.top, margin.left+145, yMax, '#dedede');//18
        drawLine(margin.left+174, margin.top, margin.left+174, yMax, '#dedede');//17
        drawLine(margin.left+203, margin.top, margin.left+203, yMax, '#dedede');//16
        drawLine(margin.left+232, margin.top, margin.left+232, yMax, '#dedede');//15
        drawLine(margin.left+261, margin.top, margin.left+261, yMax, '#dedede');//14
        drawLine(margin.left+290, margin.top, margin.left+290, yMax, '#dedede');//13
        drawLine(margin.left+319, margin.top, margin.left+319, yMax, '#dedede');//12
        drawLine(margin.left+348, margin.top, margin.left+348, yMax, '#dedede');//11
        drawLine(margin.left+406, margin.top, margin.left+406, yMax, '#dedede');//9
        drawLine(margin.left+435, margin.top, margin.left+435, yMax, '#dedede');//8
        drawLine(margin.left+464, margin.top, margin.left+464, yMax, '#dedede');//7
        drawLine(margin.left+493, margin.top, margin.left+493, yMax, '#dedede');//6
        drawLine(margin.left+522, margin.top, margin.left+522, yMax, '#dedede');//5
        drawLine(margin.left+551, margin.top, margin.left+551, yMax, '#dedede');//4
        drawLine(margin.left+580, margin.top, margin.left+580, yMax, '#dedede');//3
        drawLine(margin.left+609, margin.top, margin.left+609, yMax, '#dedede');//2
        drawLine(margin.left+638, margin.top, margin.left+638, yMax, '#dedede');//1

        //Horizontal Line
        drawLine(margin.left-150, yMax, xMax+20, yMax, '#000');
        drawLine(margin.left-150, yMax-445, xMax+20, yMax-445, '#353534');
    };

    var renderData = function(type) {
        var xInc = getXInc();
        var prevX = 0, 
        prevY = 0;

        for (var i = 0; i < data.dataPoints.length; i++) {
            var pt = data.dataPoints[i];
            var ptY = (maxYValue - pt.y) * ratio ;
            if (ptY < margin.top) ptY = margin.top;
            var ptX = (i * xInc) + margin.left;

            if (i > 0 && type == renderType.lines) {
                //Draw connecting lines
                drawLine(ptX, ptY, prevX, prevY, 'blue', 2);
            }
            if (i > 1 && type == renderType1.lines1) {
                //Draw connecting lines
                drawLine(ptX, ptY, prevX, prevY, 'red', 2);
            }
            prevX = ptX;
            prevY = ptY;
        }
    };

    var getXInc = function() {
        return Math.round(xMax / data.dataPoints.length) - 1;
    };

    var drawLine = function(startX, startY, endX, endY, strokeStyle, lineWidth) {
        if (strokeStyle != null) ctx.strokeStyle = strokeStyle;
        if (lineWidth != null) ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        ctx.closePath();
    };



    return {
        renderType: renderType,
        render: render,
        renderType1: renderType1,
        render: render

    };
} ();
