type Props = {
  count: number;
  heading: string;
  color: "red" | "green" | "black";
};

export default function DashboardCount({ count, heading, color }: Props) {
  // process numbers properly
  return (
    <div
      className={`${color !== "black" ? `text-${color}-500` : `text-black`} 
      ${color === "black" && `text-black`}
      font-semibold flex flex-col gap-1 items-center`}
    >
      <span className="text-2xl">
        {heading[0].toUpperCase() + heading.slice(1)}
      </span>
      <span className="text-xl">{count}</span>
    </div>
  );
}
