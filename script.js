var mk_data = function(l) {
    var out = [];
    for (var i = 0; i < l; i++) {
        out.push(Math.random()*50)
    }
    return out;
};

var dataset = mk_data(20);

var svg = d3.select("body").append("svg").attr("width", 500).attr("height", 500);

var w = 600;
var h = 250;

var yScale = d3.scale.linear()
    .domain([0, Math.round(d3.max(dataset) * 1.2)])
    .rangeRound([h, 0]);

var xScale = d3.scale.ordinal()
    .domain(d3.range(dataset.length))
    .rangeRoundBands([0, w], 0.05);

var hScale = d3.scale.linear()
    .domain([0, Math.round(d3.max(dataset) * 1.2)])
    .rangeRound([0, h]);

svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", function(d, i) {
        return xScale(i)
    })
    .attr("width", xScale.rangeBand())
    .attr("y", function(d) {
        return yScale(d)
    })
    .attr("height", function(d) {
        return hScale(d)
    })
    .attr("fill", function (d){
        return "rgb(0, 0, " + Math.round((d / d3.max(dataset)) * 255) + ")";
    });

svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .text(function (d) {
        return Math.round(d);
    })
    .attr("x", function(d, i) {
        return xScale(i) + 7
    })
    .attr("y", function(d) {
        return yScale(d) + 15
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("fill", "white");