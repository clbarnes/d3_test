var DATA_LEN = 20;
var DATA_MAX = 50;

var w = 600;
var h = 250;

var transition_dur = 150;
var transition_delay = function (d, i) {
    return i*(transition_dur/2)
};
var ease_type = "cubic-in-out";

var sortOrder = false;

var mk_data = function(l) {
    var out = [];
    for (var i = 0; i < l; i++) {
        out.push(Math.random()*DATA_MAX)
    }
    return out;
};

var dataset = mk_data(DATA_LEN);

var svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

var yScale = d3.scale.linear()
    .domain([0, Math.round(d3.max(dataset) * 1.2)])
    .rangeRound([h, 0]);

var xScale = d3.scale.ordinal()
    .domain(d3.range(dataset.length))
    .rangeRoundBands([0, w], 0.05);

var hScale = d3.scale.linear()
    .domain([0, Math.round(d3.max(dataset) * 1.2)])
    .rangeRound([0, h]);

var sortFn = function(a, b) {
    if (sortOrder) {
        return d3.ascending(a, b);
    } else {
        return d3.descending(a, b);
    }
};

var sortBars = function() {
    sortOrder = !sortOrder;
    svg.selectAll("rect")
        .sort(sortFn)
        .transition()
        .delay(function(d, i) {
            return i*20
        })
        .duration(transition_dur)
        .attr("x", function(d, i) {
            return xScale(i);
        });

    svg.selectAll(".bar-label")
        .sort(sortFn)
        .transition()
        .delay(function(d, i) {
            return i*20
        })
        .duration(transition_dur)
        .attr("x", function(d, i) {
            return xScale(i) + 7;
        });
};

/*
 * takes result of svg.selectAll("rect").data(dataset)
 */
var addBars = function(barsWithBoundData) {
    sortOrder = false;
    barsWithBoundData.enter()
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
        })
        .on("click", function() {
            sortBars();
        })
        .on("mouseover", function(d) {
            var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.rangeBand() / 2;
            var yPosition = parseFloat(d3.select(this).attr("y")) + 14;

            svg.append("text")
                .attr("id", "tooltip")
                .attr("x", xPosition)
                .attr("y", yPosition)
                .attr("class", "bar-tooltip")
                .text(Math.round(d));
        })
        .on("mouseout", function() {
            d3.select('#tooltip').remove()
        });
};

addBars(svg.selectAll("rect")
    .data(dataset));

svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .text(function (d) {
        return Math.round(d);
    })
    .attr("class", "bar-label")
    .attr("x", function(d, i) {
        return xScale(i) + 7
    })
    .attr("y", function(d) {
        return yScale(d) + 15
    });


d3.select("#regenerate-text")
    .on("click", function() {
        dataset = mk_data(dataset.length);
        sortOrder = false;

        yScale.domain([0, Math.round(d3.max(dataset) * 1.2)]);
        hScale.domain([0, Math.round(d3.max(dataset) * 1.2)]);

        svg.selectAll("rect")
            .data(dataset)
            .transition()
                .delay(transition_delay)
                .duration(transition_dur)
                .ease(ease_type)
            .each("start", function() {
                d3.select(this)
                    .attr("fill", "magenta")
            })
            .attr("y", function(d) {
                return yScale(d);
            })
            .attr("height", function(d) {
                return hScale(d);
            })
            .transition()
            .duration(transition_dur)
            .attr("fill", function(d) {
                return "rgb(0, 0, " + Math.round((d / d3.max(dataset)) * 255) + ")";
            });

        svg.selectAll("text")
            .data(dataset)
            .transition()
                .delay(transition_delay)
                .duration(transition_dur)
                .ease(ease_type)
            .text(function (d) {
                return Math.round(d);
            })
            .attr("x", function(d, i) {
                return xScale(i) + 7
            })
            .attr("y", function(d) {
                return yScale(d) + 15
            });
    });

d3.select("#adddata-text")
    .on("click", function() {
        dataset.push(Math.random()*DATA_MAX);
        xScale.domain(d3.range(dataset.length));

        var bars = svg.selectAll("rect").data(dataset);

        addBars(bars);

        // bars.enter()
        //     .append("rect")
        //     .attr("x", w)
        //     .attr("y", function(d) {
        //         return yScale(d)
        //     })
        //     .attr("width", xScale.rangeBand())
        //     .attr("height", function(d) {
        //         return hScale(d)
        //     })
        //     .attr("fill", function (d){
        //         return "rgb(0, 0, " + Math.round((d / d3.max(dataset)) * 255) + ")";
        //     })
        //     .on("click", function(d) {
        //         console.log(d);
        //     });

        var labels = svg.selectAll(".bar-label").data(dataset);

        labels.enter()
            .append("text")
            .text(function (d) {
                return Math.round(d);
            })
            .attr("class", "bar-label")
            .attr("x", function() {
                return w + 7
            })
            .attr("y", function(d) {
                return yScale(d) + 15
            });

        bars.transition()
            .duration(500)
            .attr("x", function(d, i) {
                return xScale(i);
            });

        labels.transition()
            .duration(500)
            .attr("x", function(d, i) {
                return xScale(i) + 7
            });
    });

d3.select("#removedata-text")
    .on("click", function() {
        dataset.shift();
        xScale.domain(d3.range(dataset.length));

        var bars = svg.selectAll("rect").data(dataset);

        bars.exit()
            .transition()
            .duration(500)
            .attr("x", function() {
                return w;
            })
            .remove();

        bars.transition()
            .duration(500)
            .attr("x", function(d, i) {
                return xScale(i);
            });

        var labels = svg.selectAll(".bar-label").data(dataset);

        labels.exit()
            .transition()
            .duration(500)
            .attr("x", function(d, i) {
                return w;
            })
            .remove();

        labels.transition()
            .duration(500)
            .attr("x", function(d, i) {
                return xScale(i) + 7;
            });
    });
