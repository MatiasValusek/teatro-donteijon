import { FunctionCard } from "@/components/functions/function-card";
import { formatAgendaDate } from "@/lib/utils";
import type { FunctionEventWithWork } from "@/types/content";

type DateGroupProps = {
  date: string;
  items: FunctionEventWithWork[];
};

export function DateGroup({ date, items }: DateGroupProps) {
  return (
    <section className="space-y-5">
      <div className="flex items-center gap-4">
        <div className="shrink-0 rounded-full border border-orange-300/20 bg-orange-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-orange-100">
          {formatAgendaDate(date)}
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-white/16 to-transparent" />
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        {items.map((item) => (
          <FunctionCard key={item.event.id} item={item} />
        ))}
      </div>
    </section>
  );
}
