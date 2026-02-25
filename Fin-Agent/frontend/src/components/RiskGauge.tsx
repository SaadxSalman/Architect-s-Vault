export default function RiskGauge({ value }: { value: number }) {
  const color = value > 70 ? 'text-red-500' : value > 40 ? 'text-yellow-500' : 'text-green-500';
  
  return (
    <div className="relative flex flex-col items-center justify-center">
      <svg className="w-48 h-24" viewBox="0 0 100 50">
        <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#1e293b" strokeWidth="10" />
        <path 
          d="M 10 50 A 40 40 0 0 1 90 50" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="10" 
          className={color}
          strokeDasharray="126" 
          strokeDashoffset={126 - (126 * value) / 100}
        />
      </svg>
      <div className={`text-2xl font-bold mt-2 ${color}`}>{value}% Risk</div>
    </div>
  );
}