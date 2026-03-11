"use client";

import { useState } from "react";
import { DateGroup } from "@/components/functions/date-group";
import { FunctionsEmptyState } from "@/components/functions/functions-empty-state";
import { FunctionsFilters } from "@/components/functions/functions-filters";
import type { FunctionEventWithWork, Work } from "@/types/content";

type FunctionsListProps = {
  items: FunctionEventWithWork[];
  works: Array<Pick<Work, "id" | "title">>;
};

type GroupedItems = {
  date: string;
  items: FunctionEventWithWork[];
};

function groupItemsByDate(items: FunctionEventWithWork[]) {
  const groups: GroupedItems[] = [];

  for (const item of items) {
    const currentGroup = groups[groups.length - 1];

    if (!currentGroup || currentGroup.date !== item.event.date) {
      groups.push({
        date: item.event.date,
        items: [item],
      });
      continue;
    }

    currentGroup.items.push(item);
  }

  return groups;
}

export function FunctionsList({ items, works }: FunctionsListProps) {
  const [selectedWorkId, setSelectedWorkId] = useState<Work["id"] | "all">(
    "all",
  );

  const visibleItems =
    selectedWorkId === "all"
      ? items
      : items.filter((item) => item.work.id === selectedWorkId);
  const groupedItems = groupItemsByDate(visibleItems);
  const hasFilter = selectedWorkId !== "all";

  return (
    <div className="space-y-8">
      <FunctionsFilters
        works={works}
        selectedWorkId={selectedWorkId}
        onSelectWork={setSelectedWorkId}
        onClear={() => setSelectedWorkId("all")}
      />

      {groupedItems.length > 0 ? (
        <div className="space-y-10">
          {groupedItems.map((group) => (
            <DateGroup key={group.date} date={group.date} items={group.items} />
          ))}
        </div>
      ) : (
        <FunctionsEmptyState hasFilter={hasFilter} />
      )}
    </div>
  );
}
