import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const TimelineWeaver: React.FC = () => {
  const timelineRef = useRef<SVGSVGElement>(null);
  const events = [
    { year: -4000, event: "Creation", reference: "Genesis 1:1", gematria: 2701 },
    { year: -1446, event: "Exodus", reference: "Exodus 12:40", divinePattern: "40 years" },
    { year: -5, event: "Messiah Born", reference: "Matthew 2:1", frequency: 528 },
    { year: 30, event: "Crucifixion", reference: "John 19:30", gematria: 888 },
    { year: 70, event: "Temple Destroyed", reference: "Daniel 9:26" },
    { year: 2025, event: "Now", reference: "Revelation 1:8", divinePattern: "Alpha & Omega" }
  ];

  useEffect(() => {
    if (!timelineRef.current) return;
    
    const svg = d3.select(timelineRef.current);
    svg.selectAll("*").remove();
    
    const width = 400;
    const height = 150;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    
    const x = d3.scaleLinear()
      .domain([-5000, 2030])
      .range([margin.left, width - margin.right]);
    
    const y = d3.scaleBand()
      .domain(events.map(d => d.event))
      .range([margin.top, height - margin.bottom])
      .padding(0.1);
    
    const spiral = svg.append("path")
      .datum(events)
      .attr("d", d3.lineRadial()
        .angle(d => (d.year + 4000) * 0.0001)
        .radius(d => 50 + (d.year + 4000) * 0.02)
        .curve(d3.curveCardinal)
      )
      .attr("transform", `translate(${width/2},${height/2})`)
      .attr("fill", "none")
      .attr("stroke", "#ffd700")
      .attr("stroke-width", 1.618);
    
    const points = svg.selectAll(".event")
      .data(events)
      .enter().append("circle")
      .attr("cx", d => width/2 + (50 + (d.year + 4000) * 0.02) * Math.cos((d.year + 4000) * 0.0001))
      .attr("cy", d => height/2 + (50 + (d.year + 4000) * 0.02) * Math.sin((d.year + 4000) * 0.0001))
      .attr("r", 3)
      .attr("fill", d => d.gematria ? "#f00" : "#0ff")
      .on("mouseover", (event, d) => {
        const info = d.gematria 
          ? `Gematria: ${d.gematria} (${d.reference})` 
          : d.frequency 
            ? `Frequency: ${d.frequency}Hz` 
            : d.divinePattern;
        // Tooltip logic (simplified)
        console.log(info);  // Replace with actual tooltip
      });

  }, [events]);

  return (
    <div className="bg-violet-800 p-4 rounded-lg">
      <h2 className="text-xl font-bold">Prophetic Timeline Weaver</h2>
      <svg ref={timelineRef} width="400" height="150"></svg>
    </div>
  );
};

export default TimelineWeaver;
