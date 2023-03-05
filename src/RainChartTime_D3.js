import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export function RainChartTime_D3({rg_data, startDate, endDate}) {  

  const chartRef = useRef(null);

  useEffect(() => {
    const margin = { top: 20, right: 20, bottom: 50, left: 70 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(chartRef.current)

    svg.selectAll("*").remove();

    svg.attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let keysAll = rg_data ? Object.keys(rg_data) : [];

    if (keysAll?.length > 0) {
      // Trim the keys by startDate and endDate:
      let newDat = {};
      let thisDate = new Date();
      for(let i = 0; i < keysAll.length; i++){
        thisDate = new Date(parseInt(keysAll[i]));
        if(thisDate >= startDate && thisDate <= endDate){
          newDat[keysAll[i]] = rg_data[keysAll[i]];
        }
      }

      let keys = newDat ? Object.keys(newDat) : [];
      let maxObjs = 10000;
      let falseStep = keys.length / maxObjs;
      if (falseStep < 1) falseStep = 1;
      let labelData = [];
      let rainData = [];
      let theDate = new Date();
      for (let i = 0; i < keys.length; i = i + Math.ceil(falseStep)) {
        theDate = new Date(parseInt(keys[i]));
        if (theDate >= startDate && theDate <= endDate) {
          labelData.push(parseInt(keys[i]));
          rainData.push(newDat[keys[i]]);
        }
      }

      const xScale = d3.scaleBand()
        .domain(labelData)
        .range([0, width])
        .padding(0.1);

      const yScale = d3.scaleLinear()
        .domain([0, d3.max(rainData)])
        .range([height, 0]);

      const xAxis = d3.axisBottom(xScale)
        .tickFormat(d3.timeFormat("%Y-%m-%d %HH:%MM"));

      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");

      svg.append("g")
        .call(d3.axisLeft(yScale));

      svg.selectAll(".bar")
        .data(rainData)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", (d, i) => xScale(labelData[i]))
        .attr("y", d => yScale(d))
        .attr("width", xScale.bandwidth())
        .attr("height", d => height - yScale(d));
    }

  }, [rg_data, startDate, endDate]);

  return (
    <svg ref={chartRef} />
  )
}
