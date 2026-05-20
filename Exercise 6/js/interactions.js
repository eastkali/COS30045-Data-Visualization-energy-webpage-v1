window.populateFilters = function(data, container) {
    const filtersDiv = d3.select("#filters");

    filtersDiv.selectAll(".filter-btn")
        .data(filters_screen)
        .join("button")
        .attr("class", d => `filter-btn story-btn ${d.isActive ? "active" : ""}`)
        .text(d => d.label)
        .on("click", function(event, d) {

            filtersDiv.selectAll(".filter-btn").classed("active", false);
            d3.select(this).classed("active", true);

            filters_screen.forEach(f => f.isActive = false);
            d.isActive = true;

            updateHistogram(d.id, data, container);
        });
};

function updateHistogram(filterId, fullData, container) {
    const config = container.node()._chartConfig;
    if (!config) return;

    const updatedData = filterId === "all"
        ? fullData
        : fullData.filter(d => d.screenTech === filterId);

    // outliers beyond 1,800 are automatically excluded
    const updatedBins = config.binGenerator(updatedData);

    config.yScale.domain([0, d3.max(updatedBins, d => d.length)]).nice();

    config.yAxis.transition()
        .duration(600)
        .call(config.yAxisGenerator);

    config.binsGroup.selectAll("rect")
        .data(updatedBins)
        .join("rect")
        .transition()
        .duration(600)
        // ensure animated bars without spacing gaps
        .attr("x", d => config.xScale(d.x0))
        .attr("width", d => Math.max(0, config.xScale(d.x1) - config.xScale(d.x0)))
        .attr("y", d => config.yScale(d.length))
        .attr("height", d => config.boundedHeight - config.yScale(d.length));
}

//tooltip generation
window.createTooltip = function() {
    // append a new tool tip group element to the scatterplots innerChartS
    const tooltip = innerChartS.append("g")
        .attr("class", "scatterplot-tooltip")
        .style("opacity", 0) // Hidden by default using style
        .style("pointer-events", "none");

    tooltip.append("rect")
        .attr("width", tooltipDimensions.width)
        .attr("height", tooltipDimensions.height)
        .attr("rx", 5)
        .attr("ry", 5)
        .attr("fill", ex6Colors.barFill)
        .attr("opacity", 0.85);

    tooltip.append("text")
        .attr("x", tooltipDimensions.width / 2)
        .attr("y", tooltipDimensions.height / 2)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("fill", ex6Colors.bg)
        .style("font-size", "12px")
        .style("font-family", "sans-serif");
};

window.handleMouseEvents = function() {
    // append structural mouse listener responses
    innerChartS.selectAll("circle")
        .on("mouseenter", function(e, d) {
            console.log("mouseenter event triggered:", e);
            console.log("data bound to circle element:", d);

            const circle = d3.select(this);
            const cx = parseFloat(circle.attr("cx"));
            const cy = parseFloat(circle.attr("cy"));

            const tooltip = innerChartS.select(".scatterplot-tooltip");
            
            tooltip.select("text")
                .text(`Size: ${d.screenSize} inches`);

            tooltip.transition()
                .duration(200)
                .style("opacity", 1)
                .attr("transform", `translate(${cx - tooltipDimensions.width / 2}, ${cy - tooltipDimensions.height - 10})`);
        })
        .on("mouseleave", function(e, d) {
            console.log("mouseleave event triggered:", e);

            innerChartS.select(".scatterplot-tooltip")
                .transition()
                .duration(200)
                .style("opacity", 0)
                .attr("transform", "translate(-9999, -9999)");
        });
};