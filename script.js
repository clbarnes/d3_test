var DATA_LEN = 4;
var DATA_MAX = 50;

var w = 600;
var h = 250;

var transition_dur = 150;
var transition_delay = function (d, i) {
    return i*(transition_dur/2)
};
var ease_type = "cubic-in-out";

var mk_data = function(l) {
    var out = [];
    for (var i = 0; i < l; i++) {
        out.push({key: i, value: Math.round(Math.random()*DATA_MAX)})
    }
    return out;
};

var key = function (d) {
    return d.key
};

var keyMax = function (arr){
    return d3.max(arr, function (d) { return d.key })
};

var valueMax = function (arr){
    return d3.max(arr, function (d) { return d.value })
};

var dataset = mk_data(DATA_LEN);

var svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

var yScale = d3.scale.linear()
    .domain([0, Math.round(valueMax(dataset) * 1.2)])
    .rangeRound([h, 0]);

var xScale = d3.scale.ordinal()
    .domain(d3.range(dataset.length))
    .rangeRoundBands([0, w], 0.05);

var hScale = d3.scale.linear()
    .domain([0, Math.round(valueMax(dataset) * 1.2)])
    .rangeRound([0, h]);

svg.selectAll("rect")
    .data(dataset, key)
    .enter()
    .append("rect")
    .attr("x", function(d, i) {
        return xScale(i)
    })
    .attr("width", xScale.rangeBand())
    .attr("y", function(d) {
        return yScale(d.value)
    })
    .attr("height", function(d) {
        return hScale(d.value)
    })
    .attr("fill", function (d){
        return "rgb(0, 0, " + Math.round((d.value / valueMax(dataset)) * 255) + ")";
    });

svg.selectAll("text")
    .data(dataset, key)
    .enter()
    .append("text")
    .text(function (d) {
        return Math.round(d.value);
    })
    .attr("class", "bar-label")
    .attr("x", function(d, i) {
        return xScale(i) + 7
    })
    .attr("y", function(d) {
        return yScale(d.value) + 15
    });


d3.select("#regenerate-text")
    .on("click", function() {
        dataset = mk_data(dataset.length);

        yScale.domain([0, Math.round(valueMax(dataset) * 1.2)]);
        hScale.domain([0, Math.round(valueMax(dataset) * 1.2)]);

        svg.selectAll("rect")
            .data(dataset, key)
            .transition()
                .delay(transition_delay)
                .duration(transition_dur)
                .ease(ease_type)
            .each("start", function() {
                d3.select(this)
                    .attr("fill", "magenta")
            })
            .attr("y", function(d) {
                return yScale(d.value);
            })
            .attr("height", function(d) {
                return hScale(d.value);
            })
            .transition()
            .duration(transition_dur)
            .attr("fill", function(d) {
                return "rgb(0, 0, " + Math.round((d.value / valueMax(dataset)) * 255) + ")";
            });

        svg.selectAll("text")
            .data(dataset, key)
            .transition()
                .delay(transition_delay)
                .duration(transition_dur)
                .ease(ease_type)
            .text(function (d) {
                return Math.round(d.value);
            })
            .attr("x", function(d, i) {
                return xScale(i) + 7
            })
            .attr("y", function(d) {
                return yScale(d.value) + 15
            });
    });

d3.select("#adddata-text")
    .on("click", function() {
        dataset.push({
            key: keyMax(dataset) + 1,
            value: Math.round(Math.random()*DATA_MAX)
        });
        xScale.domain(d3.range(dataset.length));

        var bars = svg.selectAll("rect").data(dataset, key);

        bars.enter()
            .append("rect")
            .attr("x", w)
            .attr("y", function(d) {
                return yScale(d.value)
            })
            .attr("width", function () {
                xScale.rangeBand()
            })
            .attr("height", function(d) {
                return hScale(d.value)
            })
            .attr("fill", function (d){
                return "rgb(0, 0, " + Math.round((d.value / valueMax(dataset)) * 255) + ")";
            });

        var labels = svg.selectAll(".bar-label").data(dataset, key);

        labels.enter()
            .append("text")
            .text(function (d) {
                return Math.round(d.value);
            })
            .attr("class", "bar-label")
            .attr("x", function() {
                return w + 7
            })
            .attr("y", function(d) {
                return yScale(d.value) + 15
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

        var bars = svg.selectAll("rect").data(dataset, key);

        bars.exit()
            .transition()
            .duration(500)
            .attr("x", -xScale.rangeBand())
            .remove();

        bars.transition()
            .duration(500)
            .attr("x", function(d, i) {
                return xScale(i);
            });

        var labels = svg.selectAll(".bar-label").data(dataset, key);

        labels.exit()
            .transition()
            .duration(500)
            .attr("x", -xScale.rangeBand())
            .remove();

        labels.transition()
            .duration(500)
            .attr("x", function(d, i) {
                return xScale(i) + 7;
            });
    });
