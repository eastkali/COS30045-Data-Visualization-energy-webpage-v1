window.drawHistogram = function(data, container) {
    const boundedWidth = ex6Dimensions.width - ex6Dimensions.margin.left - ex6Dimensions.margin.right;
    const boundedHeight = ex6Dimensions.height - ex6Dimensions.margin.top - ex6Dimensions.margin.bottom;

    // append vector
    const svg = container.append("svg")
        .attr("viewBox", `0 0 ${ex6Dimensions.width} ${ex6Dimensions.height}`)
        .style("width", "100%")
        .style("height", "100%");

    const bounds = svg.append("g")
        .style("transform", `translate(${ex6Dimensions.margin.left}px, ${ex6Dimensions.margin.top}px)`);

    // capped at 1,800
    const xScale = d3.scaleLinear()
        .domain([0, 1800]) 
        .range([0, boundedWidth]);

    const binGenerator = d3.bin()
        .value(d => d.energyConsumption)
        .domain(xScale.domain())
        .thresholds(9);

    const bins = binGenerator(data);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(bins, d => d.length)])
        .range([boundedHeight, 0])
        .nice();

    const binsGroup = bounds.append("g")
        .attr("class", "bins")
        .attr("shape-rendering", "crispEdges"); 

    binsGroup.selectAll("rect")
        .data(bins)
        .join("rect")
        // remove gap
        .attr("x", d => xScale(d.x0)) 
        .attr("width", d => Math.max(0, xScale(d.x1) - xScale(d.x0))) 
        .attr("y", d => yScale(d.length))
        .attr("height", d => boundedHeight - yScale(d.length))
        .attr("fill", ex6Colors.barFill);

    const xAxisGenerator = d3.axisBottom(xScale);
    bounds.append("g")
        .style("transform", `translateY(${boundedHeight}px)`)
        .call(xAxisGenerator)
        .append("text")
        .attr("class", "axis-label")
        .attr("x", boundedWidth / 2)
        .attr("y", 40)
        .text("Energy Consumption (Watts)");

    const yAxisGenerator = d3.axisLeft(yScale);
    const yAxis = bounds.append("g")
        .attr("class", "y-axis")
        .call(yAxisGenerator);

    yAxis.append("text")
        .attr("class", "axis-label")
        .attr("x", -boundedHeight / 2)
        .attr("y", -45)
        .style("transform", "rotate(-90deg)")
        .style("text-anchor", "middle")
        .text("Frequency of TVs");

    container.node()._chartConfig = { 
        xScale, 
        yScale, 
        boundedHeight, 
        binsGroup, 
        yAxisGenerator, 
        yAxis, 
        binGenerator 
    };
};