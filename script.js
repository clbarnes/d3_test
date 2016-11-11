var w = 500;
var h = 500;

var svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

var DATA_LEN = 8;
var DATA_MAX = 40;

var mk_data = function(l) {
    var data = [];
    for (var i = 0; i < l; i++) {
        data.push({
            apples: Math.round(Math.random()*DATA_MAX),
            oranges: Math.round(Math.random()*DATA_MAX),
            grapes: Math.round(Math.random()*DATA_MAX)
        })
    }
    return data;
};

var dataset = mk_data(DATA_LEN);

var data2stacks = function(data) {
    var out = [[], [], []];
    data.forEach(function(element, index) {
        out[0].push({x: index, y: element.apples});
        out[1].push({x: index, y: element.oranges});
        out[2].push({x: index, y: element.grapes});
    });
    return out;
};

var stackData = data2stacks(dataset);

var stack = d3.layout.stack();

stack(stackData);

var xScale = d3.scale.ordinal()
    .domain(d3.range(DATA_LEN))
    .rangeRoundBands([0, w], 0.05);

var yScale = d3.scale.linear()
    .domain([0, DATA_MAX*3])
    .rangeRound([0, h]);

var colors = d3.scale.category10();

var groups = svg.selectAll("g")
    .data(stackData)
    .enter()
    .append("g")
    .style("fill", function(d, i) {
        return colors(i);
    });

var rects = groups.selectAll("rect")
    .data(function(d) { return d; })
    .enter()
    .append("rect")
    .attr("x", function (d, i) {
        return xScale(i);
    })
    .attr("y", function(d) {
        return yScale(d.y0);
    })
    .attr("height", function(d) {
        return yScale(d.y)
    })
    .attr("width", xScale.rangeBand());
