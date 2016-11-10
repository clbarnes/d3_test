var DATA_LEN = 30;

var w = 450;
var h = 450;

var data_max = 500;

var padding = 30;

var transition_dur = 150;
var transition_delay = function (d, i) {
    return i*(transition_dur/2)
};
var ease_type = "cubic-in-out";

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

// var hScale = d3.scale.linear()
//     .domain([0, Math.round(d3.max(dataset) * 1.2)])
//     .rangeRound([0, h]);
//
// svg.selectAll("rect")
//     .data(dataset)
//     .enter()
//     .append("rect")
//     .attr("x", function(d, i) {
//         return xScale(i)
//     })
//     .attr("width", xScale.rangeBand())
//     .attr("y", function(d) {
//         return yScale(d)
//     })
//     .attr("height", function(d) {
//         return hScale(d)
//     })
//     .attr("fill", function (d){
//         return "rgb(0, 0, " + Math.round((d / d3.max(dataset)) * 255) + ")";
//     });
//
// svg.selectAll("text")
//     .data(dataset)
//     .enter()
//     .append("text")
//     .text(function (d) {
//         return Math.round(d);
//     })
//     .attr("x", function(d, i) {
//         return xScale(i) + 7
//     })
//     .attr("y", function(d) {
//         return yScale(d) + 15
//     })
//     .attr("font-family", "sans-serif")
//     .attr("font-size", "11px")
//     .attr("fill", "white");
//
// d3.select("p")
//     .on("click", function() {
//         dataset = mk_data(DATA_LEN);
//
//         yScale.domain([0, Math.round(d3.max(dataset) * 1.2)]);
//         hScale.domain([0, Math.round(d3.max(dataset) * 1.2)])
//
//         svg.selectAll("rect")
//             .data(dataset)
//             .transition()
//                 .delay(transition_delay)
//                 .duration(transition_dur)
//                 .ease(ease_type)
//             .each("start", function() {
//                 d3.select(this)
//                     .attr("fill", "magenta")
//         })
//             .attr("y", function(d) {
//                 return yScale(d);
//             })
//             .attr("height", function(d) {
//                 return hScale(d);
//             })
//             .transition()
//             .duration(transition_dur)
//             .attr("fill", function(d) {
//                 return "rgb(0, 0, " + Math.round((d / d3.max(dataset)) * 255) + ")";
//             });
//
//         svg.selectAll("text")
//             .data(dataset)
//             .transition()
//                 .delay(transition_delay)
//                 .duration(transition_dur)
//                 .ease(ease_type)
//             .text(function (d) {
//                 return Math.round(d);
//             })
//             .attr("x", function(d, i) {
//                 return xScale(i) + 7
//             })
//             .attr("y", function(d) {
//                 return yScale(d) + 15
//             });
//     });

