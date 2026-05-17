window.initEnergyBarChart = function() {
    console.log("D3 layout initializing...");

    const container = d3.select(".responsive-svg-container");
    container.selectAll("*").remove();

    d3.csv("data/tvBrandCount.csv", d => {
        return {
            brand: d.Brand_Reg, 
            count: +d['Mean(Avg_mode_power)']
        };
    }).then(data => {
        const cleanedData = data.filter(d => d.brand && !isNaN(d.count) && d.count > 0);

        console.log("==== EXERCISE 4.4 KNIME SUMMARY LOADING LOGS ====");
        console.log("JavaScript Objects Array:", cleanedData);
        console.log("Total Number of Summary Records:", cleanedData.length);
        console.log("Maximum Summary Value:", d3.max(cleanedData, d => d.count));
        console.log("Minimum Summary Value:", d3.min(cleanedData, d => d.count));
        console.log("Data Min/Max Extent Range:", d3.extent(cleanedData, d => d.count));

        // Sort the data in descending order
        cleanedData.sort((a, b) => b.count - a.count);

        createBarChart(cleanedData, container);
    }).catch(error => {
        console.error("D3 Data Fetch Error: Check your folder path or summary file content!", error);
    });
};

const createBarChart = (data, container) => {
    const svg = container.append("svg")
        .attr("viewBox", "0 0 1200 800")
        .style("border", "2px solid #222222")
        .style("background-color", "#ffffff")
        .style("margin-top", "15px");

    /*
    svg.append("rect")
        .attr("x", 20)
        .attr("y", 20)
        .attr("width", 414)
        .attr("height", 20)
        .attr("fill", "blue");
    */

    svg.append("text")
        .attr("x", 600)
        .attr("y", 35)
        .attr("text-anchor", "middle")
        .style("fill", "#2e7d32")
        .style("font-weight", "bold")
        .style("font-size", "1.2rem")
        .text(`Extracted ${data.length} chart rows.`);

    const barHeight = 25;
    const barGap = 8;
    const leftMargin = 50;
    const topMargin = 70;

    svg.selectAll(".brand-bar")
        .data(data)
        .join("rect")
        .attr("class", d => {
            console.log("Binding DOM element for row:", d);
            return `bar bar-${Math.round(d.count)}`;
        })
        .attr("x", leftMargin)
        .attr("y", (d, i) => {
            return topMargin + (i * (barHeight + barGap));
        })
        .attr("width", d => d.count * 4)
        .attr("height", barHeight)
        .attr("fill", "#ff6600")
        .attr("stroke", "#cc5200")
        .attr("stroke-width", "1px");
};