window.loadEx6Data = function() {
    return d3.csv("data/Ex6_TVdata.csv", d => {
        return {
            brand: d.brand,
            model: d.model,
            screenTech: d.screenTech,
            energyConsumption: +d.energyConsumption,
            screenSize: +d.screenSize
        };
    });
};

window.initEx6Histogram = function() {
    const container = d3.select("#ex6-histogram-container");
    container.selectAll("*").remove();
    d3.select("#filters").selectAll("*").remove();

    window.loadEx6Data().then(data => {
        window.drawHistogram(data, container);
        window.populateFilters(data, container);
    }).catch(error => {
        console.error("D3 Data Fetch Error: Could not parse Ex6_TVdata.csv", error);
    });
};