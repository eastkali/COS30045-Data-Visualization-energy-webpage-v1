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
        // Filter out any rows with missing or zero values
        const cleanedData = data.filter(d => d.brand && !isNaN(d.count) && d.count > 0);

        //browser console tab array objects
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
    const svgWidth = 500;
    const svgHeight = 1600;
    const leftMargin = 110;  
    const rightMargin = 45;
    const topMargin = 70;
    const bottomMargin = 20;

    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.count)])
        .range([0, svgWidth - leftMargin - rightMargin]);

    const yScale = d3.scaleBand()
        .domain(data.map(d => d.brand))
        .range([topMargin, svgHeight - bottomMargin])
        .paddingInner(0.2);

    const svg = container.append("svg")
        .attr("viewBox", `0 0 ${svgWidth} ${svgHeight}`)
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
        .attr("x", svgWidth / 2)
        .attr("y", 35)
        .attr("text-anchor", "middle")
        .style("fill", "#2e7d32")
        .style("font-weight", "bold")
        .style("font-size", "1.2rem")
        .text(`Extracted ${data.length} chart rows.`);

    //Add an object to hold groups
    const barAndLabel = svg.selectAll("g.bar-row")
        .data(data)
        .join("g")
        .attr("class", "bar-row")
        .attr("transform", d => `translate(0, ${yScale(d.brand)})`);

    barAndLabel.append("rect")
        .attr("class", d => {
            console.log("Binding DOM group element for row:", d);
            return `bar bar-${Math.round(d.count)}`;
        })
        .attr("x", leftMargin)
        .attr("y", 0)
        .attr("width", d => xScale(d.count))
        .attr("height", yScale.bandwidth())
        .attr("fill", "#ff6600")
        .attr("stroke", "#cc5200")
        .attr("stroke-width", "1px");

    barAndLabel.append("text")
        .text(d => d.brand)
        .attr("x", leftMargin - 8)
        .attr("y", yScale.bandwidth() / 2 + 4)
        .attr("text-anchor", "end")
        .style("font-family", "sans-serif")
        .style("font-size", "11px")
        .style("fill", "#333333");

    barAndLabel.append("text")
        .text(d => Math.round(d.count))
        .attr("x", d => leftMargin + xScale(d.count) + 6)
        .attr("y", yScale.bandwidth() / 2 + 4)
        .attr("text-anchor", "start")
        .style("font-family", "sans-serif")
        .style("font-size", "10px")
        .style("font-weight", "bold")
        .style("fill", "#555555");

    /*
    svg.selectAll(".brand-bar")
        .data(data)
        .join("rect")
        .attr("class", d => { return `bar bar-${Math.round(d.count)}`; })
        .attr("x", leftMargin) 
        .attr("y", d => yScale(d.brand)) 
        .attr("width", d => xScale(d.count)) 
        .attr("height", yScale.bandwidth()) 
        .attr("fill", "#ff6600")
        .attr("stroke", "#cc5200")
        .attr("stroke-width", "1px");
    */
};