const canvas = d3.select("#canvas");

d3.json("https://gist.githubusercontent.com/josejbocanegra/000e838b77c6ec8e5d5792229c1cdbd0/raw/83cd9161e28e308ef8c5363e217bad2b6166f21a/countries.json").then(data=>{
    return data.map((d) => {
        d.population = +d.population;
        d.lifeexpectancy = +d.lifeexpectancy;
        d.purchasingpower = +d.purchasingpower;
        return d;  
      });
}).then(data=>{
    
    const width = 700;
    const height = 500;
    const margin = { top:10, left:50, bottom: 40, right: 10};
    const iwidth = width - margin.left - margin.right;
    const iheight = height - margin.top -margin.bottom;
    
    const svg = canvas.append("svg");
    svg.attr("width", width);
    svg.attr("height", height);
    
    let g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
    
    const y = d3.scaleLinear() 
        .domain([0, d3.max(data, d => d.lifeexpectancy)])
        .range([iheight, 0]);
    
    const x = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.purchasingpower)]) 
    .range([0, iwidth]); 
    
    const circles = g.selectAll("rect").data(data);
    
    circles.enter().append('circle')
    .style("fill", "red")
    .style("opacity", 0.5)
    .attr('cy', d => y(d.lifeexpectancy))
    .attr('cx', d => x(d.purchasingpower))
    .attr('r', d => d.population/1590000); 
    
    g.append("g")
    .classed("x--axis", true)
    .call(d3.axisBottom(x))
    .attr("transform", `translate(0, ${iheight})`);  
    
    g.append("g")
    .classed("y--axis", true)
    .call(d3.axisLeft(y));
});


