import { motion } from 'motion/react';
import { BarChart, Bar, LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, AlertTriangle } from 'lucide-react';

const barData = [
  { month: 'Jan', reports: 12 },
  { month: 'Feb', reports: 19 },
  { month: 'Mar', reports: 15 },
  { month: 'Apr', reports: 25 },
  { month: 'May', reports: 22 },
  { month: 'Jun', reports: 30 },
];

const lineData = [
  { year: '2019', severity: 2.1 },
  { year: '2020', severity: 2.4 },
  { year: '2021', severity: 2.8 },
  { year: '2022', severity: 3.2 },
  { year: '2023', severity: 3.5 },
];

const radarData = [
  { category: 'Cardiovascular', value: 65 },
  { category: 'Neurological', value: 45 },
  { category: 'Gastrointestinal', value: 80 },
  { category: 'Hepatic', value: 55 },
  { category: 'Renal', value: 40 },
];

export function DataCards() {
  const cards = [
    {
      title: 'Adverse Event Reports',
      subtitle: 'Monthly trend over 6 months',
      icon: AlertTriangle,
      chart: (
        <ResponsiveContainer width="100%" height={120}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#9ca3af" />
            <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
            <Tooltip 
              contentStyle={{ 
                background: 'rgba(255, 255, 255, 0.95)', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }} 
            />
            <Bar dataKey="reports" fill="#0066CC" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      ),
    },
    {
      title: 'Severity Trend',
      subtitle: 'Average severity score by year',
      icon: TrendingUp,
      chart: (
        <ResponsiveContainer width="100%" height={120}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="year" tick={{ fontSize: 12 }} stroke="#9ca3af" />
            <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" domain={[0, 5]} />
            <Tooltip 
              contentStyle={{ 
                background: 'rgba(255, 255, 255, 0.95)', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }} 
            />
            <Line 
              type="monotone" 
              dataKey="severity" 
              stroke="#00B3E6" 
              strokeWidth={3}
              dot={{ fill: '#0066CC', r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      ),
    },
    {
      title: 'Impact by System',
      subtitle: 'Physiological system effects',
      icon: Users,
      chart: (
        <ResponsiveContainer width="100%" height={140}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="#e5e7eb" />
            <PolarAngleAxis dataKey="category" tick={{ fontSize: 10 }} />
            <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
            <Radar 
              dataKey="value" 
              stroke="#0066CC" 
              fill="#0066CC" 
              fillOpacity={0.5} 
            />
          </RadarChart>
        </ResponsiveContainer>
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="max-w-6xl mx-auto px-6 py-12"
    >
      <h2 className="text-center mb-8 text-[#001B44]">Interaction Statistics</h2>
      
      <div className="grid md:grid-cols-3 gap-6">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.2 }
              }}
              className="group bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-[0_8px_32px_rgba(0,102,204,0.2)] transition-all relative overflow-hidden"
            >
              {/* Glowing outline on hover */}
              <motion.div
                className="absolute -inset-[1px] bg-gradient-to-r from-[#0066CC] to-[#00B3E6] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity -z-10 blur-sm"
              />
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0066CC]/10 to-[#00B3E6]/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#0066CC]" />
                </div>
                <div>
                  <h3 className="text-[#001B44]">{card.title}</h3>
                  <p className="text-xs text-gray-500">{card.subtitle}</p>
                </div>
              </div>
              
              <div className="mt-4">
                {card.chart}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
