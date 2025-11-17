export type MetricType = 'weight' | 'waist' | 'bf';
export type PeriodType = '1M' | '3M' | '6M' | '1A' | 'ALL';

export interface DataPoint {
  date: string;
  value: number;
}

export interface MetricsData {
  weight: DataPoint[];
  waist: DataPoint[];
  bf: DataPoint[];
}

export interface Stats {
  current: number;
  change: number;
  goal?: number;
  remaining?: number;
  progress?: number;
  unit: string;
}

export interface MetricConfig {
  label: string;
  unit: string;
  color: string;
  goal: number;
}

export interface HistoryEntry {
  date: string;
  value: number;
  change: number;
  unit: string;
}