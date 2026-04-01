# Appliance Energy Website - Project Documentation

## Project Overview
This website provides Australian households with essential data regarding appliance energy consumption. It features a dynamic single-page architecture (SPA) that allows users to navigate between Home, Televisions, and About sections without page reloads.

## GenAI Acknowledgement & Reflection
While the core logic, HTML structure, and CSS styling were developed manually, Generative AI was used as a supplementary tool during the development process.

### AI Usage Notes
* **Syntax Reference:** Used AI to quickly recall the specific CSS syntax for `flexbox` alignment and `active` state transitions.
* **Content Refining:** Used AI to verify average Australian energy benchmarks (e.g., the 18 kWh/day figure) to ensure the placeholder data was realistic.
* **Code Review:** Consulted AI to ensure the JavaScript `setPage` function was the most efficient way to handle the DOM manipulation for this scale.

### Reflection
My experience using AI for this project was centered on efficiency rather than creation. I found it most helpful for "sanity-checking" my code and skipping the search for basic syntax documentation. 

The most challenging part of the project was managing the state of the navigation links (the `.active` class) when the logo is clicked versus the nav links. While the AI provided a quick template for the event listeners, I had to manually debug the logic to ensure the UI stayed in sync. Overall, using AI as a "junior assistant" allowed me to focus more on the UI/UX design and data accuracy for the Australian market rather than getting bogged down in repetitive boilerplate code. 