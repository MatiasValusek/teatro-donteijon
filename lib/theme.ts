import type {
  NewsCategory,
  PerformanceAvailability,
  Tone,
  WorkStage,
} from "@/types/content";

export const toneStyles: Record<
  Tone,
  { chip: string; surface: string }
> = {
  ember: {
    chip: "border border-orange-300/20 bg-orange-400/10 text-orange-100",
    surface:
      "border-orange-400/15 bg-[linear-gradient(145deg,rgba(244,92,44,0.18),rgba(18,18,18,0.95))]",
  },
  garnet: {
    chip: "border border-rose-300/20 bg-rose-400/10 text-rose-100",
    surface:
      "border-rose-400/15 bg-[linear-gradient(145deg,rgba(138,30,44,0.24),rgba(16,16,16,0.96))]",
  },
  gold: {
    chip: "border border-amber-300/20 bg-amber-300/10 text-amber-100",
    surface:
      "border-amber-300/15 bg-[linear-gradient(145deg,rgba(255,176,89,0.18),rgba(16,16,16,0.95))]",
  },
};

export const workStageLabel: Record<WorkStage, string> = {
  repertorio: "En repertorio",
  estreno: "Nueva temporada",
  laboratorio: "Laboratorio",
};

export const performanceAvailabilityLabel: Record<
  PerformanceAvailability,
  string
> = {
  abierta: "Entradas abiertas",
  ultimas: "Últimos lugares",
  proxima: "Próximamente",
};

export const performanceAvailabilityStyles: Record<
  PerformanceAvailability,
  string
> = {
  abierta: "border border-emerald-300/20 bg-emerald-400/10 text-emerald-100",
  ultimas: "border border-orange-300/20 bg-orange-400/10 text-orange-100",
  proxima: "border border-white/15 bg-white/8 text-white",
};

export const newsCategoryLabel: Record<NewsCategory, string> = {
  estreno: "Estreno",
  gira: "Gira",
  proceso: "Proceso",
};
