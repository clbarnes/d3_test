var DATA_LEN = 30;

var w = 450;
var h = 450;

var data_max = 500;

var padding = 30;

var transition_dur = 500;
var transition_delay = function (d, i) {
    return i*(transition_dur/50)
};
var ease_type = "elastic";

var mk_data = function(l) {
    var out = [];
    for (var i = 0; i < l; i++) {
        out.push({
            x: Math.random()*data_max,
            y: Math.random()*data_max
        })
    }
    return out;
};

var dataset = mk_data(DATA_LEN);

var svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

var yScale = d3.scale.linear()
    .domain([0, data_max])
    .rangeRound([h-padding, padding]);

var xScale = d3.scale.linear()
    .domain([0, data_max])
    .rangeRound([padding, w-padding]);

var rScale = d3.scale.linear()
    .domain([0, DATA_LEN])
    .rangeRound([3, 6]);

svg.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("cx", function(d) {
        return xScale(d.x);
    })
    .attr("cy", function(d) {
        return yScale(d.y);
    })
    .attr("fill", function(d) {
        return "rgb("
            + Math.round((d.x/data_max) * 255)
            + ", 0,"
            + Math.round((d.y/data_max) * 255)
            + ")"
    })
    .attr("r", function(d, i) {
        return rScale(i)
    });

var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom")
    .ticks(5);

var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left")
    .ticks(5);

svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + (h - padding) + ")")
    .call(xAxis);

svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + padding + ", 0)")
    .call(yAxis);

d3.select("p")
    .on("click", function() {
        dataset = mk_data(DATA_LEN);

        svg.selectAll("circle")
            .data(dataset)
            .transition()
                .delay(transition_delay)
                .duration(transition_dur)
                .ease(ease_type)
            .attr("cy", function(d) {
                return yScale(d.y);
            })
            .attr("cx", function(d) {
                return xScale(d.x);
            });
    });

