const pages = {
    home: `
        <h1>Appliance Energy Consumption</h1>
        <p>Australian households consume electricity from many appliances, including refrigerators, washing machines, TVs, and lighting. Understanding energy usage helps reduce costs and environmental impact.</p>
        
        <div class="info-card">
            <h3>Quick Facts</h3>
            <ul>
                <li>Average household electricity usage: ~18 kWh/day</li>
                <li>Energy efficiency labels guide appliance selection</li>
                <li>Reducing standby power saves energy</li>
            </ul>
        </div>

        <div class="story-teaser" style="background: #fdf2e9; border: 1px solid #ff6600; padding: 25px; border-radius: 12px; margin-top: 30px;">
            <h2 style="color: #ff6600; margin-top: 0; border: none;">Explore the Data Story</h2>
            <p>Are those extra screen inches costing you more than you think? We’ve analyzed the "DNA of Energy Drain" to find out which technologies are champions of efficiency and which are legacy offenders.</p>
            <ul style="margin-bottom: 20px;">
                <li><strong>The Tech Gap:</strong> Discover the 312% power difference between display types.</li>
                <li><strong>Size vs. Reality:</strong> See how a 75-inch screen can sometimes beat a 55-inch in efficiency.</li>
            </ul>
            <a href="#" onclick="setPage('story')" style="display: inline-block; background: #ff6600; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; transition: background 0.3s;">View Storyboard →</a>
        </div>
    `,
    tv: `
        <h1>Television Energy Consumption</h1>
        <p>Televisions are a staple of Australian entertainment. However, energy use varies significantly based on technology and size.</p>
        <div class="tv-grid">
            <div class="tv-card">
                <h3 style="color: #ff6600;">LED / LCD</h3>
                <p class="wattage">30 - 100 Watts</p>
                <p>Highly efficient and the current standard for most Australian homes.</p>
                <div class="stars">
                    <span>EFFICIENCY:</span>
                    ★★★★★
                </div>
            </div>
            <div class="tv-card">
                <h3 style="color: #ff6600;">OLED / QLED</h3>
                <p class="wattage">80 - 150 Watts</p>
                <p>Better contrast but slightly higher power draw than standard LEDs.</p>
                <div class="stars">
                    <span>EFFICIENCY:</span>
                    ★★★★☆
                </div>
            </div>
            <div class="tv-card legacy">
                <h3 style="color: #ff6600;">Plasma (Legacy)</h3>
                <p class="wattage">150 - 400 Watts</p>
                <p>Older technology with very high consumption. Consider upgrading to save energy.</p>
                <div class="stars">
                    <span>EFFICIENCY:</span>
                    ★★☆☆☆
                </div>
            </div>
        </div>
        <div class="pro-tip">
            <strong>Pro Tip:</strong> Look for the <em>Energy Rating Label</em>. Every extra star can save you around 20% in running costs!
        </div>
    `,
    story: `
        <div class="story-header">
            <p class="subtitle">DATA STORY</p>
            <h1>Tech & Size: The DNA of Energy Drain</h1>
            <p style="font-size: 0.85rem; color: #888; margin-top: 5px;">(Click the image below to cycle through the data story)</p>
        </div>

        <section class="story-section">
            <div class="visualisation-container" onclick="changeStoryStep()" style="cursor: pointer;">
                <img id="storyImage" src="images/TheQuestion.png" alt="Data Visualisation">
                <p class="caption" id="storyCaption">Step 1: Analyzing display tech to find the ultimate energy-saving champion.</p>
            </div>

            <div class="info-card" id="storyInfoCard">
                <h3 id="storyInfoTitle">The Question</h3>
                <p id="storyInfoText">Which technology actually uses the least power? Our analysis shows that standard LCD technology consumes the least power at 87.029W.</p>
            </div>
        </section>

        <hr>

        <section class="story-section">
            <h2>Check Your Technology</h2>
            <p>Select your display type to see how it impacts your home's energy footprint:</p>
            <select onchange="showUserType(this.value)" style="padding: 10px; border-radius: 5px; border: 1px solid #ccc; width: 100%; max-width: 300px; cursor: pointer;">
                <option value="">Select your TV type</option>
                <option value="led">LED</option>
                <option value="lcd">LCD (Standard)</option>
                <option value="oled">OLED/QLED</option>
                <option value="plasma">Plasma</option>
            </select>
            <p id="resultText" style="margin-top:20px; font-weight: bold; color: #ff6600; min-height: 1.5em;"></p>
        </section>

        <section class="story-section">
            <h2>The Winner and the Worst Offender</h2>
            <table class="energy-table">
                <thead>
                    <tr>
                        <th>Status</th>
                        <th>Technology</th>
                        <th>Performance</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="winner-row">
                        <td>🏆 Winner</td>
                        <td><strong>LED / LCD</strong></td>
                        <td>Lowest Energy Consumption</td>
                    </tr>
                    <tr>
                        <td>Average</td>
                        <td>OLED / QLED</td>
                        <td>Moderate Energy Use</td>
                    </tr>
                    <tr class="loser-row">
                        <td>⚠️ Offender</td>
                        <td><strong>Plasma (Legacy)</strong></td>
                        <td>Highest Energy Drain</td>
                    </tr>
                </tbody>
            </table>
        </section>

        <hr>

    <div class="story-header">
            <h1>Size vs. Reality</h1>
        </div>

        <section class="story-section">
            <p><strong>The Demonstration:</strong> As we chase the "Home Cinema" experience, how much extra energy are we really using? We have mapped our dataset below. 
            <strong>Click "Step 1" to reveal the relationship between panel size and energy draw.</strong></p>

            <div class="visualisation-container">
                <div id="scatter-plot-container"></div>
                
                <div id="plot-controls" style="margin-top: 15px;">
                    <button id="revealBtn" onclick="revealPlot()" class="story-btn">Step 1: Reveal Data</button>
                    <button id="trendBtn" onclick="toggleTrend()" class="story-btn" style="display:none;">Step 2: Show Trend Line</button>
                </div>

                <div id="point-story" style="min-height: 50px; margin-top: 15px; font-weight: bold; color: #ff6600;">
                    Ready to analyze the data? Click Step 1.
                </div>
            </div>

            <div class="pro-tip">
                <h3>The Recommendation</h3>
                <p>There is no escaping physics: bigger screens generally require more power. However, the <strong>"Efficiency Spread"</strong> in the plot above reveals a critical choice for consumers: choosing a high-efficiency 75-inch model can actually use less power than an inefficient 55-inch model. <strong>Always prioritize the Star Rating over size alone.</strong></p>
            </div>
        </section>
    `,
    about: `
        <h1>About Us</h1>
        <p>This website was developed as part of the <strong>COS30045 Data Visualisation</strong> unit. Our goal is to empower Australian consumers with clear, actionable data about their home energy footprint.</p>
        <h3>Our Mission</h3>
        <p>To provide a simple interface for understanding complex energy data, helping you lower your utility bills and your carbon footprint simultaneously.</p>
    `
};

let currentStep = 0; // keeps track of current story step
const storyContent = [ // story content (image + text per step)
    {
        image: "images/TheQuestion.png",
        caption: "Step 1: Analyzing display tech to find the ultimate energy-saving champion.",
        title: "The Question",
        text: "Which technology actually uses the least power? Our analysis shows that standard LCD technology consumes the least power at 87.029W."
    },
    {
        image: "images/DataAnalysis.png",
        caption: "Step 2: Planning the Pilot Program Success.",
        title: "The Pilot Strategy",
        text: "Our analysis identified a 312% power gap between legacy Plasma and modern LCDs. The Pilot Strategy takes this 'static' data and puts it into motion by testing real-time feedback loops."
    }
];

window.changeStoryStep = function() { // change story when clicked
    currentStep = (currentStep + 1) % storyContent.length;
    // update content
    document.getElementById("storyImage").src = storyContent[currentStep].image;
    document.getElementById("storyCaption").innerText = storyContent[currentStep].caption;
    document.getElementById("storyInfoTitle").innerText = storyContent[currentStep].title;
    document.getElementById("storyInfoText").innerText = storyContent[currentStep].text;
};

// shows result based on user choice
window.showUserType = function(type) {
    const text = document.getElementById("resultText");
    if (type === "led") text.innerHTML = "⭐⭐⭐⭐⭐ Excellent efficiency! LED backlighting efficiency is currently unbeatable.";
    else if (type === "lcd") text.innerHTML = "⭐⭐⭐⭐⭐ Good efficiency. Consumes the least power at approximately 87.03W.";
    else if (type === "oled") text.innerHTML = "⭐⭐⭐⭐ Moderate use. Offers stunning blacks but uses significantly more power at 128.7W.";
    else if (type === "plasma") text.innerHTML = "⭐⭐ Highest consumption. This technology wastes more energy as heat than LEDs.";
    else text.innerHTML = "";
};

// get main content + nav links
const contentDiv = document.getElementById('content');
const links = document.querySelectorAll('nav ul li a');

// switch page content
function setPage(page) {
    contentDiv.innerHTML = pages[page];
    links.forEach(link => { // highlight active link
        link.classList.remove('active');
        if(link.getAttribute('data-page') === page) link.classList.add('active');
    });
    window.scrollTo(0,0);
}

setPage('home');
links.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        setPage(link.dataset.page);
    });
});

// data extracted from my scatter plot analysis
const tvData = [
    { size: 24, power: 25, note: "Compact & Efficient: Perfect for kitchens." },
    { size: 32, power: 45, note: "The bedroom standard: Low impact." },
    { size: 43, power: 85, note: "The sweet spot for efficiency." },
    { size: 55, power: 120, note: "The modern living room baseline." },
    { size: 55, power: 210, note: "Warning: This 55-inch model uses more than some 75-inch screens!" },
    { size: 65, power: 180, note: "Going big: Power draw begins to climb rapidly." },
    { size: 75, power: 240, note: "Home Cinema: Significant energy draw." },
    { size: 85, power: 380, note: "The Extreme: Consumes as much as a small fridge." }
    // D3 will animate these in sequence
];

window.initScatterPlot = function() {
    const margin = {top: 20, right: 20, bottom: 50, left: 60},
          width = 800 - margin.left - margin.right,
          height = 400 - margin.top - margin.bottom;

    const svg = d3.select("#scatter-plot-container")
        .append("svg")
        .attr("width", "100%")
        .attr("viewBox", `0 0 800 400`)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // scales
    const x = d3.scaleLinear().domain([0, 100]).range([0, width]);
    const y = d3.scaleLinear().domain([0, 500]).range([height, 0]);
    const color = d3.scaleLinear().domain([50, 250, 400]).range(["#2e7d32", "#ffcc00", "#c62828"]);

    // axes
    svg.append("g").attr("transform", `translate(0,${height})`).call(d3.axisBottom(x));
    svg.append("g").call(d3.axisLeft(y));

    // points so its Hidden initially
    const dots = svg.selectAll("dot")
        .data(tvData)
        .enter()
        .append("circle")
        .attr("cx", d => x(d.size))
        .attr("cy", d => y(d.power))
        .attr("r", 0) // Start size 0 for animation
        .attr("fill", d => color(d.power))
        .style("cursor", "pointer")
        .on("click", (event, d) => {
            d3.select("#point-story").html(`${d.size}" TV @ ${d.power}W: ${d.note}`);
        });

    // trend line also hidden
    const line = d3.line().x(d => x(d.size)).y(d => y(d.power)).curve(d3.curveBasis);
    svg.append("path")
        .datum(tvData)
        .attr("id", "trend-line")
        .attr("fill", "none")
        .attr("stroke", "#ff6600")
        .attr("stroke-width", 3)
        .attr("stroke-dasharray", "1000 1000")
        .attr("stroke-dashoffset", 1000)
        .attr("d", line);

    window.revealPlot = () => {
    // animate the dots
    d3.selectAll("circle")
        .transition()
        .delay((d, i) => i * 150) 
        .duration(800)
        .attr("r", d => 5 + (d.size / 10));

    document.getElementById("revealBtn").style.display = "none";
    document.getElementById("trendBtn").style.display = "inline-block";
    document.getElementById("point-story").innerText = "Data revealed! Click the trend line or explore individual dots.";
};

    window.toggleTrend = () => {
    const trendPath = d3.select("#trend-line");
    const isHidden = trendPath.attr("stroke-dashoffset") == 1000;
    
    trendPath.transition()
        .duration(1000)
        .attr("stroke-dashoffset", isHidden ? 0 : 1000);

    document.getElementById("trendBtn").innerText = isHidden ? "Hide Trend Line" : "Step 2: Show Trend Line";
    };
};

// make sure that D3 runs when page is switched to story
const originalSetPage = setPage;
setPage = function(page) {
    originalSetPage(page);
    if (page === 'story') {
        setTimeout(initScatterPlot, 100);
    }
};