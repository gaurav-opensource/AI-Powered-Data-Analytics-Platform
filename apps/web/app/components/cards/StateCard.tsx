export const StatCard: React.FC<StatCardProps> = ({ title, value, change, isPositive, graph }) => {
  const changeColor = isPositive ? "text-green-600" : "text-red-600";
  const changeIcon = isPositive ? "↑" : "↓";

  return (
    <div className="flex w-full justify-between items-start bg-white p-5 rounded-xl shadow-md hover:shadow-lg">
      <div className="flex flex-col space-y-3">
        <div className="flex items-center text-sm font-medium text-gray-500 space-x-1">
          <span>{title}</span>
        </div>
        <div className="text-3xl font-bold text-gray-800">{value}</div>
        <div className={`text-sm font-medium ${changeColor}`}>
          <span className="font-bold">{changeIcon}{change}</span> from last month
        </div>
      </div>
      <div className="flex-shrink-0 mt-2">{graph}</div>
    </div>
  );
};
