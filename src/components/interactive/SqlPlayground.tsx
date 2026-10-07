import React, { useState } from 'react';
import { initialSqlDatabase, executeSqlQuery } from '../../utils/codeRunner';
import { Database, Play, Table as TableIcon, Sparkles, RefreshCw, Layers } from 'lucide-react';
import { playSound } from '../../utils/soundEffects';

export const SqlPlayground: React.FC = () => {
  const [query, setQuery] = useState(`SELECT users.name, orders.product, orders.amount, orders.status
FROM users
JOIN orders ON users.id = orders.user_id
WHERE orders.status = 'completed'
ORDER BY orders.amount DESC;`);

  const [activeSchemaTable, setActiveSchemaTable] = useState<'users' | 'orders' | 'servers'>('users');
  const [queryResult, setQueryResult] = useState<any>(() => executeSqlQuery(`SELECT users.name, orders.product, orders.amount, orders.status
FROM users
JOIN orders ON users.id = orders.user_id
WHERE orders.status = 'completed'
ORDER BY orders.amount DESC;`));

  const handleRun = () => {
    playSound('key');
    const res = executeSqlQuery(query);
    setQueryResult(res);
    if (!res.error) {
      playSound('pass');
    } else {
      playSound('fail');
    }
  };

  const sampleQueries = [
    {
      title: 'Top Spenders (JOIN & Order)',
      sql: `SELECT users.name, SUM(orders.amount) AS total_spent
FROM users
JOIN orders ON users.id = orders.user_id
WHERE orders.status = 'completed'
GROUP BY users.name
ORDER BY total_spent DESC;`
    },
    {
      title: 'Active High-Load Servers',
      sql: `SELECT id, region, cpu_cores, ram_gb, load_percent
FROM servers
WHERE load_percent > 50
ORDER BY load_percent DESC;`
    },
    {
      title: 'Role Breakdown & Average Age',
      sql: `SELECT role, COUNT(*) AS count, AVG(age) AS avg_age
FROM users
GROUP BY role
ORDER BY count DESC;`
    }
  ];

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-3.5rem)] bg-slate-950 overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/80 px-6 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <Database className="h-4 w-4" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white flex items-center gap-2">
              Interactive SQL Studio & Query Engine
            </h1>
            <p className="text-xs text-slate-400">
              In-browser relational database query executor with live schema inspection
            </p>
          </div>
        </div>

        <button
          onClick={handleRun}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-semibold px-4 py-2 text-xs rounded-md shadow-sm active:scale-95 transition-all cursor-pointer"
        >
          <Play className="h-4 w-4 fill-slate-950" />
          <span>Execute Query (⌘↵)</span>
        </button>
      </div>

      {/* Main Grid: Left Schema & Presets, Center Editor, Bottom Results */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Sidebar: Schema Tables */}
        <div className="w-full md:w-64 border-r border-slate-800 bg-slate-950 p-4 space-y-4 overflow-y-auto shrink-0">
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
              Database Schema
            </span>
            <div className="space-y-1">
              {(['users', 'orders', 'servers'] as const).map((tbl) => (
                <button
                  key={tbl}
                  onClick={() => setActiveSchemaTable(tbl)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded text-xs transition-colors ${
                    activeSchemaTable === tbl
                      ? 'bg-slate-800 text-emerald-300 font-medium border border-emerald-500/30'
                      : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                  }`}
                >
                  <span className="font-mono">{tbl}</span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {(initialSqlDatabase as any)[tbl]?.length} rows
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Table Schema Columns */}
          <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-3">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-mono font-semibold text-emerald-400 block">
                TABLE: {activeSchemaTable}
              </span>
              <button
                onClick={() => {
                  const selectAll = `SELECT * FROM ${activeSchemaTable};`;
                  setQuery(selectAll);
                  setQueryResult(executeSqlQuery(selectAll));
                }}
                className="text-[10px] text-emerald-400 hover:text-emerald-300 font-mono underline cursor-pointer"
              >
                SELECT *
              </button>
            </div>
            <div className="space-y-1 text-xs font-mono text-slate-300">
              {Object.keys((initialSqlDatabase as any)[activeSchemaTable][0] || {}).map((col) => (
                <button
                  key={col}
                  onClick={() => {
                    playSound('key');
                    setQuery(prev => prev + (prev.trim().endsWith(',') || prev.trim().endsWith('SELECT') ? ` ${col}` : `, ${col}`));
                  }}
                  title={`Click to insert "${col}" into query`}
                  className="w-full flex justify-between text-[11px] text-slate-400 hover:text-emerald-300 hover:bg-slate-800/60 px-1 py-0.5 rounded cursor-pointer transition-colors"
                >
                  <span>{col}</span>
                  <span className="text-slate-600 text-[10px]">
                    {typeof (initialSqlDatabase as any)[activeSchemaTable][0][col]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Sample Query Presets */}
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
              Preset Recipes
            </span>
            <div className="space-y-1.5">
              {sampleQueries.map((sq, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setQuery(sq.sql);
                    const res = executeSqlQuery(sq.sql);
                    setQueryResult(res);
                  }}
                  className="w-full text-left p-2 rounded bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-emerald-500/40 text-xs transition-colors"
                >
                  <div className="font-medium text-slate-200 mb-0.5">{sq.title}</div>
                  <div className="text-[10px] text-slate-500 font-mono truncate">{sq.sql.split('\n')[0]}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Center & Right: Code Editor & Result Grid */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* SQL Editor Area */}
          <div className="h-1/2 flex flex-col border-b border-slate-800 bg-slate-950">
            <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-slate-900/40 text-xs text-slate-400 font-mono">
              <span>query.sql</span>
              <span className="text-slate-500">PostgreSQL / SQLite In-Memory Engine</span>
            </div>
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                  e.preventDefault();
                  handleRun();
                }
              }}
              spellCheck={false}
              className="flex-1 p-4 bg-transparent text-slate-100 font-mono text-xs leading-relaxed resize-none outline-none focus:ring-0 selection:bg-emerald-500/30"
              placeholder="-- Write SQL query..."
            />
          </div>

          {/* Table Result Grid */}
          <div className="h-1/2 flex flex-col bg-slate-950 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-slate-900/40 text-xs">
              <div className="flex items-center gap-2 font-mono">
                <TableIcon className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-slate-300">Query Output</span>
                {queryResult && !queryResult.error && (
                  <span className="text-slate-500 text-[11px] tabular-nums">({queryResult.count} rows)</span>
                )}
              </div>

              {queryResult?.error && (
                <span className="text-rose-400 font-mono text-xs">SQL Error</span>
              )}
            </div>

            <div className="flex-1 overflow-auto p-4">
              {queryResult?.error ? (
                <div className="rounded-md border border-rose-900/40 bg-rose-950/20 p-3 font-mono text-xs text-rose-300">
                  {queryResult.error}
                </div>
              ) : queryResult?.rows?.length > 0 ? (
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400">
                      {queryResult.columns.map((col: string, idx: number) => (
                        <th key={idx} className="p-2 font-mono font-semibold">{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-200">
                    {queryResult.rows.map((row: any[], rIdx: number) => (
                      <tr key={rIdx} className="hover:bg-slate-900/40 transition-colors">
                        {row.map((cell: any, cIdx: number) => (
                          <td key={cIdx} className="p-2 font-mono">{String(cell)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-slate-500 text-xs font-mono">No rows returned.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
