import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  ScatterChart,
  Scatter,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import ship from "../assets/images/ship.gif";

const COLORS = ["#ff4444", "#44dd44"];

const NEOWSCharts = ({ data }) => {
  const [hazardData, setHazardData] = useState([]);
  const [diameterVelocityData, setDiameterVelocityData] = useState([]);
  const [riskDistanceData, setRiskDistanceData] = useState([]);
  const [showCharts, setShowCharts] = useState(false);
  const [loadingCharts, setLoadingCharts] = useState(false);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const yes = data.filter((d) => d.is_potentially_hazardous_asteroid).length;
    const no = data.length - yes;
    setHazardData([
      { name: "Hazardous", value: yes },
      { name: "Not Hazardous", value: no },
    ]);

    const scatterPoints = data.map((d) => ({
      diameter: d.estimated_diameter.meters.estimated_diameter_max,
      velocity: parseFloat(
        d.close_approach_data[0]?.relative_velocity.kilometers_per_hour || 0
      ),
    }));
    setDiameterVelocityData(scatterPoints);

    const distanceCategories = { Close: 0, Moderate: 0, "Very Far": 0 };
    data.forEach((d) => {
      const miss = parseFloat(
        d.close_approach_data[0]?.miss_distance.kilometers || 0
      );
      if (miss < 500000) distanceCategories.Close++;
      else if (miss < 3000000) distanceCategories.Moderate++;
      else distanceCategories["Very Far"]++;
    });
    const chartData = Object.entries(distanceCategories).map(([key, val]) => ({
      name: key,
      count: val,
    }));
    setRiskDistanceData(chartData);
  }, [data]);

  const handleShowCharts = () => {
    setLoadingCharts(true);
    setTimeout(() => {
      setShowCharts(true);
      setLoadingCharts(false);
    }, 1500);
  };

  return (
    <div className="neows-wrapper">
      <h2 className="neows-title">NEO Visual Analysis</h2>

      <div className="neows-note">
        <strong>Note:</strong> The data shown here is limited to a 7-day window
        from the selected start date due to API constraints.
      </div>

      {!showCharts && !loadingCharts && (
        <div className="neows-loader-section">
          <img src={ship} alt="Data ready" className="neows-ship-img" />
          <p className="neows-loader-text">
            Data is ready! Click below to view the charts.
          </p>
          <button onClick={handleShowCharts} className="neows-show-button">
            Show Charts
          </button>
        </div>
      )}

      {showCharts && (
        <div className="neows-charts-container">
          <div className="neows-chart-block">
            <h3 className="neows-chart-title">1. Hazardous vs Not Hazardous</h3>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={hazardData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={130}
                  label
                >
                  {hazardData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="neows-chart-block">
            <h3 className="neows-chart-title">2. Diameter vs Velocity</h3>
            <ResponsiveContainer>
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid />
                <XAxis type="number" dataKey="diameter" name="Diameter (m)" />
                <YAxis type="number" dataKey="velocity" name="Velocity (km/h)" />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                <Scatter name="NEOs" data={diameterVelocityData} fill="#8884d8" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          <div className="neows-chart-block">
            <h3 className="neows-chart-title">3. Risk Distance Categories</h3>
            <ResponsiveContainer>
              <BarChart data={riskDistanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default NEOWSCharts;
