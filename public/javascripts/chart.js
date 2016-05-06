window.count = 0;
var currentMousePos = { x: -1, y: -1 };
$(document).mousemove(function(event) {
    currentMousePos.x = event.pageX;
    currentMousePos.y = event.pageY;
});
Chart.defaults.global.pointHitDetectionRadius = 1;
Chart.defaults.global.legend.display = false;
Chart.defaults.global.defaultFontFamily = 'Proxima Nova';
Chart.defaults.global.elements.line.borderColor = 'rgba(39,170,224,.75)';
Chart.defaults.global.elements.line.borderWidth = 3;
Chart.defaults.global.elements.arc.backgroundColor = 'rgba(39,170,224,.25)';
Chart.defaults.global.elements.point.radius = 4;
Chart.defaults.global.elements.point.borderWidth = 3;
Chart.defaults.global.elements.point.backgroundColor = '#fff';
Chart.defaults.global.elements.point.hoverBackgroundColor = '#fff';
Chart.defaults.global.elements.point.borderColor = 'rgba(39,170,224,.75)';
var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var days = 14;
var customTooltips = function(tooltip) {
  // Tooltip Element
  var tooltipEl = $('#chartjs-tooltip');
  if (!tooltipEl[0]) {
    $('body').append('<div id="chartjs-tooltip"></div>');
    tooltipEl = $('#chartjs-tooltip');
  }
  // Hide if no tooltip
  if (!tooltip.opacity) {
    tooltipEl.css({
      opacity: 0
    });
    $('.chartjs-wrap canvas')
      .each(function(index, el) {
        $(el).css('cursor', 'default');
      });
    return;
  }
  $(this._chart.canvas).css('cursor', 'pointer');
  // Set caret Position
  tooltipEl.removeClass('above below no-transform');
  if (tooltip.yAlign) {
    tooltipEl.addClass(tooltip.yAlign);
  } else {
    tooltipEl.addClass('no-transform');
  }
  // Set Text
  if (tooltip.body) {
    var innerHtml = [
      (tooltip.beforeTitle || []).join('\n'), (tooltip.title || []).join('\n'), (tooltip.afterTitle || []).join('\n'), (tooltip.beforeBody || []).join('\n'), (tooltip.body || []).join('\n'), (tooltip.afterBody || []).join('\n'), (tooltip.beforeFooter || [])
      .join('\n'), (tooltip.footer || []).join('\n'), (tooltip.afterFooter || []).join('\n')
    ];
    tooltipEl.html(innerHtml.join('\n'));
  }
  // Find Y Location on page
  var top = 0;
  if (tooltip.yAlign) {
    if (tooltip.yAlign == 'above') {
      top = tooltip.y - tooltip.caretHeight - tooltip.caretPadding;
    } else {
      top = tooltip.y + tooltip.caretHeight + tooltip.caretPadding;
    }
  }
  var position = $(this._chart.canvas)[0].getBoundingClientRect();
  // Display, position, and set styles for font
  tooltipEl.css({
    opacity: 1,
    width: tooltip.width ? (tooltip.width + 'px') : 'auto',
    left: currentMousePos.x + 'px',
    top: currentMousePos.y + 'px',
    fontFamily: tooltip._fontFamily,
    fontSize: tooltip.fontSize,
    fontStyle: tooltip._fontStyle,
    padding: tooltip.yPadding + 'px ' + tooltip.xPadding + 'px',
  });
};
var randomScalingFactor = function() {
  return Math.round(Math.random() * 100);
};
var lineChartData = {
  labels: generateDates(),
  datasets: [{
    backgroundColor: 'rgba(39,170,224,0.15)',
    borderWidth: 1,
    data: generateData(),
    pointBackgroundColor: '#fff',
    pointColor: '#000',
    strokeColor: '#27AAE0',
  }]
};
function generateData() {
  var a = [];
  for (var i=0;i<days;i++) {
    a.push(randomScalingFactor());
  }
  return a;
}
function generateDates() {
  var a = [];
  for (i=days;i>0;i--) {
    var d = new Date();
    d.setDate(d.getDate()-i);
    a.push(months[d.getUTCMonth()]+' '+d.getUTCDate());
  }
  return a;
}
window.onload = function() {
  var chartEl = document.getElementById("chart1");
  window.myLine = new Chart(chartEl, {
    type: 'line',
    data: lineChartData,
    options: {
      tooltips: {
        enabled: false,
        custom: customTooltips
      }
    }
  });
};
