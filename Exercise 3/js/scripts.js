const pages = {
    home: `
        <h1>Appliance Energy Consumption</h1>
        <p>Australian households consume electricity from many appliances, including refrigerators, washing machines, TVs, and lighting. 
        Understanding energy usage helps reduce costs and environmental impact.</p>
        <div class="info-card">
            <h3>Quick Facts</h3>
            <ul>
                <li>Average household electricity usage: ~18 kWh/day</li>
                <li>Energy efficiency labels guide appliance selection</li>
                <li>Reducing standby power saves energy</li>
            </ul>
        </div>
    `,
    tv: `
        <h1>Television Energy Consumption</h1>
        <p>Televisions are a staple of Australian entertainment. However, energy use varies significantly based on technology and size.</p>
        
        <div class="tv-grid">
            <div class="tv-card">
                <h3>LED / LCD</h3>
                <p class="wattage">30 - 100 Watts</p>
                <p>Highly efficient and the current standard for most Australian homes.</p>
                <div class="stars">
                    <span>Efficiency:</span> ★★★★★
                </div>
            </div>
            <div class="tv-card">
                <h3>OLED / QLED</h3>
                <p class="wattage">80 - 150 Watts</p>
                <p>Better contrast but slightly higher power draw than standard LEDs.</p>
                <div class="stars">
                    <span>Efficiency:</span> ★★★★☆
                </div>
            </div>
            <div class="tv-card legacy">
                <h3>Plasma (Legacy)</h3>
                <p class="wattage">150 - 400 Watts</p>
                <p>Older technology with very high consumption. Consider upgrading to save energy.</p>
                <div class="stars">
                    <span>Efficiency:</span> ★★☆☆☆
                </div>
            </div>
        </div>

        <div class="pro-tip">
            <strong>Pro Tip:</strong> Look for the <em>Energy Rating Label</em>. Every extra star can save you around 20% in running costs!
        </div>
    `,
   story: `
        <div class="story-header" style="text-align: center; margin-bottom: 30px;">
            <p style="color: #ff6600; font-weight: bold; letter-spacing: 1px;">DATA STORY</p>
            <h1>Tech & Size: The DNA of Energy Drain</h1>
        </div>

        <section class="story-section">
            <h2>The Efficiency Champion</h2>
            <p><strong>The Issue:</strong> With so many display types—LED, OLED, Plasma, and LCD—which one actually consumes the least power? We analyzed the average wattage across all technologies to find the winner.</p>
            
            <div class="visualisation-container" style="background: #fff; padding: 20px; border: 1px solid #eee; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); margin: 20px 0; text-align: center;">
                <img src="images/PowerComparisson.png" alt="Technology Power Comparison" style="max-width: 100%; border-radius: 8px;">
                <p style="font-size: 0.85rem; color: #777; font-style: italic; margin-top: 10px;">Figure 1: Comparison of average power consumption across different screen technologies.</p>
            </div>

            <div class="info-card">
                <h3>The Winner: LED/LCD</h3>
                <p>Our findings confirm that <strong>LED-LCD technology</strong> remains the champion of low power consumption. While OLED offers stunning blacks, the efficiency of LED backlighting is currently unbeatable for the budget-conscious consumer.</p>
            </div>
        </section>

        <hr style="margin: 50px 0; border: 0; border-top: 1px dashed #ddd;">

        <section class="story-section">
            <h2>Size vs. Reality</h2>
            <p><strong>The Demonstration:</strong> As we chase the "Home Cinema" experience, how much extra energy are we really using? We mapped screen size against power use to see the cost of those extra inches.</p>

            <div class="visualisation-container" style="background: #fff; padding: 20px; border: 1px solid #eee; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); margin: 20px 0; text-align: center;">
                <img src="images/ScatterPlot.png" alt="Screen Size vs Power Usage" style="max-width: 100%; border-radius: 8px;">
                <p style="font-size: 0.85rem; color: #777; font-style: italic; margin-top: 10px;">Figure 2: Scatter plot highlighting the positive correlation between panel size and energy draw.</p>
            </div>

            <div class="pro-tip">
                <h3>The Recommendation</h3>
                <p>There is no escaping physics: bigger screens require more power. However, the <strong>"Efficiency Spread"</strong> in our scatter plot shows that if you must go big, choosing a 6-star rated 75-inch model can actually use less power than a 3-star 55-inch model!</p>
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

const contentDiv = document.getElementById('content');
const links = document.querySelectorAll('nav ul li a');
const logo = document.getElementById('logo');

function setPage(page) {
    contentDiv.innerHTML = pages[page];
    links.forEach(link => {
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
logo.addEventListener('click', () => setPage('home'));