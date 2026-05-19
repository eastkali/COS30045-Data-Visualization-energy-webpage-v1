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