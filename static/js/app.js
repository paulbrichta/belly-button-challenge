// Use the D3 library to read in samples.json from the URL
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";


// Promise Pending
// const dataPromise = d3.json(url);
// console.log("Data Promise: ", dataPromise);


// Fetch the JSON data and console log it
// d3.json(url).then(function(data) {
//     console.log(data);
// });

/****************************************************************************************************/

function optionChanged(newSample) {
    demographicInfo(newSample)
    chart(newSample)
    gaugeChart(newSample)
}


function demographicInfo(id) {
    d3.json(url).then(function(data) {
        // console.log(data);
    
        let metadata = data.metadata

        // console.log(metadata)

        let sampleArray = metadata.filter(sample => sample.id == id);

        let result = sampleArray[0];

        let display = d3.select("#sample-metadata")

        display.html("")

        Object.entries(result).forEach(([key, value]) => {
            display.append("h6").text(`${key}: ${value}`)
        })

        // console.log(sampleArray)

    });
}


function chart(id) {  //bar
    d3.json(url).then(function(data) {
        // console.log(data);

        let samples = data.samples

        // console.log(metadata)

        let sampleArray = samples.filter(sample => sample.id == id);
        let result = sampleArray[0];

        let otu_ids = result.otu_ids
        let otu_labels = result.otu_labels
        let sample_values = result.sample_values

        let barData = [{
            x: sample_values.slice(0, 10).reverse(),
            y: otu_ids.slice(0, 10).map(otu_ids => `OTU ${otu_ids}`).reverse(),
            text:otu_labels.slice(0, 10).reverse,
            type: "bar",
            orientation: "h"
        }];

        let bubbleData = [{
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        }];

        let bubbleLayout = {
            xaxis: {title: "OTU_ID"}
        }

        Plotly.newPlot("bar", barData);
        Plotly.newPlot("bubble", bubbleData, bubbleLayout)
    });
}


function gaugeChart(id) {  //gauge
    d3.json(url).then(function(data) {
        // console.log(data);

        let metadata = data.metadata

        let sampleArray = metadata.filter(sample => sample.id == id);

        let result = sampleArray[0];

        let wfreq = result.wfreq

        let gaugeData = [{
            type: "indicator",
            mode: "gauge+number",
            value: wfreq,
            title: { text: "Belly Button Washing Frequency" },
            // delta: { reference: 400, increasing: { color: "RebeccaPurple" } },
            gauge: {
                axis: { range: [null, 9], tickwidth: 1, tickcolor: "black" },
                // bar: { color: "white" },
                bgcolor: "white",
                borderwidth: 2,
                bordercolor: "gray",
                steps: [
                        { range: [0, 1], color: "#F8F3EC" },
                        { range: [1, 2], color: "#F4F1E5" },
                        { range: [2, 3], color: "#E9E6CA" },
                        { range: [3, 4], color: "#E5E7B3" },
                        { range: [4, 5], color: "#D5E49D" },
                        { range: [5, 6], color: "#B7CC92" },
                        { range: [6, 7], color: "#8CBF88" },
                        { range: [7, 8], color: "#8ABB8F" },
                        { range: [8, 9], color: "#85B48A" }
                ],
                
            // threshold: {
            //     line: { color: "red", width: 4 },
            //     thickness: 0.75,
            //     value: 490
            // }
        },
        text: ["0-1", "1-2", "2-3", "3-4", "4-5", "5-6", "6-7", "7-8", "8-9"],
        // pointer: {
        //     type: "path",
        //     fillcolor: "black",
        //     line: {
        //         width: 0
        //     }
        // }
    }];

    // let layout = {
    //     width: 500,
    //     height: 400,
    //     margin: { t: 25, r: 25, l: 25, b: 25 },
    //     paper_bgcolor: "lavender",
    //     font: { color: "darkblue", family: "Arial" }
    // };

        Plotly.newPlot("gauge", gaugeData)
    });
}


function bubbleChart(id) {  //bubble
    d3.json(url).then(function(data) {
        // console.log(data);



    });
}

/****************************************************************************************************/

function init() {
    let option = d3.select("#selDataset");

    d3.json(url).then(function(data) {
        // console.log(data);

        let names = data.names

        // console.log(names)

        names.forEach((sample) => {
            option.append("option")
            .text(sample)
            .property("value", sample)
        });

        let firstSample = names[0]
        demographicInfo(firstSample)
        chart(firstSample)
        gaugeChart(firstSample)
    });

}

init();
