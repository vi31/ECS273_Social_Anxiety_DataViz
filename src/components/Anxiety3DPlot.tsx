import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { Data } from "plotly.js";
import * as d3 from "d3";

interface DataPoint {
  sleep: number;
  activity: number;
  stress: number;
  anxiety: number;
}

interface Anxiety3DPlotProps {
  prediction: number;
  csvUrl: string;
  userData?: DataPoint;
}

const Anxiety3DPlot3D: React.FC<Anxiety3DPlotProps> = ({ prediction, csvUrl, userData }) => {
  const [data, setData] = useState<DataPoint[]>([]);

  useEffect(() => {
    const loadCSV = async () => {
      try {
        const parsed = await d3.csv(csvUrl, d => {
          // Trim whitespace from headers just in case
          const entry: any = {};
          for (const key in d) {
            entry[key.trim()] = d[key];
          }

          const dp: DataPoint = {
            sleep: +entry["Sleep Hours"],
            activity: +entry["Physical Activity (hrs/week)"],
            stress: +entry["Stress Level (1-10)"],
            anxiety: +entry["Anxiety Level (1-10)"],
          };

          return dp;
        });

        const filtered = parsed.filter(
          d => !isNaN(d.sleep) && !isNaN(d.activity) && !isNaN(d.stress) && !isNaN(d.anxiety)
        );

        console.log("Loaded and parsed data:", filtered);
        setData(filtered);
      } catch (err) {
        console.error("Failed to load CSV:", err);
      }
    };

    loadCSV();
  }, [csvUrl]);

  // Combine population and user data
  const combinedData = userData ? [...data, userData] : data;

  // Build the traces for Plotly
  const traces: Data[] = [
    {
      x: data.map(d => d.sleep),
      y: data.map(d => d.activity),
      z: data.map(d => d.stress),
      mode: "markers",
      type: "scatter3d",
      marker: {
        size: 5,
        opacity: 0.8,
        color: data.map(d => d.anxiety),
        colorscale: "RdYlBu",
        cmin: 1,
        cmax: 10,
        colorbar: { title: { text: "Anxiety Level" } },
      },
      name: "Population",
    },
  ];

  if (userData) {
    traces.push({
      x: [userData.sleep],
      y: [userData.activity],
      z: [userData.stress],
      mode: "markers",
      type: "scatter3d",
      marker: {
        size: 12,
        color: [prediction],
        colorscale: "RdYlBu",
        cmin: 1,
        cmax: 10,
        line: { color: "black", width: 2 },
      },
      name: "User",
    });
  }

  return (
    <div>
      {data.length === 0 ? (
        <div>Loading data...</div>
      ) : (
        <Plot
          data={traces}
          layout={{
            width: 600,
            height: 600,
            margin: { l: 0, r: 0, b: 0, t: 0 },
            scene: {
              xaxis: { title: { text: "Sleep Hours" } },
              yaxis: { title: { text: "Physical Activity (hrs/week)" } },
              zaxis: { title: { text: "Stress Level (1-10)" } },
            },
            legend: { x: 0, y: 1 },
          }}
          config={{ responsive: true }}
        />
      )}
    </div>
  );
};

export default Anxiety3DPlot3D;
