import React, { useState } from 'react';
import { portfolioProjects } from '../../data/portfolioProjectsData';
import { PortfolioProject } from '../../types/curriculum';
import { Briefcase, Download, Copy, Check, FileCode, Sparkles, FolderGit2, CheckCircle2 } from 'lucide-react';
import { playSound } from '../../utils/soundEffects';

export const PortfolioProjectsView: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<PortfolioProject>(portfolioProjects[0]);
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const activeFile = selectedProject.files[activeFileIndex] || selectedProject.files[0];

  const handleCopyCode = () => {
    playSound('key');
    navigator.clipboard.writeText(activeFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadReadme = () => {
    playSound('gem');
    const blob = new Blob([selectedProject.githubReadmeMarkdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedProject.id}-README.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-3.5rem)] bg-slate-950 overflow-hidden">
      {/* Top Header */}
      <div className="border-b border-slate-800 bg-slate-900/60 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <FolderGit2 className="h-4 w-4" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white flex items-center gap-2">
              Portfolio & Resume Project Exporter
            </h1>
            <p className="text-xs text-slate-400">
              Complete standalone backend projects ready to commit to your GitHub profile
            </p>
          </div>
        </div>

        <button
          onClick={handleDownloadReadme}
          className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold px-4 py-2 text-xs rounded-md shadow-sm transition-all cursor-pointer active:scale-95"
        >
          <Download className="h-4 w-4" />
          <span>Export GitHub README</span>
        </button>
      </div>

      {/* Main Split: Projects Sidebar Left, Code & Architecture Right */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Sidebar: Projects List */}
        <div className="w-full md:w-80 border-r border-slate-800 bg-slate-950 p-4 space-y-3 overflow-y-auto shrink-0">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Capstone Project Repositories
          </span>

          <div className="space-y-2">
            {portfolioProjects.map((proj) => {
              const isSelected = selectedProject.id === proj.id;

              return (
                <button
                  key={proj.id}
                  onClick={() => {
                    playSound('key');
                    setSelectedProject(proj);
                    setActiveFileIndex(0);
                  }}
                  className={`w-full text-left p-3 rounded-xl border transition-all ${
                    isSelected
                      ? 'border-emerald-500/50 bg-emerald-950/20 shadow-md'
                      : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold text-white mb-1">{proj.title}</div>
                  <div className="text-[10px] text-amber-400/90 font-mono mb-1.5">{proj.tag}</div>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-snug">
                    {proj.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Center & Right: Architecture Summary & File Viewer */}
        <div className="flex-1 flex flex-col overflow-hidden bg-slate-950">
          {/* Project Details Banner */}
          <div className="p-4 border-b border-slate-800 bg-slate-900/30 space-y-3 overflow-y-auto max-h-48 shrink-0">
            <div>
              <h2 className="text-base font-bold text-white">{selectedProject.title}</h2>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                {selectedProject.architectureOverview}
              </p>
            </div>

            {/* Tech Stack Pills */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {selectedProject.techStack.map((tech, idx) => (
                <span key={idx} className="bg-slate-800 px-2.5 py-0.5 rounded text-[10px] font-mono text-emerald-300">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* File Viewer Toolbar */}
          <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/70 px-4 py-2">
            {/* File Tabs */}
            <div className="flex items-center gap-1">
              {selectedProject.files.map((f, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveFileIndex(idx)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-mono transition-colors ${
                    activeFileIndex === idx
                      ? 'bg-slate-800 text-amber-300 font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <FileCode className="h-3.5 w-3.5 text-amber-400" />
                  <span>{f.filename}</span>
                </button>
              ))}
            </div>

            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 bg-slate-800 px-2.5 py-1 rounded transition-colors"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy File'}</span>
            </button>
          </div>

          {/* Code Viewer Body */}
          <div className="flex-1 overflow-auto p-4 bg-slate-950 font-mono text-xs leading-relaxed text-slate-200">
            <pre>{activeFile.code}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};
