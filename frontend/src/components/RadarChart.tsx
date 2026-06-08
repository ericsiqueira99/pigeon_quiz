import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

interface TraitRadarChartProps {
  chartData: { trait: string; value: number; user: number }[];
  resultName: string;
  resultColor: string;
}

export function TraitRadarChart({ chartData, resultName, resultColor }: TraitRadarChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart data={chartData} outerRadius="75%" margin={{ top: 20, right: 50, bottom: 20, left: 50 }}>
        <PolarGrid />
        <PolarAngleAxis
          dataKey="trait"
          tick={{ fontSize: 8 }}
          tickFormatter={(value) => value.charAt(0).toUpperCase() + value.slice(1)}
        />
        <PolarRadiusAxis
          domain={[-1, 10]}
          tickCount={3}
          tick={false}
          axisLine={false}
        />
        <Radar name="You" dataKey="user" stroke="#666" fill="#999" fillOpacity={0.2} />
        <Radar name={resultName} dataKey="value" stroke={resultColor} fill={resultColor} fillOpacity={0.4} />
      </RadarChart>
    </ResponsiveContainer>
  );
}