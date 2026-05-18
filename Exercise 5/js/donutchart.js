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
        data.forEach(d => { // convert values to correct data types
            d.value = +d["Mean(Labelled energy consumption (kWh/year))"];
            d.type = d.Screen_Tech;
        });

        const color = d3.scaleOrdinal() // define color scale for each screen type
            .domain(data.map(d => d.type))
            .range(["#ffa366", "#ff6600", "#b34700"]);
        const pie = d3.pie().value(d => d.value).sort(null);
        const arc = d3.arc().innerRadius(radius * 0.52).outerRadius(radius);

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

        arcs.append("text")
            .attr("transform", d => `translate(${arc.centroid(d)})`)
            .attr("text-anchor", "middle")
            .style("font-size", "11px")
            .style("fill", "#fff")
            .style("font-weight", "bold")
            .text(d => d.data.type);
    });
};