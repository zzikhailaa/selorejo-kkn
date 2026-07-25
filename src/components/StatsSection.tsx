// Definisikan bentuk data satu item
interface StatItem {
  value: string | number;
  label: string;
}

// Berikan tipe pada props
interface StatsSectionProps {
  stats: StatItem[];
}

export default function StatsSection({ stats }: StatsSectionProps) {
  return (
    <div className="grid grid-cols-4 gap-4">
      {stats.map((item, index) => (
        <div key={index} className="p-4 border rounded shadow">
          <h3 className="text-2xl font-bold">{item.value}</h3>
          <p>{item.label}</p>
        </div>
      ))}
    </div>
  );
}