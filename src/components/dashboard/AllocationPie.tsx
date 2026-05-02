import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { allocation } from "@/lib/mock-data";

const colors = [
  "oklch(0.72 0.27 350)",
  "oklch(0.85 0.18 340)",
  "oklch(0.75 0.20 160)",
  "oklch(0.70 0.22 30)",
  "oklch(0.65 0.22 290)",
];

export function AllocationPie() {
  return (
    <div className="glass-strong rounded-2xl p-5">
      <div className="text-xs uppercase tracking-wider text-muted-foreground">Asset Allocation</div>
      <div className="mt-4 grid grid-cols-2 items-center gap-2">
        <div className="h-44">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={allocation} dataKey="value" innerRadius={42} outerRadius={70} stroke="none" paddingAngle={2}>
                {allocation.map((_, i) => (
                  <Cell key={i} fill={colors[i % colors.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "oklch(0.17 0.025 325)",
                  border: "1px solid oklch(1 0 0 / 0.1)",
                  borderRadius: 12,
                  fontSize: 12,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <ul className="space-y-2 text-xs">
          {allocation.map((a, i) => (
            <li key={a.name} className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ background: colors[i % colors.length] }} />
                {a.name}
              </span>
              <span className="font-semibold">{a.value}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}