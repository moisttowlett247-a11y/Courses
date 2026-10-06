import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Sparkles, Folder, Play } from 'lucide-react';
import { playSound } from '../../utils/soundEffects';

interface TerminalFile {
  name: string;
  type: 'file' | 'dir';
  content?: string;
  permissions?: string;
  size?: number;
}

export const TerminalEmulator: React.FC = () => {
  const [history, setHistory] = useState<Array<{ command: string; output: string | React.ReactNode; isError?: boolean }>>([
    {
      command: 'uname -a && whoami',
      output: 'Linux bootforge-kernel 6.8.0-backend x86_64 GNU/Linux\nadventurer'
    },
    {
      command: 'ls -la',
      output: 'drwxr-xr-x  5 adventurer backend 4096 Oct  6 12:00 .\ndrwxr-xr-x  3 root       root    4096 Oct  6 10:00 ..\n-rw-r--r--  1 adventurer backend  842 Oct  6 12:01 server.log\n-rw-r--r--  1 adventurer backend  320 Oct  6 11:45 config.yaml\n-rwxr-xr-x  1 adventurer backend 1024 Oct  6 11:50 deploy.sh\ndrwxr-xr-x  2 adventurer backend 4096 Oct  6 12:00 src'
    }
  ]);

  const [inputVal, setInputVal] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const fileSystem: Record<string, string> = {
    'server.log': `[2026-10-06 12:00:01] INFO  Starting HTTP gateway on port :8080
[2026-10-06 12:00:02] INFO  Database connection pool established (pool_size=20)
[2026-10-06 12:00:05] WARN  High latency detected on Redis replica (latency=42ms)
[2026-10-06 12:00:10] ERROR ConnectionTimeout: upstream auth microservice timed out after 5000ms
[2026-10-06 12:00:11] ERROR DeadlockDetected: transaction 891 aborted by deadlock detector
[2026-10-06 12:00:15] ERROR OutOfMemory: worker thread 4 killed by OOM killer
[2026-10-06 12:00:18] INFO  Graceful recovery initiated on worker thread 4`,
    'config.yaml': `server:
  port: 8080
  environment: production
database:
  host: postgres.internal
  max_connections: 50
cache:
  redis_url: redis://cache.internal:6379`,
    'deploy.sh': `#!/usr/bin/env bash
echo "Building Go binaries..."
go build -o bin/server cmd/main.go
docker build -t bootforge/api:latest .
echo "Deployment ready."`
  };

  const executeCommand = (cmdStr: string) => {
    playSound('key');
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    setCommandHistory(prev => [...prev, trimmed]);
    setHistoryIndex(-1);

    if (trimmed === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    let output: string | React.ReactNode = '';
    let isError = false;

    // Command parser supporting basic pipelines |
    const pipeParts = trimmed.split('|').map(s => s.trim());
    const baseCmd = pipeParts[0];

    if (baseCmd === 'help') {
      output = `BootForge Linux Terminal Emulator:
Available commands:
  ls [-la]              List directory contents
  cat <file>            Print file contents (supports | grep, | wc -l, | sort)
  grep <term> <file>    Search pattern in files
  pwd                   Print current working directory
  whoami                Print current logged in role
  ps [aux]              List active backend processes
  docker ps             List running containers
  git status            Inspect git working tree
  curl <url>            Simulate HTTP API call
  clear                 Clear terminal buffer`;
    } else if (baseCmd === 'pwd') {
      output = '/home/adventurer/backend-services';
    } else if (baseCmd === 'whoami') {
      output = 'adventurer (Level 10 Backend Mage)';
    } else if (baseCmd.startsWith('ls')) {
      output = `config.yaml  deploy.sh  server.log  src/`;
    } else if (baseCmd.startsWith('ps')) {
      output = `PID   USER       CPU%  MEM%  COMMAND
1     root       0.1   0.4   /sbin/init
42    adventurer 2.1   4.5   /usr/local/bin/go run cmd/server.go
88    adventurer 0.0   1.2   redis-server *:6379
104   postgres   1.4   8.2   postgres: writer process`;
    } else if (baseCmd.startsWith('docker ps')) {
      output = `CONTAINER ID   IMAGE                 COMMAND                  CREATED         STATUS         PORTS
7c3a9f01e8b2   bootforge/api:v1.4    "/app/server"            2 hours ago     Up 2 hours     0.0.0.0:8080->8080/tcp
8b2c4d6e9f1a   postgres:16-alpine    "docker-entrypoint.s…"   5 hours ago     Up 5 hours     0.0.0.0:5432->5432/tcp
1f4e5a9b8c7d   redis:7.2             "docker-entrypoint.s…"   5 hours ago     Up 5 hours     0.0.0.0:6379->6379/tcp`;
    } else if (baseCmd.startsWith('git status')) {
      output = `On branch main
Your branch is up to date with 'origin/main'.

Changes not staged for commit:
  modified:   server.go (refactored goroutine worker pool)
  modified:   config.yaml

no changes added to commit (use "git add <file>..." to update what will be committed)`;
    } else if (baseCmd.startsWith('curl')) {
      output = `HTTP/1.1 200 OK
Content-Type: application/json
Date: Tue, 06 Oct 2026 12:00:00 GMT
Server: BootForge/2.0

{
  "status": "healthy",
  "uptime_seconds": 86400,
  "active_goroutines": 142,
  "memory_alloc_mb": 64.8
}`;
    } else if (baseCmd.startsWith('cat')) {
      const fileName = baseCmd.replace('cat', '').trim();
      let fileContent = fileSystem[fileName];

      if (!fileContent) {
        output = `cat: ${fileName}: No such file or directory`;
        isError = true;
      } else {
        // Apply pipes if present
        if (pipeParts.length > 1) {
          let piped = fileContent.split('\n');
          for (let i = 1; i < pipeParts.length; i++) {
            const p = pipeParts[i];
            if (p.startsWith('grep')) {
              const term = p.replace('grep', '').trim().replace(/['"]/g, '');
              piped = piped.filter(line => line.includes(term));
            } else if (p.startsWith('wc -l')) {
              piped = [String(piped.length)];
            } else if (p === 'sort') {
              piped = piped.sort();
            }
          }
          output = piped.join('\n');
        } else {
          output = fileContent;
        }
      }
    } else {
      output = `bash: command not found: ${trimmed}. Type 'help' for available commands.`;
      isError = true;
    }

    setHistory(prev => [...prev, { command: trimmed, output, isError }]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx = historyIndex + 1 < commandHistory.length ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIdx);
        setInputVal(commandHistory[commandHistory.length - 1 - nextIdx] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(commandHistory[commandHistory.length - 1 - nextIdx] || '');
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
    }
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-3.5rem)] bg-slate-950 overflow-hidden font-mono">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/80 px-6 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-500/10 border border-pink-500/30 text-pink-400">
            <TerminalIcon className="h-4 w-4" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white font-sans flex items-center gap-2">
              Linux Shell, Bash & Pipeline Sandbox
            </h1>
            <p className="text-xs text-slate-400 font-sans">
              Unix pipes, grep filters, process controls, Docker and Git command simulator
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 font-sans text-xs">
          <button
            onClick={() => executeCommand('cat server.log | grep ERROR | wc -l')}
            className="px-2.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            Count Errors Pipe
          </button>
          <button
            onClick={() => executeCommand('docker ps')}
            className="px-2.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            docker ps
          </button>
          <button
            onClick={() => executeCommand('curl http://localhost:8080/healthz')}
            className="px-2.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            curl /healthz
          </button>
        </div>
      </div>

      {/* Terminal Viewport */}
      <div 
        onClick={() => inputRef.current?.focus()}
        className="flex-1 overflow-y-auto p-4 bg-slate-950 text-slate-200 text-xs leading-relaxed space-y-3 cursor-text"
      >
        <div className="text-slate-500 text-[11px] mb-2 font-sans">
          Type <code className="text-amber-400 font-mono">help</code> for a list of available Linux tools, pipes, and inspection utilities.
        </div>

        {history.map((entry, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center gap-2 text-slate-400">
              <span className="text-emerald-400 font-semibold">adventurer@bootforge</span>
              <span className="text-slate-600">:</span>
              <span className="text-sky-400 font-semibold">~/backend</span>
              <span className="text-slate-600">$</span>
              <span className="text-amber-300">{entry.command}</span>
            </div>
            <div className={`whitespace-pre-wrap ${entry.isError ? 'text-rose-400' : 'text-slate-300'}`}>
              {entry.output}
            </div>
          </div>
        ))}

        {/* Live prompt */}
        <div className="flex items-center gap-2 text-slate-400 pt-1">
          <span className="text-emerald-400 font-semibold">adventurer@bootforge</span>
          <span className="text-slate-600">:</span>
          <span className="text-sky-400 font-semibold">~/backend</span>
          <span className="text-slate-600">$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            spellCheck={false}
            className="flex-1 bg-transparent text-amber-300 outline-none border-none p-0 focus:ring-0 text-xs font-mono"
          />
        </div>
        <div ref={terminalEndRef} />
      </div>
    </div>
  );
};
