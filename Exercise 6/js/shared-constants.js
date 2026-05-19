const ex6Dimensions = {
    width: 800,
    height: 450,
    margin: { top: 30, right: 30, bottom: 50, left: 60 }
};

const ex6Colors = {
    barFill: "#ff6600",
    bg: "#ffffff"
};

// initial state and definitions for filter tabs
const filters_screen = [
    { id: "all", label: "All Technologies", isActive: true },
    { id: "LCD", label: "LCD", isActive: false },
    { id: "LED", label: "LED", isActive: false },
    { id: "OLED", label: "OLED", isActive: false }
];