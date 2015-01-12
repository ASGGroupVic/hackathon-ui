(function() {

  var app = angular.module('clientXray.graph');

  app.factory("Grapher", function(){
    var factory = {};

    factory.createGraph = function(data) {
        // Remove graph is one already exists
        d3.select("svg").remove();

        // Defines a sort order so that the smallest dots are drawn on top.
        function order(a, b) {
          return radius(b) - radius(a);
        }

        function x(d) { return new Date(d.year, d.month, 1); }
        //function y(d) { return d.lifeExpectancy; }
        function y(d) { return d.mood; }
        //function radius(d) { return d.population; }
        function radius(d) { return d.count * 8; }
        //function color(d) { return d.region; }
        function color(d) { return d.mood; }
        //function key(d) { return d.name; }
        function getDate(d) {
            return x(d);
        }

        // Positions the dots based on data.
        function position(dot) {
          dot.attr("cx", function(d) { return xScale(x(d)); })
              .attr("cy", function(d) { return yScale(y(d)); })
              .attr("r", function(d) { return radius(d); });
        }
        var minDate = getDate(data[0]),
          maxDate = getDate(data[data.length-1]);

        // Chart dimensions.
        var margin = {top: 19.5, right: 19.5, bottom: 19.5, left: 69.5},
            width = 900 - margin.right,
            height = 500 - margin.top - margin.bottom;

        // Various scales. These domains make assumptions of data, naturally.
        var xScale = d3.time.scale().domain([minDate, maxDate]).range([width*.01, width*.9]),
            yScale = d3.scale.ordinal().domain(["","happy","indifferent", "bored","postal"]).range([height*.99, height*.8, height*.6, height*.4, height*.2]),
            colorScale = d3.scale.ordinal().domain(["indifferent", "bored", "happy","postal"]).range(["yellow","orange","green","red"]);

        // The x & y axes.
        var xAxis = d3.svg.axis().orient("bottom").scale(xScale).tickFormat(d3.time.format("%b-%y")),
            yAxis = d3.svg.axis().scale(yScale).orient("left");

        // Create the SVG container and set the origin.
        var svg = d3.select("#chart").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // Add the x-axis.
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        // Add the y-axis.
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);

        // Add an x-axis label.
        svg.append("text")
            .attr("class", "x label")
            .attr("text-anchor", "end")
            .attr("x", width*.9)
            .attr("y", height - 6)
            .text("Date");

        // Add a y-axis label.
        svg.append("text")
            .attr("class", "y label")
            .attr("text-anchor", "end")
            .attr("y", 6)
            .attr("x",-100)
            .attr("dy", ".75em")
            .attr("transform", "rotate(-90)")
            .text("Insanity Meter");

        // Add a dot per record
        var dot = svg.append("g")
            .attr("class", "dots")
          .selectAll(".dot")
            .data(data)
          .enter().append("circle")
            .attr("class", "dot")
            .style("fill", function(d) { return colorScale(color(d)); })
            .call(position)
            .sort(order);

        // Add a title.
        dot.append("title")
            .text(function(d) { return d.name; });
    };
      
    return factory;
    
  });

})();