window.drawScatterplot = function(data, container) {
    const width = ex6Dimensions.width;
    const height = ex6Dimensions.height;
    const margin = ex6Dimensions.margin;

    const boundedWidth = width - margin.left - margin.right;
    const boundedHeight = height - margin.top - margin.bottom;

    const svg = container.append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", `0 0 ${width} ${height}`)
        .style("max-width", "100%")
        .style("height", "auto");

    // innerChartS assignment without re-declaration as it is defined in shared-constants
    innerChartS = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // set up linear scales for star rating
    xScaleS = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.star) || 10])
        .range([0, boundedWidth])
        .nice();

    yScaleS = d3.scaleLinear()
        .domain([0, 1800])
        .range([boundedHeight, 0])
        .nice();

    // filter out any outliers beyond 1800
    const filteredData = data.filter(d => d.energyConsumption <= 1800);

    innerChartS.selectAll("circle")
        .data(filteredData)
        .join("circle")
        .attr("cx", d => xScaleS(d.star))
        .attr("cy", d => yScaleS(d.energyConsumption))
        .attr("r", 5)
        .attr("fill", d => colorScale(d.screenTech))
        .attr("opacity", 0.5)
        .style("stroke", "none");

    innerChartS.append("g")
        .attr("transform", `translate(0, ${boundedHeight})`)
        .call(d3.axisBottom(xScaleS));

    innerChartS.append("g")
        .call(d3.axisLeft(yScaleS));

    innerChartS.append("text")
        .attr("x", boundedWidth / 2)
        .attr("y", boundedHeight + 40)
        .attr("text-anchor", "middle")
        .style("font-size", "12px")
        .style("font-family", "sans-serif")
        .text("Star Rating");

    innerChartS.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -boundedHeight / 2)
        .attr("y", -45)
        .attr("text-anchor", "middle")
        .style("font-size", "12px")
        .style("font-family", "sans-serif")
        .text("Energy Consumption (kWh/year)");

    // add color legend
    const legend = innerChartS.append("g")
        .attr("transform", `translate(${boundedWidth - 120}, 10)`);

    const categories = colorScale.domain();
    categories.forEach((category, index) => {
        const legendRow = legend.append("g")
            .attr("transform", `translate(0, ${index * 20})`);

        legendRow.append("rect")
            .attr("width", 12)
            .attr("height", 12)
            .attr("fill", colorScale(category));

        legendRow.append("text")
            .attr("x", 20)
            .attr("y", 10)
            .attr("dominant-baseline", "middle")
            .style("font-size", "12px")
            .style("font-family", "sans-serif")
            .text(category);
    });
};