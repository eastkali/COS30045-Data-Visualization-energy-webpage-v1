window.initEnergyBarChart = function() {
    console.log("D3 layout initializing...");

    const container = d3.select(".responsive-svg-container");
    container.selectAll("*").remove();

    const svg = container.append("svg")
        .attr("viewBox", "0 0 1200 400")
        .style("border", "2px solid #222222")
        .style("background-color", "#ffffff")
        .style("margin-top", "15px");

    svg.append("rect")
        .attr("x", 20)
        .attr("y", 20)
        .attr("width", 414)
        .attr("height", 20)
        .attr("fill", "blue");
};