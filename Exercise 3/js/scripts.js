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
    links.forEach(link => link.classList.remove('active'));
    document.querySelector(`a[data-page="${page}"]`).classList.add('active');
}

setPage('home');

links.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        setPage(link.dataset.page);
    });
});

logo.addEventListener('click', () => setPage('home'));