"use client";

import { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  DoughnutController,
  BarController,
  type ChartConfiguration,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  DoughnutController,
  BarController
);

const PALETTE = ["#2563eb", "#f59e42", "#10b981", "#ef4444", "#a21caf", "#0891b2", "#eab308"];

export function AdminDoughnutChart({
  labels,
  values,
}: {
  labels: string[];
  values: number[];
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<ChartJS | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const isDark = document.documentElement.classList.contains("dark");
    const config: ChartConfiguration<"doughnut"> = {
      type: "doughnut",
      data: {
        labels,
        datasets: [
          {
            data: values,
            backgroundColor: PALETTE,
            borderWidth: 2,
            borderColor: isDark ? "#18181b" : "#ffffff",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "62%",
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              color: isDark ? "#e4e4e7" : "#27272a",
              boxWidth: 12,
              padding: 12,
            },
          },
        },
      },
    };

    chartRef.current = new ChartJS(ctx, config);
    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };
  }, [labels, values]);

  return (
    <div className="relative h-64">
      <canvas ref={canvasRef} />
    </div>
  );
}

export function AdminBarChart({
  labels,
  values,
}: {
  labels: string[];
  values: number[];
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<ChartJS | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const isDark = document.documentElement.classList.contains("dark");
    const tickColor = isDark ? "#a1a1aa" : "#52525b";
    const config: ChartConfiguration<"bar"> = {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Transactions",
            data: values,
            backgroundColor: "#2563eb",
            borderRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
        },
        scales: {
          x: { ticks: { color: tickColor, maxRotation: 45 } },
          y: { ticks: { color: tickColor, precision: 0 } },
        },
      },
    };

    chartRef.current = new ChartJS(ctx, config);
    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };
  }, [labels, values]);

  return (
    <div className="relative h-64">
      <canvas ref={canvasRef} />
    </div>
  );
}
