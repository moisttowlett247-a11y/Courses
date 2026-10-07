import React, { useState } from 'react';
import { ExecutionResult } from '../../utils/codeRunner';
import { CheckCircle2, XCircle, Clock, Terminal, Table as TableIcon, Sparkles, AlertTriangle, Play } from 'lucide-react';

interface TestResultsPanelProps {
  results: ExecutionResult | null;
  isRunning: boolean;
  onAskAIDiagnose?: (errorMessage: string) => void;
  onRun?: () => void;
}

export const TestResultsPanel: React.FC<TestResultsPanelProps> = ({
  results,
  isRunning,
  onAskAIDiagnose,
  onRun
}) => {
  const [activeTab, setActiveTab] = useState<'tests' | 'console' | 'table'>('tests');

  if (isRunning) {
    return (
      <div className="flex h-48 items-center justify-center border-t border-slate-800 bg-slate-950 text-slate-400 text-xs">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" />
          <span>Executing backend tests & validating assertions...</span>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="flex h-36 flex-col items-center justify-center border-t border-slate-800 bg-slate-950/60 text-slate-500 text-xs gap-2">
        <div className="flex items-center gap-1.5 font-mono">
          <Terminal className="h-4 w-4 text-slate-600" />
          <span>Ready to execute backend test suite</span>
        </div>
        {onRun && (
          <button
            onClick={onRun}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-md font-medium cursor-pointer transition-colors"
          >
            <Play className="h-3.5 w-3.5 fill-amber-300" />
            <span>Run Code & Verify</span>
          </button>
        )}
      </div>
    );
  }

  const passedTests = results.testResults.filter(t => t.passed).length;
  const totalTests = results.testResults.length;

  return (
    <div className="flex flex-col h-56 border-t border-slate-800 bg-slate-950 font-mono text-xs">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/80 px-3 py-1.5">
        <div className="flex items-center gap-3">
          {/* Status summary */}
          <div className="flex items-center gap-1.5">
            {results.success ? (
              <span className="flex items-center gap-1 font-semibold text-emerald-400">
                <CheckCircle2 className="h-4 w-4" /> Passed ({passedTests}/{totalTests})
              </span>
            ) : (
              <span className="flex items-center gap-1 font-semibold text-rose-400">
                <XCircle className="h-4 w-4" /> Failed ({passedTests}/{totalTests})
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-[11px] text-slate-500">
            <Clock className="h-3 w-3" />
            <span className="tabular-nums">{results.executionTimeMs}ms</span>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 font-sans text-xs">
          <button
            onClick={() => setActiveTab('tests')}
            className={`px-2 py-0.5 rounded transition-colors ${
              activeTab === 'tests' ? 'bg-slate-800 text-amber-300 font-medium' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Tests ({passedTests}/{totalTests})
          </button>
          {results.tabularData && (
            <button
              onClick={() => setActiveTab('table')}
              className={`flex items-center gap-1 px-2 py-0.5 rounded transition-colors ${
                activeTab === 'table' ? 'bg-slate-800 text-emerald-300 font-medium' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <TableIcon className="h-3 w-3" /> Results Table
            </button>
          )}
          <button
            onClick={() => setActiveTab('console')}
            className={`px-2 py-0.5 rounded transition-colors ${
              activeTab === 'console' ? 'bg-slate-800 text-slate-200 font-medium' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Console Logs
          </button>
        </div>
      </div>

      {/* Content Body */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {activeTab === 'tests' && (
          <div className="space-y-2">
            {results.testResults.map((test) => (
              <div
                key={test.id}
                className={`rounded border p-2.5 ${
                  test.passed
                    ? 'border-emerald-950/60 bg-emerald-950/15 text-emerald-200'
                    : 'border-rose-900/50 bg-rose-950/20 text-rose-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    {test.passed ? (
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    ) : (
                      <XCircle className="h-3.5 w-3.5 text-rose-400" />
                    )}
                    <span className="font-semibold text-slate-200">{test.name}</span>
                  </div>

                  {!test.passed && onAskAIDiagnose && (
                    <button
                      onClick={() => onAskAIDiagnose(test.error || `Expected: ${JSON.stringify(test.expected)}, Got: ${JSON.stringify(test.actual)}`)}
                      className="flex items-center gap-1 text-[11px] font-sans text-amber-400 hover:text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30 transition-colors"
                    >
                      <Sparkles className="h-3 w-3" /> Diagnose with AI
                    </button>
                  )}
                </div>

                {!test.passed && (
                  <div className="mt-2 space-y-1 text-[11px] font-mono text-slate-300 bg-slate-950/80 p-2 rounded">
                    <div>
                      <span className="text-slate-500">Expected: </span>
                      <span className="text-emerald-400">{JSON.stringify(test.expected)}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Actual:   </span>
                      <span className="text-rose-400">{JSON.stringify(test.actual)}</span>
                    </div>
                    {test.error && (
                      <div className="text-rose-400 pt-1 text-[10px]">
                        {test.error}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'table' && results.tabularData && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[11px] border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400">
                  {results.tabularData.columns.map((col, idx) => (
                    <th key={idx} className="p-1.5 font-mono font-medium">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-200">
                {results.tabularData.rows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-900/40">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="p-1.5 font-mono">{String(cell)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'console' && (
          <div className="space-y-1 text-slate-400 text-xs">
            {results.logs.length > 0 ? (
              results.logs.map((log, idx) => (
                <div key={idx} className="leading-relaxed">{log}</div>
              ))
            ) : (
              <div className="text-slate-600">No output printed.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
