

d3.json("https://gist.githubusercontent.com/josejbocanegra/000e838b77c6ec8e5d5792229c1cdbd0/raw/83cd9161e28e308ef8c5363e217bad2b6166f21a/countries.json")
.then(data =>{
    return data.map((d) => {
        d.purchasingpower = +d.purchasingpower;
        d.lifeexpectancy = +d.lifeexpectancy;
        d.population = +d.population;
        return d;
    }); 
})
.then((data) => {
    var svg = d3.select("#canvas")
  .append("svg")
  .attr("width", 300)
  .attr("height", 200);

var xScale = d3.scaleLinear()
  .domain([0, d3.max(data, function(d) { return d.purchasingpower; })])
  .range([0, 300]);

var barWidth = xScale.domain()[1]/data.length;

var yScale = d3.scaleLinear()
  .domain([0, d3.max(data, function(d) { return d.lifeexpectancy; })])
  .range([200, 0]);

var bars = svg.selectAll(".bars")
  .data(data)
  .enter()
  .append("rect");

bars.attr("x", function(d){ return xScale(d.purchasingpower)})
  .attr("y", function(d){ return yScale(d.lifeexpectancy)})
  .attr("width", function(d,i){ return xScale(barWidth) * 0.9})
  .attr("height", function(d){ return 200 - yScale(d.lifeexpectancy)});

});
