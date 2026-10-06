import React, { useState, useEffect } from 'react';
import { Layers, Server, Database, HardDrive, Cpu, ShieldAlert, Zap, Activity, RefreshCw, Radio } from 'lucide-react';
import { playSound } from '../../utils/soundEffects';

interface NodeState {
  id: string;
  name: string;
  type: 'cdn' | 'lb' | 'app' | 'cache' | 'db' | 'queue';
  active: boolean;
  load: number;
  latencyMs: number;
  replicas?: number;
}

export const SystemDesignCanvas: React.FC = () => {
  const [rps, setRps] = useState<number>(5000);
  const [cachingEnabled, setCachingEnabled] = useState(true);
  const [appReplicas, setAppReplicas] = useState(3);
  const [dbReadReplica, setDbReadReplica] = useState(true);
  const [kafkaAsyncQueue, setKafkaAsyncQueue] = useState(true);
  const [chaosMode, setChaosMode] = useState<string | null>(null);

  // Compute live system metrics based on topology configuration
  const cacheHitRate = cachingEnabled ? (chaosMode === 'cache-down' ? 0 : 88) : 0;
  const rawDbQueries = Math.round(rps * (1 - cacheHitRate / 100));
  
  // Latency formula
  let baseLatency = 8; // ms
  if (!cachingEnabled || chaosMode === 'cache-down') baseLatency += 35;
  if (appReplicas < 2) baseLatency += 40;
  if (!dbReadReplica) baseLatency += 20;
  if (chaosMode === 'high-latency') baseLatency += 120;

  // Throughput and Error Rate
  const maxCapacity = appReplicas * 2500;
  const isOverloaded = rps > maxCapacity;
  const errorRatePercent = isOverloaded ? Math.min(65, Math.round(((rps - maxCapacity) / rps) * 100)) : (chaosMode === 'db-lock' ? 45 : 0);

  const triggerChaos = (mode: string) => {
    playSound('fail');
    setChaosMode(prev => prev === mode ? null : mode);
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-3.5rem)] bg-slate-950 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/80 px-6 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Layers className="h-4 w-4" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white flex items-center gap-2">
              System Design & Distributed Architecture Simulator
            </h1>
            <p className="text-xs text-slate-400">
              Interactive high-concurrency traffic simulator with chaos engineering testing
            </p>
          </div>
        </div>

        {/* Live Metrics Cockpit */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-900 border border-slate-800">
            <Activity className="h-3.5 w-3.5 text-sky-400" />
            <span className="text-slate-400">Avg Latency:</span>
            <span className={`font-bold tabular-nums ${baseLatency > 50 ? 'text-amber-400' : 'text-emerald-400'}`}>
              {baseLatency}ms
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-900 border border-slate-800">
            <span className="text-slate-400">Cache Hit Rate:</span>
            <span className="font-bold text-amber-300 tabular-nums">{cacheHitRate}%</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-900 border border-slate-800">
            <span className="text-slate-400">Error Rate:</span>
            <span className={`font-bold tabular-nums ${errorRatePercent > 0 ? 'text-rose-400 animate-pulse' : 'text-emerald-400'}`}>
              {errorRatePercent}%
            </span>
          </div>
        </div>
      </div>

      {/* Main split: Controls left, Canvas center/right */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Controls Deck */}
        <div className="w-full lg:w-80 border-r border-slate-800 bg-slate-950 p-4 space-y-5 overflow-y-auto shrink-0 text-xs">
          {/* RPS Load Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-slate-300">Inbound Traffic Load</span>
              <span className="font-mono text-amber-400 font-bold tabular-nums">{rps.toLocaleString()} RPS</span>
            </div>
            <input
              type="range"
              min="500"
              max="20000"
              step="500"
              value={rps}
              onChange={(e) => setRps(parseInt(e.target.value, 10))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>500 RPS</span>
              <span>10,000 RPS</span>
              <span>20,000 RPS</span>
            </div>
          </div>

          {/* Architecture Topology Toggles */}
          <div className="space-y-2.5 pt-2 border-t border-slate-800">
            <span className="font-semibold text-slate-300 block">Topology Configuration</span>

            {/* App Replicas */}
            <div className="flex items-center justify-between p-2 rounded bg-slate-900/60 border border-slate-800">
              <span className="text-slate-300">Go App Replicas</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setAppReplicas(Math.max(1, appReplicas - 1))}
                  className="w-5 h-5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-center"
                >
                  -
                </button>
                <span className="font-mono font-bold text-amber-400 tabular-nums">{appReplicas}</span>
                <button
                  onClick={() => setAppReplicas(Math.min(6, appReplicas + 1))}
                  className="w-5 h-5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-center"
                >
                  +
                </button>
              </div>
            </div>

            {/* Redis Caching */}
            <label className="flex items-center justify-between p-2 rounded bg-slate-900/60 border border-slate-800 cursor-pointer">
              <span className="text-slate-300">Redis In-Memory Cache</span>
              <input
                type="checkbox"
                checked={cachingEnabled}
                onChange={(e) => setCachingEnabled(e.target.checked)}
                className="rounded border-slate-700 bg-slate-950 text-amber-500 focus:ring-0"
              />
            </label>

            {/* Read Replicas */}
            <label className="flex items-center justify-between p-2 rounded bg-slate-900/60 border border-slate-800 cursor-pointer">
              <span className="text-slate-300">PostgreSQL Read Replica</span>
              <input
                type="checkbox"
                checked={dbReadReplica}
                onChange={(e) => setDbReadReplica(e.target.checked)}
                className="rounded border-slate-700 bg-slate-950 text-amber-500 focus:ring-0"
              />
            </label>

            {/* Kafka */}
            <label className="flex items-center justify-between p-2 rounded bg-slate-900/60 border border-slate-800 cursor-pointer">
              <span className="text-slate-300">Kafka Async Event Stream</span>
              <input
                type="checkbox"
                checked={kafkaAsyncQueue}
                onChange={(e) => setKafkaAsyncQueue(e.target.checked)}
                className="rounded border-slate-700 bg-slate-950 text-amber-500 focus:ring-0"
              />
            </label>
          </div>

          {/* Chaos Engineering Suite */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <span className="font-semibold text-rose-400 flex items-center gap-1.5">
              <ShieldAlert className="h-4 w-4" /> Chaos Engineering Injection
            </span>
            <div className="space-y-1.5">
              <button
                onClick={() => triggerChaos('cache-down')}
                className={`w-full text-left p-2 rounded text-xs transition-all border ${
                  chaosMode === 'cache-down'
                    ? 'bg-rose-950/40 border-rose-500 text-rose-200 font-semibold'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {chaosMode === 'cache-down' ? '● Kill Redis Cache (Active)' : 'Inject: Redis Cache Outage'}
              </button>

              <button
                onClick={() => triggerChaos('high-latency')}
                className={`w-full text-left p-2 rounded text-xs transition-all border ${
                  chaosMode === 'high-latency'
                    ? 'bg-rose-950/40 border-rose-500 text-rose-200 font-semibold'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {chaosMode === 'high-latency' ? '● 150ms DB Lag (Active)' : 'Inject: Network Jitter (+120ms)'}
              </button>
            </div>
          </div>
        </div>

        {/* Visual Architecture Canvas */}
        <div className="flex-1 bg-slate-950 relative overflow-auto p-6 flex flex-col items-center justify-center">
          {/* Animated Background Grid */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px] opacity-40" />

          {/* Node Flow Representation */}
          <div className="relative z-10 w-full max-w-4xl space-y-6">
            {/* Top Tier: Traffic & CDN */}
            <div className="flex justify-center gap-8">
              <div className="flex flex-col items-center p-3 rounded-lg border border-slate-800 bg-slate-900/90 shadow-lg text-center w-48">
                <Radio className="h-5 w-5 text-sky-400 animate-pulse mb-1" />
                <span className="font-semibold text-slate-200 text-xs">Global Client Fleet</span>
                <span className="text-[10px] text-slate-400 font-mono tabular-nums">{rps.toLocaleString()} req/sec</span>
              </div>
            </div>

            {/* Connection Arrow */}
            <div className="flex justify-center">
              <div className="h-6 w-0.5 bg-gradient-to-b from-sky-500 to-amber-500 animate-pulse" />
            </div>

            {/* Load Balancer Tier */}
            <div className="flex justify-center">
              <div className="flex flex-col items-center p-3.5 rounded-lg border border-amber-500/40 bg-slate-900/90 shadow-lg text-center w-64">
                <Layers className="h-5 w-5 text-amber-400 mb-1" />
                <span className="font-semibold text-amber-300 text-xs">L7 Reverse Proxy & Load Balancer</span>
                <span className="text-[10px] text-slate-400 font-mono">HAProxy (Round Robin)</span>
              </div>
            </div>

            {/* Connection Fan-Out */}
            <div className="flex justify-center">
              <div className="h-6 w-48 border-t-2 border-x-2 border-amber-500/40" />
            </div>

            {/* App Tier Replicas */}
            <div className="flex justify-center gap-4 flex-wrap">
              {Array.from({ length: appReplicas }).map((_, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col items-center p-3 rounded-lg border bg-slate-900/90 shadow-md text-center w-36 transition-all ${
                    isOverloaded ? 'border-rose-500 bg-rose-950/20' : 'border-cyan-500/40'
                  }`}
                >
                  <Cpu className="h-4 w-4 text-cyan-400 mb-1" />
                  <span className="font-semibold text-slate-200 text-xs">Go Pod #{idx + 1}</span>
                  <span className="text-[10px] text-slate-400 font-mono tabular-nums">
                    {Math.round(rps / appReplicas)} RPS
                  </span>
                </div>
              ))}
            </div>

            {/* Data Layer: Cache & Database */}
            <div className="flex justify-center gap-8 pt-4">
              {/* Redis Cache */}
              <div
                className={`flex flex-col items-center p-3.5 rounded-lg border shadow-lg text-center w-52 transition-all ${
                  cachingEnabled && chaosMode !== 'cache-down'
                    ? 'border-emerald-500/40 bg-slate-900/90'
                    : 'border-slate-800 bg-slate-900/40 opacity-50'
                }`}
              >
                <HardDrive className={`h-5 w-5 mb-1 ${cachingEnabled && chaosMode !== 'cache-down' ? 'text-emerald-400' : 'text-slate-600'}`} />
                <span className="font-semibold text-slate-200 text-xs">Redis Cache Cluster</span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {cachingEnabled && chaosMode !== 'cache-down' ? `${cacheHitRate}% Hit Rate (O(1))` : 'DISABLED / OUTAGE'}
                </span>
              </div>

              {/* PostgreSQL Primary & Replica */}
              <div className="flex flex-col items-center p-3.5 rounded-lg border border-emerald-500/40 bg-slate-900/90 shadow-lg text-center w-52">
                <Database className="h-5 w-5 text-emerald-400 mb-1" />
                <span className="font-semibold text-slate-200 text-xs">PostgreSQL 16 Cluster</span>
                <span className="text-[10px] text-slate-400 font-mono tabular-nums">
                  {rawDbQueries.toLocaleString()} Direct Reads/sec
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
