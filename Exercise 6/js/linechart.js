window.initExercise5LineChart = function() {
    const containerId = "#ex5-linechart";
    const containerNode = d3.select(containerId).node();
    if (!containerNode) return;

    d3.select(containerId).selectAll("*").remove();

    const width = containerNode.getBoundingClientRect().width || 800;
    const height = 420; 
    const margin = { top: 30, right: 140, bottom: 40, left: 65 };

    const svg = d3.select(containerId)
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("preserveAspectRatio", "xMinYMin meet");

    d3.csv("data/Ex5_ARE_Spot_Prices.csv").then(data => {
        data.forEach(d => { d.yearClean = +d.Year; });
        const cleanedData = data.filter(d => !isNaN(d.yearClean));

        const states = [
            { name: "Queensland", field: "Queensland ($ per megawatt hour)", color: "#de2d26" },
            { name: "New South Wales", field: "New South Wales ($ per megawatt hour)", color: "#3182bd" },
            { name: "Victoria", field: "Victoria ($ per megawatt hour)", color: "#31a354" },
            { name: "South Australia", field: "South Australia ($ per megawatt hour)", color: "#756bb1" }
        ];

        const xScale = d3.scaleLinear()
            .domain(d3.extent(cleanedData, d => d.yearClean))
            .range([margin.left, width - margin.right]);

        let maxVal = 0;
        states.forEach(s => {
            const highValue = d3.max(cleanedData, d => +d[s.field]);
            if (highValue > maxVal) maxVal = highValue;
        });

        const yScale = d3.scaleLinear()
            .domain([0, maxVal * 1.05])
            .range([height - margin.bottom, margin.top]);

        svg.append("g")
            .attr("transform", `translate(0, ${height - margin.bottom})`)
            .call(d3.axisBottom(xScale).tickFormat(d3.format("d")));

        svg.append("g")
            .attr("transform", `translate(${margin.left}, 0)`)
            .call(d3.axisLeft(yScale));

        states.forEach(s => {
            const lineGenerator = d3.line()
                .defined(d => !isNaN(+d[s.field]) && d[s.field] !== "")
                .x(d => xScale(d.yearClean))
                .y(d => yScale(+d[s.field]));

            svg.append("path")
                .datum(cleanedData)
                .attr("fill", "none")
                .attr("stroke", s.color)
                .attr("stroke-width", 2.5)
                .attr("d", lineGenerator);

            const lastPoint = cleanedData.filter(d => !isNaN(+d[s.field])).pop();
            if (lastPoint) {
                svg.append("text")
                    .attr("x", xScale(lastPoint.yearClean) + 6)
                    .attr("y", yScale(+lastPoint[s.field]) + 4)
                    .style("fill", s.color)
                    .style("font-size", "11px")
                    .style("font-weight", "bold")
                    .text(s.name);
            }
        });
    });
};