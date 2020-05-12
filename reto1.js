


d3.json("https://gist.githubusercontent.com/josejbocanegra/d3b9e9775ec3a646603f49bc8d3fb90f/raw/3a39300c2a2ff8644a52e22228e900251ec5880a/population.json")
.then((data) => {
  const canvas = d3.select("#canvas");

  const width = 700;
  const height = 600;
  const margin = { top: 10, left: 80, bottom: 30, right: 10 };
  const iwidth = width - margin.left - margin.right;
  const iheight = height - margin.top - margin.bottom;

  const svg = canvas.append("svg");
  svg.attr("width", width);
  svg.attr("height", height);

  data.forEach(function(d) {
    d.value = +d.value;
  });

  let g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

  var x = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value)])
    .range([0, iwidth]);

  var y = d3.scaleBand()
    .domain(data.map(function(d) { return d.name; }))
    .range([iheight, 0])
    .padding(0.1);

  g.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + iheight + ")")
    .call(d3.axisBottom(x));

  g.append("g")
    .attr("class", "axis axis--y")
    .call(d3.axisLeft(y))

  g.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")
    //.attr("x", function (d) { return x(d.value); })
    .attr("y", function (d) { return y(d.name); })
    .attr("width", function (d) { return x(d.value); })
    .attr("height", y.bandwidth());
})
  .catch((error) => {
    throw error;
  });

