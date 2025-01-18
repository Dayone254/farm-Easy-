import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Simulated historical data
const generateHistoricalData = () => {
  const data = [];
  const now = new Date();
  for (let i = 6; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toLocaleDateString(),
      moisture: Math.floor(Math.random() * (80 - 60) + 60),
      temperature: Math.floor(Math.random() * (30 - 20) + 20),
      ph: Number((Math.random() * (7.5 - 6.0) + 6.0).toFixed(1))
    });
  }
  return data;
};

const SoilHealthChart = ({ data: currentData }: { data: any }) => {
  const historicalData = generateHistoricalData();
  
  // Add current data point
  historicalData.push({
    date: new Date().toLocaleDateString(),
    moisture: currentData.moisture,
    temperature: currentData.temperature,
    ph: currentData.ph
  });

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle>Soil Health Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={historicalData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="moisture" 
                stroke="#4A7856" 
                name="Moisture (%)"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="temperature" 
                stroke="#ff9f0a" 
                name="Temperature (°C)"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="ph" 
                stroke="#2F5233" 
                name="pH Level"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SoilHealthChart;