/**
 * Main entry point -- this file has been added to index.html in a <script> tag. Add whatever code you want below.
 */
"use strict";

/*
const data = [
    {x: 10, y: 30, w: 20, h: Math.random() * 100 + Math.random() * 100, color: "red"},
    {x: 30, y: 30, w: 20, h: Math.random() * 100 + Math.random() * 100, color: "green"},
    {x: 50, y: 30, w: 20, h: Math.random() * 100 + Math.random() * 100, color: "blue"},
    {x: 70, y: 30, w: 20, h: Math.random() * 100 + Math.random() * 100, color: "orange"},
    {x: 90, y: 30, w: 20, h: Math.random() * 100 + Math.random() * 100, color: "black"}
];
*/


const data = [
    {height: 72,    weight: 200},
    {height: 68,    weight: 165},
    {height: 69,    weight: 160},
    {height: 68,    weight: 135},
    {height: 64,    weight: 120},
    {height: 72,    weight: 162},
    {height: 72,    weight: 190},
    {height: 66,    weight: 139},
    {height: 68,    weight: 155},
    {height: 70,    weight: 155},
    {height: 74,    weight: 185},
    {height: 74,    weight: 170},
    {height: 63,    weight: 137},
    {height: 66.25, weight: 125},
    {height: 62,    weight: 114},
    {height: 67.5,  weight: 130},
    {height: 70,    weight: 196},
    {height: 68.5,  weight: 160},
    {height: 66,    weight: 135},
    {height: 73,    weight: 155},
    {height: 64,    weight: 125},
    {height: 63,    weight: 125},
    {height: 66,    weight: 200},
    {height: 71,    weight: 160},
    {height: 68,    weight: 120},
    {height: 69,    weight: 160},
    {height: 65,    weight: 120},
    {height: 64,    weight: 118},
];



var color = d3.scaleOrdinal(d3.schemeCategory10);

window.addEventListener("load", drawBars);

function drawBars() {
    // d3 has been added to the html in a <script> tag so referencing it here should work.
    const svg = d3.select("svg");


    const heightCorrespondingTo0 = d3.min(data, d=>d.height)
    const heightCorrespondingToWidth = d3.max(data, d=>d.height)

    const weightCorrespondingTo0 = d3.max(data, d=>d.weight)
    const weightCorrespondingToHeight = d3.min(data, d=>d.weight)

    const range_pad = 50

    const xForHeight = d3.scaleLinear()
        .domain([heightCorrespondingTo0, heightCorrespondingToWidth]) // TODO
        .range([range_pad, svg.attr("width")-range_pad]); 

    const yForWeight = d3.scaleLinear()
        .domain([weightCorrespondingToHeight, weightCorrespondingTo0]) // TODO
        .range([svg.attr("height")-range_pad, range_pad]); 

    svg.selectAll("circle")
        .data(data)
        .join("circle")
            .attr("cx", d => xForHeight(d.height))
            .attr("cy", d => yForWeight(d.weight))
            .attr("r", d => 3);

    const yTranslation = svg.attr("height") - range_pad
    const xTranslation = range_pad
    const xAxis = svg.append("g")
        .call(d3.axisBottom(xForHeight)) // d3 creates a bunch of elements inside the <g>
        .attr("transform", `translate(0, ${yTranslation})`); // TODO yTranslation
        
    const yAxis = svg.append("g")
        .call(d3.axisLeft(yForWeight))
        .attr("transform", `translate(${xTranslation}, 0)`); // TODO xTranslation

    svg.append("text")
        .attr("font-size", 12)
        .attr("font-weight", "bold")
        .attr("font-family", "sans-serif")
        .attr("x", svg.attr("width")/2)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "Auto")
        .attr("y", svg.attr("height") - range_pad/4)
        .text("Height (in)");
    
    svg.append("text")
        .attr("font-size", 12)
        .attr("font-weight", "bold") // should be moved to CSS. For now, the code is this
        .attr("font-family", "sans-serif") // way to simplify our directions to you.
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "Hanging")
        .attr("transform", `translate(${range_pad/4} ${svg.attr("height")/2}) rotate(-90)`)
        .text("Weight (lb)");


/*
    svg.append('g')
        .attr('class', 'legend')
            .selectAll('text')
            .data(data)
            .enter()
                .append('text')
                .text(function(d, i) { return String(i+1); })
                .attr('fill', function(d) { return d.color; })
                .attr('y', function(d, i) { return 140; })
                .attr('x', function(d){return d.x+5;})
*/
}
