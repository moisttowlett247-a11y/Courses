import React, { useState } from 'react';
import { CertificationExam, EarnedCertificate, UserStats } from '../../types/curriculum';
import { certificationExams, certificationStudyGuides, industryCertMappings } from '../../data/certificationData';
import { bachelorDegreeProgram, calculateDegreeAudit, generateAcademicTranscript } from '../../data/degreeData';
import { 
  Award, CheckCircle2, AlertCircle, Clock, Sparkles, Trophy, ArrowRight, ArrowLeft, 
  RefreshCw, Printer, ShieldCheck, HelpCircle, GraduationCap, FileText, BookOpen, 
  Layers, ExternalLink, ChevronDown, ChevronUp, Star, BadgeCheck, Compass, BookA, 
  Cpu, Database, Terminal, Check, X
} from 'lucide-react';
import { playSound } from '../../utils/soundEffects';
import confetti from 'canvas-confetti';

interface CertificationCenterProps {
  userStats: UserStats;
  onCertificateEarned: (certificate: EarnedCertificate) => void;
  onUpdateStudentName: (name: string) => void;
  onNavigateToTrack?: (trackId: string) => void;
}

export const CertificationCenter: React.FC<CertificationCenterProps> = ({
  userStats,
  onCertificateEarned,
  onUpdateStudentName,
  onNavigateToTrack
}) => {
  // Navigation tabs: 'degree' | 'exams' | 'study-guides' | 'industry-mapping' | 'my-diplomas'
  const [activeHubTab, setActiveHubTab] = useState<'degree' | 'exams' | 'study-guides' | 'industry-mapping' | 'my-diplomas'>('degree');
  
  // Exam simulator state
  const [selectedExam, setSelectedExam] = useState<CertificationExam | null>(null);
  const [isExamActive, setIsExamActive] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [viewingCertificate, setViewingCertificate] = useState<EarnedCertificate | null>(null);
  
  // Modals for official credentials
  const [viewingDegreeDiploma, setViewingDegreeDiploma] = useState(false);
  const [viewingTranscript, setViewingTranscript] = useState(false);

  // Study guide selection
  const [selectedStudyGuideId, setSelectedStudyGuideId] = useState<string>('cert-python-foundations');
  const [expandedSemesterId, setExpandedSemesterId] = useState<string | null>('sem-1');
  const [studentNameInput, setStudentNameInput] = useState(userStats.studentName || 'Adventurer');

  // Compute live Degree Audit and Academic Transcript
  const degreeAudit = calculateDegreeAudit(userStats);
  const transcript = generateAcademicTranscript(userStats);

  const handleStartExam = (exam: CertificationExam) => {
    playSound('key');
    setSelectedExam(exam);
    setIsExamActive(true);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setExamSubmitted(false);
    setViewingCertificate(null);
  };

  const handleSelectAnswer = (qId: string, optionIdx: number) => {
    playSound('key');
    setSelectedAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const handleSubmitExam = () => {
    if (!selectedExam) return;
    playSound('key');
    setExamSubmitted(true);

    // Calculate score
    let correctCount = 0;
    selectedExam.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });

    const scorePercent = Math.round((correctCount / selectedExam.questions.length) * 100);

    if (scorePercent >= selectedExam.passingScorePercent) {
      playSound('levelUp');
      confetti({ particleCount: 180, spread: 90, origin: { y: 0.5 } });

      const newCert: EarnedCertificate = {
        id: `cert-${Date.now()}`,
        examId: selectedExam.id,
        credentialTitle: selectedExam.credentialTitle,
        studentName: studentNameInput.trim() || 'Backend Engineer',
        scorePercent,
        issuedDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        verificationCode: `BF-${selectedExam.id.slice(5, 9).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
        badgeName: selectedExam.badgeName,
        honors: scorePercent >= 90
      };

      onCertificateEarned(newCert);
      setViewingCertificate(newCert);
    } else {
      playSound('fail');
    }
  };

  const activeQuestion = selectedExam?.questions[currentQuestionIndex];
  const allAnswered = selectedExam ? selectedExam.questions.every(q => selectedAnswers[q.id] !== undefined) : false;
  const currentStudyGuide = certificationStudyGuides[selectedStudyGuideId] || certificationStudyGuides['cert-python-foundations'];

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-3.5rem)] bg-slate-950 overflow-y-auto">
      {/* ========================================================================= */}
      {/* MODAL 1: OFFICIAL BACHELOR OF SCIENCE DEGREE DIPLOMA */}
      {/* ========================================================================= */}
      {viewingDegreeDiploma && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="max-w-4xl w-full my-auto space-y-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setViewingDegreeDiploma(false)}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" /> Close Diploma View
              </button>

              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 text-xs rounded-lg shadow transition-colors cursor-pointer"
              >
                <Printer className="h-4 w-4" /> Print / Save B.S. Diploma (PDF)
              </button>
            </div>

            {/* Official Diploma Parchment */}
            <div className="relative rounded-2xl border-4 border-amber-500/70 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 p-8 md:p-14 text-center shadow-2xl overflow-hidden text-slate-100">
              {/* Corner Accents */}
              <div className="absolute top-4 left-4 w-10 h-10 border-t-2 border-l-2 border-amber-400" />
              <div className="absolute top-4 right-4 w-10 h-10 border-t-2 border-r-2 border-amber-400" />
              <div className="absolute bottom-4 left-4 w-10 h-10 border-b-2 border-l-2 border-amber-400" />
              <div className="absolute bottom-4 right-4 w-10 h-10 border-b-2 border-r-2 border-amber-400" />

              {/* Seal */}
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-amber-500 text-slate-950 shadow-xl shadow-amber-500/40 ring-4 ring-amber-400/30">
                <GraduationCap className="h-10 w-10" />
              </div>

              <span className="font-fantasy tracking-widest text-xs uppercase text-amber-400 font-bold block">
                {bachelorDegreeProgram.institution}
              </span>
              <span className="text-[10px] text-slate-400 font-mono tracking-wider block mt-0.5">
                {bachelorDegreeProgram.accreditation}
              </span>

              <h1 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight text-white font-fantasy">
                Degree of Bachelor of Science
              </h1>
              <p className="mt-1 text-sm text-amber-300/90 font-medium">
                in Backend Software Engineering & Distributed Systems
              </p>

              <p className="mt-6 text-xs text-slate-400">
                The Board of Regents and the Faculty of Computing, by virtue of the authority vested in them, hereby confer upon
              </p>

              <div className="my-4 text-3xl md:text-4xl font-bold text-amber-300 font-fantasy underline decoration-amber-500/50 underline-offset-8">
                {transcript.studentName}
              </div>

              <p className="mt-4 text-xs text-slate-300 max-w-2xl mx-auto leading-relaxed">
                this degree with all the honors, rights, and privileges thereunto appertaining, in recognition of the successful completion of the prescribed 120-credit collegiate curriculum, mastery of high-concurrency systems, and successful defense of the Senior Distributed Engineering Capstone.
              </p>

              {degreeAudit.honors && (
                <div className="my-4 inline-block rounded-xl border border-amber-400/50 bg-amber-950/30 px-6 py-2 text-sm font-bold text-amber-200">
                  ★ {degreeAudit.honors} ★
                </div>
              )}

              {/* Signatures & Accreditation Footer */}
              <div className="mt-10 pt-6 border-t border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-400">
                <div className="text-center">
                  <div className="font-fantasy text-amber-300 text-sm mb-1 italic">Dr. Linus M. Torvalds</div>
                  <div className="h-0.5 w-32 bg-slate-700 mx-auto mb-1" />
                  <span className="text-[10px] uppercase text-slate-500 block">Dean of Computer Science</span>
                </div>

                <div className="text-center">
                  <div className="font-mono text-emerald-400 font-bold text-sm mb-1">
                    GPA: {degreeAudit.gpa} / 4.00
                  </div>
                  <div className="h-0.5 w-32 bg-slate-700 mx-auto mb-1" />
                  <span className="text-[10px] uppercase text-slate-500 block">120.00 Semester Credits</span>
                </div>

                <div className="text-center">
                  <div className="font-fantasy text-amber-300 text-sm mb-1 italic">Prof. Grace M. Hopper</div>
                  <div className="h-0.5 w-32 bg-slate-700 mx-auto mb-1" />
                  <span className="text-[10px] uppercase text-slate-500 block">University Registrar</span>
                </div>
              </div>

              <div className="mt-6 text-[10px] font-mono text-slate-500 flex items-center justify-between border-t border-slate-900 pt-3">
                <span>Student ID: {transcript.studentId}</span>
                <span>Verification Hash: {transcript.verificationHash}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: OFFICIAL UNIVERSITY ACADEMIC TRANSCRIPT */}
      {/* ========================================================================= */}
      {viewingTranscript && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="max-w-4xl w-full my-auto space-y-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setViewingTranscript(false)}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" /> Close Academic Transcript
              </button>

              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 text-xs rounded-lg shadow transition-colors cursor-pointer"
              >
                <Printer className="h-4 w-4" /> Print / Save Transcript (PDF)
              </button>
            </div>

            {/* Academic Transcript Sheet */}
            <div className="rounded-2xl border border-slate-700 bg-slate-900 p-8 space-y-6 text-slate-100 shadow-2xl text-xs font-sans">
              {/* Header Banner */}
              <div className="flex items-start justify-between border-b border-slate-800 pb-5">
                <div>
                  <h1 className="text-xl font-bold font-fantasy text-amber-400 tracking-wider">
                    {bachelorDegreeProgram.institution}
                  </h1>
                  <p className="text-[11px] text-slate-400">Office of the University Registrar · Department of Academic Records</p>
                  <p className="text-[10px] font-mono text-slate-500 mt-1">{bachelorDegreeProgram.accreditation}</p>
                </div>

                <div className="text-right">
                  <span className="inline-block px-3 py-1 rounded bg-amber-500/20 text-amber-300 font-mono text-xs font-bold border border-amber-500/40">
                    OFFICIAL RECORD
                  </span>
                  <p className="text-[10px] text-slate-400 font-mono mt-1">Status: {transcript.status.toUpperCase()}</p>
                </div>
              </div>

              {/* Student Metadata Box */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div>
                  <span className="text-[10px] uppercase font-mono text-slate-500 block">Student Name</span>
                  <span className="font-bold text-white text-sm">{transcript.studentName}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-slate-500 block">Student Identification</span>
                  <span className="font-mono text-amber-400">{transcript.studentId}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-slate-500 block">Cumulative GPA</span>
                  <span className="font-mono font-bold text-emerald-400 text-sm">{transcript.cumulativeGpa} / 4.00</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-slate-500 block">Credits Earned / Required</span>
                  <span className="font-mono font-bold text-slate-200 text-sm">
                    {transcript.totalCreditsEarned}.0 / {transcript.totalCreditsRequired}.0
                  </span>
                </div>
              </div>

              {/* Coursework Table */}
              <div className="space-y-4">
                <h3 className="font-bold uppercase tracking-wider text-xs text-slate-300 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-amber-400" /> Complete Collegiate Course History (120 Credits)
                </h3>

                <div className="max-h-96 overflow-y-auto border border-slate-800 rounded-xl">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950 text-slate-400 font-mono text-[11px] sticky top-0 border-b border-slate-800">
                      <tr>
                        <th className="py-2.5 px-3">Course Code</th>
                        <th className="py-2.5 px-3">Course Title</th>
                        <th className="py-2.5 px-3">Credits</th>
                        <th className="py-2.5 px-3">Grade</th>
                        <th className="py-2.5 px-3">Grade Points</th>
                        <th className="py-2.5 px-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                      {transcript.entries.map((entry, idx) => (
                        <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                          <td className="py-2 px-3 font-bold text-amber-300">{entry.courseCode}</td>
                          <td className="py-2 px-3 font-sans text-slate-200">{entry.title}</td>
                          <td className="py-2 px-3 text-slate-400">{entry.credits}.0</td>
                          <td className="py-2 px-3 font-bold text-emerald-400">{entry.grade}</td>
                          <td className="py-2 px-3 text-slate-400">{entry.gradePoints.toFixed(1)}</td>
                          <td className="py-2 px-3">
                            <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-sans font-medium ${
                              entry.status === 'Completed'
                                ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40'
                                : 'bg-slate-800 text-slate-400'
                            }`}>
                              {entry.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Transcript Footer */}
              <div className="pt-4 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] text-slate-400 font-mono">
                <div>
                  Academic Standing: <strong className="text-amber-400">{transcript.academicStanding}</strong>
                </div>
                <div>
                  Cryptographic Verification: <strong className="text-slate-300">{transcript.verificationHash}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEWING EARNED PROFESSIONAL CERTIFICATE (Individual Exam Diploma) */}
      {/* ========================================================================= */}
      {viewingCertificate ? (
        <div className="max-w-4xl mx-auto p-6 space-y-6 w-full my-auto">
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                setViewingCertificate(null);
                setIsExamActive(false);
                setSelectedExam(null);
              }}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Credentials Hub
            </button>

            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 text-xs rounded-md shadow-sm transition-colors cursor-pointer"
            >
              <Printer className="h-4 w-4" /> Print / Save Certificate (PDF)
            </button>
          </div>

          {/* Official Diploma Paper */}
          <div className="relative rounded-2xl border-4 border-amber-500/60 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 p-10 md:p-14 text-center shadow-2xl overflow-hidden text-slate-100">
            {/* Corner Decorative Accents */}
            <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-amber-400" />
            <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-amber-400" />
            <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-amber-400" />
            <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-amber-400" />

            {/* Seal / Badge */}
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-500 text-slate-950 shadow-xl shadow-amber-500/30">
              <Award className="h-9 w-9" />
            </div>

            <span className="font-fantasy tracking-widest text-xs uppercase text-amber-400 font-semibold">
              BootForge Academy of Backend Engineering
            </span>

            <h1 className="mt-2 text-2xl md:text-3xl font-extrabold tracking-tight text-white font-fantasy">
              Certificate of Achievement
            </h1>

            <p className="mt-4 text-xs text-slate-400">
              This official industry credential certifies that
            </p>

            <div className="my-3 text-2xl md:text-3xl font-bold text-amber-300 font-fantasy underline decoration-amber-500/40 underline-offset-8">
              {viewingCertificate.studentName}
            </div>

            <p className="mt-4 text-xs text-slate-300 max-w-xl mx-auto leading-relaxed">
              has successfully mastered the curriculum, solved real-world interactive code challenges, and passed the rigorous examination for
            </p>

            <div className="my-4 inline-block rounded-xl border border-amber-500/40 bg-amber-950/20 px-6 py-2.5 text-base md:text-lg font-bold text-amber-200">
              {viewingCertificate.credentialTitle}
              {viewingCertificate.honors && (
                <span className="ml-2 text-xs font-mono text-amber-400 font-semibold">★ With High Honors</span>
              )}
            </div>

            {/* Bottom Verification Strip */}
            <div className="mt-8 pt-6 border-t border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono text-slate-400">
              <div>
                <span className="block text-[10px] uppercase text-slate-500">Exam Score</span>
                <span className="text-emerald-400 font-bold">{viewingCertificate.scorePercent}%</span>
              </div>

              <div>
                <span className="block text-[10px] uppercase text-slate-500">Date Issued</span>
                <span className="text-slate-200">{viewingCertificate.issuedDate}</span>
              </div>

              <div>
                <span className="block text-[10px] uppercase text-slate-500">Verification ID</span>
                <span className="text-amber-400">{viewingCertificate.verificationCode}</span>
              </div>
            </div>
          </div>
        </div>
      ) : isExamActive && selectedExam ? (
        /* ========================================================================= */
        /* PROCTORED CERTIFICATION EXAM SIMULATOR */
        /* ========================================================================= */
        <div className="max-w-3xl mx-auto p-6 space-y-6 w-full">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono font-semibold text-amber-400 uppercase">
                {selectedExam.title} Certification Exam
              </span>
              <h2 className="text-lg font-bold text-white">
                Question {currentQuestionIndex + 1} of {selectedExam.questions.length}
              </h2>
            </div>

            <button
              onClick={() => {
                setIsExamActive(false);
                setSelectedExam(null);
              }}
              className="text-xs text-slate-500 hover:text-slate-300 cursor-pointer"
            >
              Exit Exam
            </button>
          </div>

          {/* Progress Bar */}
          <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-500 transition-all duration-300"
              style={{ width: `${Math.round(((currentQuestionIndex + 1) / selectedExam.questions.length) * 100)}%` }}
            />
          </div>

          {/* Question Card */}
          {activeQuestion && (
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
              <h3 className="text-base font-semibold text-slate-100 leading-snug">
                {activeQuestion.question}
              </h3>

              {activeQuestion.codeSnippet && (
                <div className="rounded-lg border border-slate-800 bg-slate-950 p-3 font-mono text-xs text-amber-300 overflow-x-auto">
                  <pre>{activeQuestion.codeSnippet}</pre>
                </div>
              )}

              {/* Options */}
              <div className="space-y-2.5 pt-2">
                {activeQuestion.options.map((option, idx) => {
                  const isSelected = selectedAnswers[activeQuestion.id] === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectAnswer(activeQuestion.id, idx)}
                      className={`w-full flex items-center justify-between p-3.5 rounded-lg border text-xs text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-amber-500 bg-amber-950/30 text-amber-200 font-medium'
                          : 'border-slate-800 bg-slate-950 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`flex h-5 w-5 items-center justify-center rounded-full border text-[11px] font-mono shrink-0 ${
                          isSelected ? 'border-amber-400 bg-amber-500 text-slate-950 font-bold' : 'border-slate-700 text-slate-500'
                        }`}>
                          {String.fromCharCode(65 + idx)}
                        </div>
                        <span>{option}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Navigation controls */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  disabled={currentQuestionIndex === 0}
                  onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                  className="px-3 py-1.5 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs disabled:opacity-40 cursor-pointer"
                >
                  Previous
                </button>

                {currentQuestionIndex + 1 < selectedExam.questions.length ? (
                  <button
                    onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                    className="flex items-center gap-1 px-4 py-1.5 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs transition-colors cursor-pointer"
                  >
                    Next Question <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                ) : (
                  <button
                    disabled={!allAnswered}
                    onClick={handleSubmitExam}
                    className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-bold text-xs shadow-md transition-all disabled:opacity-50 cursor-pointer"
                  >
                    <CheckCircle2 className="h-4 w-4" /> Submit Exam for Grading
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Exam Result Review (if failed) */}
          {examSubmitted && !viewingCertificate && (
            <div className="rounded-xl border border-rose-900/60 bg-rose-950/20 p-5 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <AlertCircle className="h-5 w-5" /> Score Did Not Meet Passing Threshold
              </div>
              <p className="text-xs text-slate-300">
                Don't worry! In coding, mistakes are just learning checkpoints. Review the study guides and lesson breakdowns, and retake the exam whenever you're ready!
              </p>
              <button
                onClick={() => handleStartExam(selectedExam)}
                className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded text-xs transition-colors cursor-pointer"
              >
                <RefreshCw className="h-3.5 w-3.5" /> Retake Exam
              </button>
            </div>
          )}
        </div>
      ) : (
        /* ========================================================================= */
        /* MAIN DEGREE & CERTIFICATION HUB DASHBOARD */
        /* ========================================================================= */
        <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6 w-full">
          {/* Header Banner */}
          <div className="space-y-4 border-b border-slate-800 pb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                  <GraduationCap className="h-4 w-4" /> Academic Degree & Professional Certification Hub
                </div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-white font-fantasy tracking-tight mt-1">
                  Credentials, Diplomas & Degree Pathways
                </h1>
                <p className="text-xs text-slate-400 max-w-2xl leading-relaxed mt-1">
                  Accredited curriculum aligned with IEEE/ACM computing standards and leading cloud certifications (AWS, GCP, Linux Foundation). Progress toward your Bachelor of Science or earn verifiable industry certifications.
                </p>
              </div>

              {/* Name Personalization Input */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex flex-col gap-1.5 shrink-0">
                <label className="text-[11px] text-slate-400 font-semibold">
                  Name for Official Diplomas & Transcripts:
                </label>
                <input
                  type="text"
                  value={studentNameInput}
                  onChange={(e) => {
                    setStudentNameInput(e.target.value);
                    onUpdateStudentName(e.target.value);
                  }}
                  placeholder="Enter full legal name"
                  className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-amber-300 font-semibold focus:outline-none focus:border-amber-500 w-64"
                />
              </div>
            </div>

            {/* Navigation Tabs Bar */}
            <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-850">
              <button
                onClick={() => setActiveHubTab('degree')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeHubTab === 'degree'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                    : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <GraduationCap className="h-4 w-4" />
                <span>B.S. Degree Pathway (120 Credits)</span>
              </button>

              <button
                onClick={() => setActiveHubTab('exams')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeHubTab === 'exams'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                    : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <Award className="h-4 w-4" />
                <span>Certification Exams ({certificationExams.length})</span>
              </button>

              <button
                onClick={() => setActiveHubTab('study-guides')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeHubTab === 'study-guides'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                    : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <BookOpen className="h-4 w-4" />
                <span>Exam Study Guides & Cram Sheets</span>
              </button>

              <button
                onClick={() => setActiveHubTab('industry-mapping')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeHubTab === 'industry-mapping'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                    : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <Compass className="h-4 w-4" />
                <span>AWS, GCP & Linux Vendor Mappings</span>
              </button>

              <button
                onClick={() => setActiveHubTab('my-diplomas')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeHubTab === 'my-diplomas'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                    : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <Trophy className="h-4 w-4" />
                <span>My Credentials ({userStats.earnedCertificates?.length || 0})</span>
              </button>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* TAB 1: BACHELOR OF SCIENCE DEGREE AUDIT & CURRICULUM ROADMAP */}
          {/* ========================================================================= */}
          {activeHubTab === 'degree' && (
            <div className="space-y-6">
              {/* Collegiate Degree Audit Summary Banner */}
              <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-950/30 via-slate-900 to-slate-950 p-6 space-y-5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold uppercase">
                      <GraduationCap className="h-4 w-4" /> Academic Degree Progress Audit
                    </div>
                    <h2 className="text-xl font-bold text-white font-fantasy">
                      {bachelorDegreeProgram.title}
                    </h2>
                    <p className="text-xs text-slate-400 max-w-xl">
                      {bachelorDegreeProgram.description}
                    </p>
                  </div>

                  {/* Actions: View Diploma & View Transcript */}
                  <div className="flex items-center gap-2.5 shrink-0">
                    <button
                      onClick={() => setViewingTranscript(true)}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors border border-slate-700 cursor-pointer"
                    >
                      <FileText className="h-4 w-4 text-sky-400" />
                      <span>Academic Transcript</span>
                    </button>

                    <button
                      onClick={() => setViewingDegreeDiploma(true)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold shadow-md shadow-amber-500/20 transition-all cursor-pointer"
                    >
                      <GraduationCap className="h-4 w-4" />
                      <span>{degreeAudit.isGraduationEligible ? 'View Conferred Diploma' : 'Preview Degree Diploma'}</span>
                    </button>
                  </div>
                </div>

                {/* Audit Key Metric Tiles */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                    <span className="text-[10px] uppercase font-mono text-slate-500 block">Credits Earned</span>
                    <span className="text-lg font-bold text-amber-400 font-mono">
                      {degreeAudit.earnedCredits} / 120
                    </span>
                    <span className="text-[10px] text-slate-400 block">{degreeAudit.progressPercent}% Completed</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                    <span className="text-[10px] uppercase font-mono text-slate-500 block">Cumulative GPA</span>
                    <span className="text-lg font-bold text-emerald-400 font-mono">
                      {degreeAudit.gpa} / 4.00
                    </span>
                    <span className="text-[10px] text-slate-400 block">Honors Standard</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                    <span className="text-[10px] uppercase font-mono text-slate-500 block">Academic Standing</span>
                    <span className="text-xs font-bold text-slate-200 block truncate">
                      {degreeAudit.academicStanding}
                    </span>
                    <span className="text-[10px] text-emerald-400 block">Matriculated</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                    <span className="text-[10px] uppercase font-mono text-slate-500 block">Graduation Status</span>
                    <span className={`text-xs font-bold block ${degreeAudit.isGraduationEligible ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {degreeAudit.isGraduationEligible ? 'Graduation Eligible!' : `${degreeAudit.remainingCredits} Credits Remaining`}
                    </span>
                    <span className="text-[10px] text-slate-400 block">B.S. Accredited</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-mono text-slate-400">
                    <span>Degree Completion Progress</span>
                    <span className="text-amber-400 font-bold">{degreeAudit.progressPercent}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-500"
                      style={{ width: `${degreeAudit.progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Graduation Requirements Checklist */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" /> Official Graduation Criteria
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                  {bachelorDegreeProgram.graduationRequirements.map((req, idx) => (
                    <div key={idx} className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80">
                      <div className="mt-0.5 p-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
                        <Check className="h-3 w-3" />
                      </div>
                      <span className="text-slate-300 leading-relaxed text-[11px]">{req}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 8-Semester Curriculum Map */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-amber-400" /> 4-Year Collegiate Semester Map (8 Semesters)
                  </h3>
                  <span className="text-xs font-mono text-slate-400">Click a semester to view courses & syllabi</span>
                </div>

                <div className="space-y-3">
                  {bachelorDegreeProgram.semesters.map((semester) => {
                    const isExpanded = expandedSemesterId === semester.id;
                    const completedInSemester = semester.courses.filter(c => degreeAudit.completedCourseCodes.has(c.code)).length;

                    return (
                      <div
                        key={semester.id}
                        className="rounded-xl border border-slate-800 bg-slate-900/40 overflow-hidden transition-all"
                      >
                        <button
                          onClick={() => setExpandedSemesterId(isExpanded ? null : semester.id)}
                          className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-850 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 font-mono text-xs font-bold text-amber-400 border border-slate-700">
                              Y{semester.yearNumber}S{semester.semesterNumber}
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-white">{semester.name}</h4>
                              <p className="text-[11px] text-slate-400 font-mono">
                                {semester.credits} Credits · {completedInSemester} / {semester.courses.length} Courses Completed
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-[11px] font-mono text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/30 hidden sm:inline">
                              {semester.courses.length} Core Subjects
                            </span>
                            {isExpanded ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
                          </div>
                        </button>

                        {/* Expanded Courses Details */}
                        {isExpanded && (
                          <div className="p-4 border-t border-slate-800/80 bg-slate-950/60 grid grid-cols-1 md:grid-cols-2 gap-3">
                            {semester.courses.map((course) => {
                              const isCourseCompleted = degreeAudit.completedCourseCodes.has(course.code);

                              return (
                                <div
                                  key={course.code}
                                  className={`rounded-lg border p-3.5 space-y-2 transition-all ${
                                    isCourseCompleted
                                      ? 'border-emerald-500/40 bg-emerald-950/10'
                                      : 'border-slate-800 bg-slate-900/60'
                                  }`}
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      <span className="font-mono font-bold text-xs text-amber-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                                        {course.code}
                                      </span>
                                      <span className="font-semibold text-xs text-white truncate max-w-[200px]">
                                        {course.title}
                                      </span>
                                    </div>
                                    <span className="text-[11px] font-mono text-slate-400 shrink-0">
                                      {course.credits} Credits
                                    </span>
                                  </div>

                                  <p className="text-[11px] text-slate-300 leading-relaxed">
                                    {course.description}
                                  </p>

                                  <div className="space-y-1 pt-1.5 border-t border-slate-800/80 text-[10px] text-slate-400">
                                    <div className="flex items-center justify-between">
                                      <span>Prerequisites: <strong className="text-slate-300">{course.prerequisites.join(', ')}</strong></span>
                                      {isCourseCompleted ? (
                                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                                          <CheckCircle2 className="h-3 w-3" /> Completed
                                        </span>
                                      ) : (
                                        <span className="text-amber-400 font-mono">In Progress</span>
                                      )}
                                    </div>
                                    <div className="text-slate-500 truncate">
                                      Readings: {course.recommendedReadings.join(' · ')}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: INDUSTRY CERTIFICATION EXAMS */}
          {/* ========================================================================= */}
          {activeHubTab === 'exams' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Award className="h-4 w-4 text-emerald-400" /> Official Proctored Certification Exams
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    10-Question timed proctored examinations designed to evaluate real production engineering skills. Score 75%+ to earn your verifiable digital diploma.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {certificationExams.map((exam) => {
                  const isEarned = userStats.earnedCertificates?.some(c => c.examId === exam.id);
                  const earnedCert = userStats.earnedCertificates?.find(c => c.examId === exam.id);

                  return (
                    <div
                      key={exam.id}
                      className={`rounded-xl border p-5 flex flex-col justify-between space-y-4 transition-all ${
                        isEarned
                          ? 'border-emerald-500/40 bg-emerald-950/15'
                          : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className={`p-2 rounded-lg ${isEarned ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-amber-400'}`}>
                              <Award className="h-5 w-5" />
                            </div>
                            <div>
                              <h3 className="text-sm font-bold text-white">{exam.title}</h3>
                              <span className="text-[11px] text-slate-400 font-mono">{exam.credentialTitle}</span>
                            </div>
                          </div>

                          {isEarned && (
                            <span className="flex items-center gap-1 text-[11px] font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded border border-emerald-500/40">
                              <CheckCircle2 className="h-3 w-3" /> Certified
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed">
                          {exam.certificateDescription}
                        </p>

                        {/* Skills Tested */}
                        <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                          <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider block">
                            Core Domains Tested ({exam.questions.length} Scenario Questions):
                          </span>
                          <ul className="grid grid-cols-1 gap-1 text-[11px] text-slate-400">
                            {exam.skillsMeasured.slice(0, 4).map((skill, idx) => (
                              <li key={idx} className="flex items-center gap-1.5">
                                <span className="h-1 w-1 rounded-full bg-amber-400" />
                                <span>{skill}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                        <div className="text-[11px] font-mono text-slate-400">
                          Pass: <strong className="text-white">{exam.passingScorePercent}%</strong> · 10 Questions
                        </div>

                        <div className="flex items-center gap-2">
                          {isEarned && earnedCert && (
                            <button
                              onClick={() => setViewingCertificate(earnedCert)}
                              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
                            >
                              View Diploma
                            </button>
                          )}

                          <button
                            onClick={() => handleStartExam(exam)}
                            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all active:scale-95 cursor-pointer ${
                              isEarned
                                ? 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40'
                                : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-md shadow-amber-500/10'
                            }`}
                          >
                            <span>{isEarned ? 'Retake Exam' : 'Take Exam'}</span>
                            <ArrowRight className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: EXAM STUDY GUIDES & MASTER CRAM SHEETS */}
          {/* ========================================================================= */}
          {activeHubTab === 'study-guides' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-amber-400" /> Comprehensive Certification Study Guides & Cram Sheets
                  </h2>
                  <p className="text-xs text-slate-400">
                    High-yield domain objectives, formulas, code patterns, and exam trap alerts.
                  </p>
                </div>

                {/* Exam selector buttons */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                  {certificationExams.map(e => (
                    <button
                      key={e.id}
                      onClick={() => setSelectedStudyGuideId(e.id)}
                      className={`px-2.5 py-1 rounded text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                        selectedStudyGuideId === e.id
                          ? 'bg-amber-500 text-slate-950 font-bold'
                          : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      {e.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Study Guide Content */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white font-fantasy">{currentStudyGuide.title}</h3>
                    <p className="text-xs text-amber-400 font-mono">{currentStudyGuide.credentialTitle}</p>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                    <span>Duration: <strong className="text-white">{currentStudyGuide.examDurationMinutes} min</strong></span>
                    <span>Questions: <strong className="text-white">{currentStudyGuide.totalQuestions}</strong></span>
                    <span>Passing: <strong className="text-emerald-400">{currentStudyGuide.passingScore}%</strong></span>
                  </div>
                </div>

                {/* Weighted Domains Breakdown */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Official Exam Objectives & Domain Weighting
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentStudyGuide.domains.map((dom, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-amber-300">{dom.name}</span>
                          <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                            {dom.weight}% Weight
                          </span>
                        </div>

                        <ul className="space-y-1 text-xs text-slate-400 list-disc list-inside">
                          {dom.coreObjectives.map((obj, i) => (
                            <li key={i} className="text-[11px] leading-relaxed">{obj}</li>
                          ))}
                        </ul>

                        <div className="pt-2 border-t border-slate-850 text-[11px] text-sky-300 font-mono">
                          Tip: {dom.examTips}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Master Cram Notes & Blueprints */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-amber-400" /> High-Yield Cram Notes & Blueprint Cheats
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentStudyGuide.cramNotes.map((note, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                        <span className="font-bold text-xs text-white block">{note.topic}</span>
                        <p className="text-[11px] text-slate-300 leading-relaxed">{note.summary}</p>
                        {note.codeSnippet && (
                          <div className="rounded-lg bg-slate-900 border border-slate-800 p-2.5 font-mono text-[11px] text-amber-300 overflow-x-auto">
                            <pre>{note.codeSnippet}</pre>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 4: INDUSTRY VENDOR CERTIFICATIONS MAPPING */}
          {/* ========================================================================= */}
          {activeHubTab === 'industry-mapping' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Compass className="h-4 w-4 text-emerald-400" /> Real-World Industry Certifications Mapping Guide
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  How BootForge's backend engineering curriculum directly equips you to pass industry exams from AWS, Google Cloud, Linux Foundation, and PostgreSQL.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {industryCertMappings.map((map, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3 hover:border-slate-700 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-slate-800 text-amber-400 border border-slate-700">
                          <Compass className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono text-slate-400 uppercase">{map.vendor}</span>
                            <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-950/60 px-2 py-0.2 rounded border border-amber-500/30">
                              {map.code}
                            </span>
                          </div>
                          <h3 className="text-sm font-bold text-white">{map.certTitle}</h3>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded border border-emerald-500/40">
                          {map.bootforgeEquivalencePercentage}% Curriculum Overlap
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {map.overview}
                    </p>

                    <div className="pt-2 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-[10px] uppercase font-mono text-slate-500 block mb-1">
                          Mapped BootForge Tracks:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {map.mappedBootforgeTracks.map((t, i) => (
                            <span key={i} className="text-[11px] font-medium bg-slate-950 text-slate-300 px-2 py-0.5 rounded border border-slate-800">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] uppercase font-mono text-slate-500 block mb-1">
                          Key Exam Domains Covered:
                        </span>
                        <ul className="text-[11px] text-slate-400 space-y-0.5 list-disc list-inside">
                          {map.keyTopicsCovered.slice(0, 3).map((topic, i) => (
                            <li key={i} className="truncate">{topic}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 5: MY CREDENTIALS & VERIFIED DIPLOMAS SHOWCASE */}
          {/* ========================================================================= */}
          {activeHubTab === 'my-diplomas' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-amber-400" /> Your Verified Diplomas & Official Credentials
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    All earned academic diplomas, certificates, and credentials with verifiable cryptographic IDs.
                  </p>
                </div>
              </div>

              {/* Bachelor's Degree Card */}
              <div className="rounded-xl border border-amber-500/40 bg-gradient-to-r from-amber-950/20 via-slate-900 to-slate-950 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="h-12 w-12 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-md shadow-amber-500/20 shrink-0">
                    <GraduationCap className="h-7 w-7" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider block">
                      University Collegiate Degree
                    </span>
                    <h3 className="text-sm font-bold text-white">{bachelorDegreeProgram.title}</h3>
                    <p className="text-xs text-slate-400">
                      Credits: <strong className="text-emerald-400 font-mono">{degreeAudit.earnedCredits} / 120</strong> · GPA: <strong className="text-amber-400 font-mono">{degreeAudit.gpa}</strong> · {transcript.status}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setViewingTranscript(true)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Transcript
                  </button>
                  <button
                    onClick={() => setViewingDegreeDiploma(true)}
                    className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-colors cursor-pointer"
                  >
                    View B.S. Diploma
                  </button>
                </div>
              </div>

              {/* Earned Exam Certificates Grid */}
              {userStats.earnedCertificates && userStats.earnedCertificates.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {userStats.earnedCertificates.map((cert) => (
                    <div
                      key={cert.id}
                      className="p-4 rounded-xl border border-amber-500/40 bg-gradient-to-br from-amber-950/20 via-slate-900 to-slate-950 flex items-center justify-between shadow-lg"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs">
                          <Award className="h-4 w-4" />
                          <span>{cert.credentialTitle}</span>
                        </div>
                        <div className="text-[11px] text-slate-400">
                          Recipient: <strong className="text-slate-200">{cert.studentName}</strong> · Score: <strong className="text-emerald-400">{cert.scorePercent}%</strong>
                        </div>
                        <div className="text-[10px] font-mono text-slate-500">
                          ID: {cert.verificationCode} · {cert.issuedDate}
                        </div>
                      </div>

                      <button
                        onClick={() => setViewingCertificate(cert)}
                        className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors shrink-0 cursor-pointer"
                      >
                        View Diploma
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-slate-800 p-8 text-center space-y-3">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-slate-500">
                    <Award className="h-6 w-6" />
                  </div>
                  <h3 className="text-sm font-bold text-white">No Exam Certifications Earned Yet</h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    Take your first certification exam in the "Certification Exams" tab. Score 75%+ to earn an official verifiable credential!
                  </p>
                  <button
                    onClick={() => setActiveHubTab('exams')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-400 transition-colors cursor-pointer"
                  >
                    <span>Browse Certification Exams</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
