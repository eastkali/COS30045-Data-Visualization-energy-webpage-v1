d3.csv("data/Ex5_TV_energy.csv").then(data => {
    data.forEach(d => {
        d.energy = +d.energy_consumpt;
        d.stars = +d.star2;
    });

    const container = d3.select("#scatter-plot-container");
    const margin = {top: 40, right: 30, bottom: 50, left: 60};
    const width = 600 - margin.left - margin.right;
    const height = 350 - margin.top - margin.bottom;

    const svg = container.append("svg")
        .attr("viewBox", `0 0 600 350`)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const xScale = d3.scaleLinear()
        .domain([1, 6])
        .range([0, width]);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.energy)])
        .range([height, 0]);

    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale).ticks(6));

    svg.append("g").call(d3.axisLeft(yScale));

    svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(d.stars))
        .attr("cy", d => yScale(d.energy))
        .attr("r", 5)
        .attr("fill", "#ff6600")
        .attr("opacity", 0.6);
});