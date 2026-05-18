window.initExercise5ScatterPlot = function() {
    const containerId = "#ex5-scatterplot";
    const containerNode = d3.select(containerId).node();
    if (!containerNode) return; // exit function if container does not exist in DOM
    
    d3.select(containerId).selectAll("*").remove(); // clear any existing SVG content before redrawing

    const width = containerNode.getBoundingClientRect().width || 600;
    const height = 400; 
    const margin = { top: 25, right: 30, bottom: 50, left: 65 };

    const svg = d3.select(containerId)
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("preserveAspectRatio", "xMinYMin meet");

    d3.csv("data/Ex5_TV_energy.csv").then(data => {
        data.forEach(d => {
            d.star = +d.star2;
            d.energy = +d.energy_consumpt;
            d.size = +d.screensize;
        });

        // remove invalid rows
        const cleanedData = data.filter(d => !isNaN(d.star) && !isNaN(d.energy));

        const xScale = d3.scaleLinear()
            .domain([0, d3.max(cleanedData, d => d.star) + 0.5])
            .range([margin.left, width - margin.right]);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(cleanedData, d => d.energy) * 1.05])
            .range([height - margin.bottom, margin.top]);

        svg.append("g")
            .attr("transform", `translate(0, ${height - margin.bottom})`)
            .call(d3.axisBottom(xScale).ticks(8));

        svg.append("g")
            .attr("transform", `translate(${margin.left}, 0)`)
            .call(d3.axisLeft(yScale));

        svg.selectAll("circle")
            .data(cleanedData)
            .enter()
            .append("circle")
            .attr("cx", d => xScale(d.star))
            .attr("cy", d => yScale(d.energy))
            .attr("r", d => Math.max(4, d.size / 14)) // size based on screen size
            .attr("fill", "#ff6600")
            .attr("opacity", 0.65)
            .attr("stroke", "#cc5200");

        svg.append("text")
            .attr("x", width / 2 + margin.left / 2)
            .attr("y", height - 10)
            .attr("text-anchor", "middle")
            .style("font-size", "12px")
            .style("font-weight", "600")
            .text("Star Rating Metric Value");

        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -height / 2)
            .attr("y", 20)
            .attr("text-anchor", "middle")
            .style("font-size", "12px")
            .style("font-weight", "600")
            .text("Labelled Energy Demand (kWh/year)");
    });
};