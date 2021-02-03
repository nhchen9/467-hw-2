/**
 * Main entry point -- this file has been added to index.html in a <script> tag. Add whatever code you want below.
 */
"use strict";

const weatherData = [ // Temperatures are in F; sorry metric system users.
    { // Arrays of length 12, one element for each month, starting with January.
        city: "Urbana, USA",
        averageHighByMonth: [32.9, 37.7, 49.9, 62.8, 73.4, 82.5, 85.0, 83.7, 78.2, 65.2, 50.6, 36.7]
    },
    {
        city: "London, UK",
        averageHighByMonth: [46.6, 47.1, 52.3, 57.6, 64.2, 70.2, 74.3, 73.8, 68.0, 59.9, 52.0, 46.9]
    },
    {
        city: "Cape Town, SA",
        averageHighByMonth: [79.0, 79.7, 77.7, 73.4, 68.5, 64.6, 63.5, 64.0, 66.6, 70.3, 74.3, 76.8]
    }
];

window.addEventListener("load", populateDropdown);
window.addEventListener("load", drawBarChart);
/*
 * Why this line? Because if this script runs before the svg exists, then nothing will happen, and d3 won't even
 * complain.  This delays drawing until the entire DOM has loaded.
 */
var city_ind = 0;

function drawBarChart() {
    // d3 has been added to the html in a <script> tag so referencing it here should work.
    const svg = d3.select("svg");

    const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const padding = {top:10, left:40, right:0, bottom:30};

    const xForMonth = d3.scaleBand()
        .domain(MONTHS)
        .range([padding.left, svg.attr("width") - padding.right]) // TODO
        .padding(.2); 
    
    const allTemps = weatherData.map(city => city.averageHighByMonth).flat();

    const domain_margin = 5

    const temp0 = d3.min(allTemps) - domain_margin
    const tempMax = d3.max(allTemps) + domain_margin

    const yForTemp = d3.scaleLinear()
        .domain([temp0, tempMax])
        .range([svg.attr("height") - padding.bottom, padding.top]); 

    const heightForTemp = d3.scaleLinear()
        .domain([tempMax, temp0])
        .range([svg.attr("height") - padding.bottom - padding.top, 0]); 



    svg.selectAll("rect")
    .data(weatherData[city_ind].averageHighByMonth) // (Hardcoded) only Urbana’s data
    .join("rect")
        .attr("x", (dataPoint, i) => xForMonth(MONTHS[i])) // i is dataPoint’s index in the data array
        .attr("y", (dataPoint, i) => yForTemp(dataPoint))
        .attr("width", (dataPoint, i) => xForMonth.bandwidth())
        .attr("height", (dataPoint, i) => heightForTemp(dataPoint))
        .attr("fill", "steelblue");


    svg.selectAll("g").remove()
    svg.selectAll("text").remove()
    const yTranslation = svg.attr("height") - padding.bottom
    const xTranslation = padding.left
    const xAxis = svg.append("g")
        .call(d3.axisBottom(xForMonth)) // d3 creates a bunch of elements inside the <g>
        .attr("transform", `translate(0, ${yTranslation})`); // TODO yTranslation
        
    const yAxis = svg.append("g")
        .call(d3.axisLeft(yForTemp))
        .attr("transform", `translate(${xTranslation}, 0)`); // TODO xTranslation
    /*
    svg.append("text")
        .attr("font-size", 12)
        .attr("font-weight", "bold")
        .attr("font-family", "sans-serif")
        .attr("x", svg.attr("width")/2)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "Auto")
        .attr("y", svg.attr("height"))
        .text("Month");
    */
   
    svg.append("text")
        .attr("font-size", 12)
        .attr("font-weight", "bold") // should be moved to CSS. For now, the code is this
        .attr("font-family", "sans-serif") // way to simplify our directions to you.
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "Hanging")
        .attr("transform", `translate(${0} ${svg.attr("height")/2}) rotate(-90)`)
        .text("Temperature (F)");
}

function populateDropdown() {
    const select = d3.select("select");

    select.append("option")
        .text("Urbana");
    
    select.append("option")
        .text("London");

    select.append("option")
        .text("Cape Town");

    // TODO create <option>s as children of the <select>, one for each city
 
    select.on("change", changeEvent => {
        // Runs when the dropdown is changed
        console.log(changeEvent.target.selectedIndex);
        city_ind = changeEvent.target.selectedIndex;
        drawBarChart();
        // The newly selected index
    });
}

