import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";

// Component name is prefixed with company name initial letters (TC_) to avoid naming conflict
const TC_RadialBarChart = ({ data, innerRadius }) => {
  const COLORS = ["#197EC6", "#00CC9C", "#FFA400"];

  data = data.map((value, index) => {
    return {
      fill: COLORS[index],
      value: Number(value),
    };
  });

  data.unshift({
    fill: "#fff",
    value: 100,
  });

  data.reverse();

  return (
    <ResponsiveContainer width="100%" height="100%" className="-mx-6">
      <RadialBarChart
        innerRadius={innerRadius || "50%"}
        outerRadius="150%"
        barSize={9}
        data={data}
        startAngle={90}
        endAngle={450} // Adjusted for clockwise rendering
      >
        <RadialBar
          cornerRadius={100}
          minAngle={100}
          background
          dataKey="value"
        />
      </RadialBarChart>
    </ResponsiveContainer>
  );
};

export default TC_RadialBarChart;
