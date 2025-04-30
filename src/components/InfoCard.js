"use client";

const InfoCard = ({ Icon, title, color, value, description }) => {
  const colorClasses = {
    red: "bg-red-500/20 text-red-200",
    sky: "bg-sky-500/20 text-sky-200",
    amber: "bg-amber-500/20 text-amber-200",
    lime: "bg-lime-500/20 text-lime-200",
  };
  const colorClass = colorClasses[color] || "bg-gray-800 text-white";
  return (
    <div className={`${colorClass} p-6 rounded-xl flex flex-col gap-3`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Icon className="w-6 h-6" />
          <span className="text-lg font-medium">{title}</span>
        </div>
        <div>
          <span className="text-2xl font-semibold">{value}</span>
        </div>
      </div>
      <p className="text-sm text-zinc-300 mt-2 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default InfoCard;
