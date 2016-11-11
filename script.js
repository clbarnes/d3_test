var DATA_LEN = 5;
var DATA_MAX = 10;

var w = 500;
var h = 500;

var mk_data = function(l) {
    var data = [];
    for (var i = 0; i < l; i++) {
        data.push(Math.round(Math.random() * DATA_MAX));
    }
    return data;
};

var dataset = mk_data(DATA_LEN);

var svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

var pie = d3.layout.pie();

var pieData = pie(dataset);

var outerRadius = w/2;
var innerRadius = 0;

var arc = d3.svg.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

var arcs = svg.selectAll("g.arc")
    .data(pieData)
    .enter()
    .append("g")
    .attr("class", "arc")
    .attr("transform", "translate(" + outerRadius + ", " + outerRadius + ")");

var color = d3.scale.category10();

arcs.append("path")
    .attr("fill", function(d, i) {
        return color(i);
    })
    .attr("d", arc);

arcs.append("text")
    .attr("class", "label")
    .attr("transform", function(d) {
        return "translate(" + arc.centroid(d) + ")";
    })
    .attr("text-anchor", "middle")
    .text(function(d) {
        return d.value;
    });