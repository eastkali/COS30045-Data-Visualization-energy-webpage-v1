d3.csv("data/Ex5_TV_energy_55inchtv_byScreenType.csv").then(data => {
    const valueKey = "Mean(Labelled energy consumption (kWh/year))";
    data.forEach(d => d.value = +d[valueKey]);

    const container = d3.select("#bar-chart-container");
    const margin = {top: 20, right: 20, bottom: 40, left: 50};
    const width = 500 - margin.left - margin.right;
    const height = 350 - margin.top - margin.bottom;

    const svg = container.append("svg")
        .attr("viewBox", `0 0 500 350`)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const xScale = d3.scaleBand()
        .domain(data.map(d => d.Screen_Tech))
        .range([0, width])
        .padding(0.3);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value)])
        .range([height, 0]);

    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale));

    svg.append("g").call(d3.axisLeft(yScale));

    svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", d => xScale(d.Screen_Tech))
        .attr("y", d => yScale(d.value))
        .attr("width", xScale.bandwidth())
        .attr("height", d => height - yScale(d.value))
        .attr("fill", "#1565c0");
});