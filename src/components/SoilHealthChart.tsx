import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useFarmStore } from "@/stores/farmStore";

const generateHistoricalData = (farmDetails: any) => {
  const data = [];
  const now = new Date();
  
  // Default values if farm details are missing
  const baseMoisture = !farmDetails?.soil?.drainage ? 65 :
                      farmDetails.soil.drainage === 'poor' ? 80 : 
                      farmDetails.soil.drainage === 'moderate' ? 65 : 50;
  
  const baseTemp = 25;
  const basePH = !farmDetails?.soil?.type ? 6.5 :
                 farmDetails.soil.type === 'clay' ? 6.5 :
                 farmDetails.soil.type === 'sandy' ? 6.0 :
                 farmDetails.soil.type === 'loam' ? 6.8 : 6.5;

  // Generate data points with slight variations
  for (let i = 6; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    const variation = Math.random() * 10 - 5;
    
    data.push({
      date: date.toLocaleDateString(),
      moisture: Math.max(0, Math.min(100, baseMoisture + variation)),
      temperature: baseTemp + (Math.random() * 4 - 2),
      ph: Number((basePH + (Math.random() * 0.4 - 0.2)).toFixed(1))
    });
  }
  
  return data;
};

const SoilHealthChart = ({ data: currentData }: { data: any }) => {
  const farmDetails = useFarmStore((state) => state.farmDetails);
  
  // Generate historical data with null-safe farm details
  const historicalData = generateHistoricalData(farmDetails || {});
  
  // Add current data point with null checks
  historicalData.push({
    date: new Date().toLocaleDateString(),
    moisture: currentData?.moisture || 0,
    temperature: currentData?.temperature || 25,
    ph: currentData?.ph || 6.5
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