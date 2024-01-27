import React, { useEffect, useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Legend, Cell } from "recharts";
import { VendorGraphData, userGraphData } from "../../Api/AdminApi";

export default function VendorGraph() {
  const [vendorCount, setVendorCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    VendorGraphData()
      .then((res) => {
        const Count = res.data.vendorCount;
        setVendorCount(Count);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    userGraphData()
      .then((res) => {
        const Count = res.data.userCount;
        setUserCount(Count);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const data = [
    { name: "Vendors", value: vendorCount, color: "#0088FE" },
    { name: "Users", value: userCount, color: "#00C49F" },
  ];

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie dataKey="value" data={data} fill="#8884d8" label>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
