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

var color = d3.scaleOrdinal(d3.schemeCategory10);

window.addEventListener("load", drawCircles);

const padding = {top:20, left:20, right:20, bottom:20};
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const xForMonth = d3.scaleBand()
        .domain(MONTHS)
        .range([padding.left, 500 - padding.right]) // TODO
        .padding(0); 
/*
 * Why this line? Because if this script runs before the svg exists, then nothing will happen, and d3 won't even
 * complain.  This delays drawing until the entire DOM has loaded.
 */

function drawCircles() {
    // d3 has been added to the html in a <script> tag so referencing it here should work.
    const svg = d3.select("svg");

    const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const padding = {top:20, left:20, right:20, bottom:20};

    const xForMonth = d3.scaleBand()
        .domain(MONTHS)
        .range([padding.left, svg.attr("width") - padding.right]) // TODO
        .padding(0); 
    
    const allTemps = weatherData.map(city => city.averageHighByMonth).flat();

    const yForTemp = d3.scaleLinear()
        .domain(Math.min(...allTemps), Math.max(...allTemps))
        .range([svg.attr("height") - padding.bottom, padding.top]); 

    //console.log(allTemps);
    const margin = .1;


    svg.selectAll("rect")
    .data(weatherData[0].averageHighByMonth) // (Hardcoded) only Urbana’s data
    .join("rect")
        .attr("x", (dataPoint, i) => xForMonth(MONTHS[i])) // i is dataPoint’s index in the data array
        .attr("y", (dataPoint, i) => yForTemp(dataPoint))
        .attr("width", (dataPoint, i) => 10)
        .attr("height", (dataPoint, i) => 10)
        .attr("fill", "steelblue");
}
