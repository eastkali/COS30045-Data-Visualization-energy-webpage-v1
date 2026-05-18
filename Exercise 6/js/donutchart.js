window.initExercise5DonutChart = function() {
    const containerId = "#ex5-donutchart";
    const containerNode = d3.select(containerId).node();
    if (!containerNode) return;

    d3.select(containerId).selectAll("*").remove();

    const width = containerNode.getBoundingClientRect().width || 400;
    const height = 360; 
    const radius = Math.min(width, height) / 2 - 40;

    const svg = d3.select(containerId)
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

    d3.csv("data/Ex5_TV_energy_Allsizes_byScreenType.csv").then(data => {
        data.forEach(d => { 
            d.value = +d["Mean(Labelled energy consumption (kWh/year))"];
            d.type = d.Screen_Tech;
        });

        // calculate the total sum of all values
        const totalEnergySum = d3.sum(data, d => d.value);

        const color = d3.scaleOrdinal() 
            .domain(data.map(d => d.type))
            .range(["#ffa366", "#ff6600", "#b34700"]);

        const pie = d3.pie().value(d => d.value).sort(null);
    
        const arc = d3.arc().innerRadius(radius * 0.52).outerRadius(radius);

        const labelArc = d3.arc().innerRadius(radius * 0.74).outerRadius(radius * 0.74);

        const arcs = svg.selectAll(".arc")
            .data(pie(data))
            .enter()
            .append("g")
            .attr("class", "arc");

        arcs.append("path")
            .attr("d", arc)
            .attr("fill", d => color(d.data.type))
            .attr("stroke", "#ffffff")
            .style("stroke-width", "2px");

        // append the computed percentage texts inside the slices
        arcs.append("text")
            .attr("transform", d => `translate(${labelArc.centroid(d)})`)
            .attr("text-anchor", "middle")
            .text(d => {
                const percentage = (d.data.value / totalEnergySum) * 100;
                return `${percentage.toFixed(1)}%`;
            })
            .style("font-family", "sans-serif")
            .style("font-size", "13px")
            .style("font-weight", "bold")
            .style("fill", "#ffffff");

    }).catch(error => {
        console.error("D3 Error loading donut data:", error);
    });
};