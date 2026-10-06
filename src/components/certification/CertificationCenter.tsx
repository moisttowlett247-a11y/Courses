import React, { useState } from 'react';
import { CertificationExam, EarnedCertificate, UserStats } from '../../types/curriculum';
import { certificationExams } from '../../data/certificationData';
import { Award, CheckCircle2, AlertCircle, Clock, Sparkles, Trophy, ArrowRight, ArrowLeft, RefreshCw, Printer, ShieldCheck, HelpCircle } from 'lucide-react';
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
  const [selectedExam, setSelectedExam] = useState<CertificationExam | null>(null);
  const [isExamActive, setIsExamActive] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [viewingCertificate, setViewingCertificate] = useState<EarnedCertificate | null>(null);
  const [studentNameInput, setStudentNameInput] = useState(userStats.studentName || 'Adventurer');

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
      confetti({ particleCount: 160, spread: 80, origin: { y: 0.5 } });

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

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-3.5rem)] bg-slate-950 overflow-y-auto">
      {/* If viewing an official certificate */}
      {viewingCertificate ? (
        <div className="max-w-4xl mx-auto p-6 space-y-6 w-full my-auto">
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                setViewingCertificate(null);
                setIsExamActive(false);
                setSelectedExam(null);
              }}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Certification Hub
            </button>

            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold px-4 py-2 text-xs rounded-md shadow-sm transition-colors cursor-pointer"
            >
              <Printer className="h-4 w-4" /> Print / Save Diploma
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
              This official credential certifies that
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
        /* Active Exam Simulator */
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
              className="text-xs text-slate-500 hover:text-slate-300"
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
                      className={`w-full flex items-center justify-between p-3.5 rounded-lg border text-xs text-left transition-all ${
                        isSelected
                          ? 'border-amber-500 bg-amber-950/30 text-amber-200 font-medium'
                          : 'border-slate-800 bg-slate-950 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`flex h-5 w-5 items-center justify-center rounded-full border text-[11px] font-mono ${
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
                  className="px-3 py-1.5 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs disabled:opacity-40"
                >
                  Previous
                </button>

                {currentQuestionIndex + 1 < selectedExam.questions.length ? (
                  <button
                    onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                    className="flex items-center gap-1 px-4 py-1.5 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs transition-colors"
                  >
                    Next Question <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                ) : (
                  <button
                    disabled={!allAnswered}
                    onClick={handleSubmitExam}
                    className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-bold text-xs shadow-md transition-all disabled:opacity-50"
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
                <AlertCircle className="h-5 w-5" /> Score Did Not Meet 75% Passing Threshold
              </div>
              <p className="text-xs text-slate-300">
                Don't worry! In coding, mistakes are just learning checkpoints. Review the beginner lessons, practice in the code editor, and retake the exam whenever you're ready!
              </p>
              <button
                onClick={() => handleStartExam(selectedExam)}
                className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded text-xs transition-colors"
              >
                <RefreshCw className="h-3.5 w-3.5" /> Retake Exam
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Certification Hub Dashboard */
        <div className="max-w-5xl mx-auto p-6 space-y-8 w-full">
          {/* Header */}
          <div className="space-y-3 border-b border-slate-800 pb-6">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              <ShieldCheck className="h-4 w-4" /> Verifiable Industry Credentials
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white font-fantasy tracking-tight">
              Certification Exam Portal
            </h1>
            <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
              Designed so someone with zero background can study step-by-step, take accredited practice exams, and earn verified backend certificates to show employers or add to their portfolio.
            </p>

            {/* Name Personalization Input */}
            <div className="flex items-center gap-3 pt-2">
              <label className="text-xs text-slate-300 font-semibold whitespace-nowrap">
                Certificate Name:
              </label>
              <input
                type="text"
                value={studentNameInput}
                onChange={(e) => {
                  setStudentNameInput(e.target.value);
                  onUpdateStudentName(e.target.value);
                }}
                placeholder="Enter your full name for your certificates"
                className="bg-slate-900 border border-slate-800 rounded-md px-3 py-1.5 text-xs text-amber-300 font-medium focus:outline-none focus:border-amber-500 w-72"
              />
            </div>
          </div>

          {/* Earned Certificates Showcase */}
          {userStats.earnedCertificates && userStats.earnedCertificates.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Trophy className="h-4 w-4 text-amber-400" /> Your Verified Diplomas ({userStats.earnedCertificates.length})
              </h2>

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
                      className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors shrink-0"
                    >
                      View Diploma
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Available Certification Tracks */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-emerald-400" /> Available Certification Exams
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certificationExams.map((exam) => {
                const isEarned = userStats.earnedCertificates?.some(c => c.examId === exam.id);

                return (
                  <div
                    key={exam.id}
                    className={`rounded-xl border p-5 flex flex-col justify-between space-y-4 transition-all ${
                      isEarned
                        ? 'border-emerald-500/40 bg-emerald-950/10'
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
                            <span className="text-[11px] text-slate-400">{exam.subtitle}</span>
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
                          Skills Evaluated:
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

                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                      <span className="text-[11px] font-mono text-slate-400">
                        Passing Threshold: {exam.passingScorePercent}%
                      </span>

                      <button
                        onClick={() => handleStartExam(exam)}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all active:scale-95 cursor-pointer ${
                          isEarned
                            ? 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                            : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-md shadow-amber-500/10'
                        }`}
                      >
                        <span>{isEarned ? 'Retake Exam' : 'Take Certification Exam'}</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
