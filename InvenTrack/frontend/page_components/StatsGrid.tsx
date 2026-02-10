import { DollarSign, AlertTriangle, BarChart3 } from 'lucide-react';
import StatCard from './StatCard';

interface StatsGridProps {
  stats: {
    totalValue: number;
    lowStock: number;
    totalItems: number;
  };
}

export default function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard 
        icon={<DollarSign className="text-green-600" />} 
        label="Inventory Value" 
        value={`$${stats.totalValue.toLocaleString()}`} 
      />
      <StatCard 
        icon={<AlertTriangle className="text-orange-600" />} 
        label="Low Stock Alerts" 
        value={stats.lowStock} 
        subValue="Items below threshold"
        alert={stats.lowStock > 0}
      />
      <StatCard 
        icon={<BarChart3 className="text-blue-600" />} 
        label="Total Products" 
        value={stats.totalItems} 
      />
    </div>
  );
}