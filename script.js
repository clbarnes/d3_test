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
        out[0].push({ind: index, val: element.apples});
        out[1].push({ind: index, val: element.oranges});
        out[2].push({ind: index, val: element.grapes});
    });
    return out;
};

var stacks = data2stacks(dataset);