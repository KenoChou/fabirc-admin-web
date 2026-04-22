export interface HostItem {
  hostId: string;
  hostname: string;
  status: string;
  region: string;
  gpuCount: number;
  cpuUsage: number;
  memoryUsage: number;
}

export interface ResourceListRequest {
  keyword?: string;
  status?: string;
  region?: string;
}

export interface MonitorPoint {
  timestamp: string;
  cpuUsage: number;
  gpuUsage: number;
  memoryUsage: number;
}

export interface MonitorRequest {
  hostId: string;
}
