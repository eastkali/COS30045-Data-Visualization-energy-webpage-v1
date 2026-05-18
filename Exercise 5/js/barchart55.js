window.initExercise5BarChart55 = function() {
    const containerId = "#ex5-barchart55";
    const containerNode = d3.select(containerId).node();
    if (!containerNode) return;

    d3.select(containerId).selectAll("*").remove();

    const width = containerNode.getBoundingClientRect().width || 400;
    const height = 360; 
    const margin = { top: 40, right: 20, bottom: 40, left: 60 };

    const svg = d3.select(containerId)
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("preserveAspectRatio", "xMinYMin meet");

    d3.csv("data/Ex5_TV_energy_55inchtv_byScreenType.csv").then(data => {
        data.forEach(d => {
            d.value = +d["Mean(Labelled energy consumption (kWh/year))"];
            d.type = d.Screen_Tech;
        });

        // track the lowest value
        const minEnergyValue = d3.min(data, d => d.value);

        const xScale = d3.scaleBand()
            .domain(data.map(d => d.type))
            .range([margin.left, width - margin.right])
            .padding(0.45);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.value) * 1.15])
            .range([height - margin.bottom, margin.top]);

        svg.append("g")
            .attr("transform", `translate(0, ${height - margin.bottom})`)
            .call(d3.axisBottom(xScale));

        svg.append("g")
            .attr("transform", `translate(${margin.left}, 0)`)
            .call(d3.axisLeft(yScale));

        const barGroups = svg.selectAll(".bar-group")
            .data(data)
            .enter()
            .append("g")
            .attr("class", "bar-group");

        // render Bars with color
        barGroups.append("rect")
            .attr("x", d => xScale(d.type))
            .attr("y", d => yScale(d.value))
            .attr("width", xScale.bandwidth())
            .attr("height", d => height - margin.bottom - yScale(d.value))
            .attr("fill", d => d.value === minEnergyValue ? "#ff6600" : "#d1d5db") // Winner is Orange, others are Gray
            .attr("rx", 4);

        // render value annotations
        barGroups.append("text")
            .text(d => `${Math.round(d.value)} kWh`)
            .attr("x", d => xScale(d.type) + xScale.bandwidth() / 2)
            .attr("y", d => yScale(d.value) - 8)
            .attr("text-anchor", "middle")
            .style("font-family", "'Segoe UI', sans-serif")
            .style("font-size", "12px")
            .style("font-weight", d => d.value === minEnergyValue ? "bold" : "normal")
            .style("fill", d => d.value === minEnergyValue ? "#ff6600" : "#4b5563");

    }).catch(error => {
        console.error("Error reading Exercise 5 CSV:", error);
    });
};