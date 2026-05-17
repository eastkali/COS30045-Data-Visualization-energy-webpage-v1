d3.csv("data/Ex5_TV_energy_Allsizes_byScreenType.csv").then(data => {
    const valueKey = "Mean(Labelled energy consumption (kWh/year))";
    data.forEach(d => d.value = +d[valueKey]);

    const container = d3.select("#donut-chart-container");
    const width = 400, height = 350, radius = Math.min(width, height) / 2 - 20;

    const svg = container.append("svg")
        .attr("viewBox", `0 0 400 350`)
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

    const color = d3.scaleOrdinal()
        .domain(data.map(d => d.Screen_Tech))
        .range(["#ff6600", "#2e7d32", "#1565c0"]);

    const pie = d3.pie().value(d => d.value);
    
    const arc = d3.arc().innerRadius(radius * 0.45).outerRadius(radius);

    svg.selectAll("path")
        .data(pie(data))
        .enter()
        .append("path")
        .attr("d", arc)
        .attr("fill", d => color(d.data.Screen_Tech))
        .attr("stroke", "#ffffff")
        .style("stroke-width", "2px");

    // add text labels in the slices
    svg.selectAll(".arc-text")
        .data(pie(data))
        .enter()
        .append("text")
        .attr("transform", d => `translate(${arc.centroid(d)})`)
        // centers the text horizontally and vertically on that point
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .text(d => d.data.Screen_Tech)
        .style("fill", "#ffffff")
        .style("font-family", "sans-serif")
        .style("font-size", "14px")
        .style("font-weight", "bold")
        .style("pointer-events", "none"); // prevents text from blocking hover transitions
});