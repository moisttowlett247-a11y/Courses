// Web Speech API text-to-speech reader for lessons and analogies

class SpeechNarrator {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isSpeakingState = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public isSupported(): boolean {
    return this.synth !== null;
  }

  public speak(text: string, onEnd?: () => void) {
    if (!this.synth) return;

    this.stop();

    // Clean markdown hashes and asterisks from speech
    const cleanText = text
      .replace(/#+\s+/g, '')
      .replace(/\*+/g, '')
      .replace(/`+/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

    this.currentUtterance = new SpeechSynthesisUtterance(cleanText);
    this.currentUtterance.rate = 1.0;
    this.currentUtterance.pitch = 1.0;

    this.currentUtterance.onend = () => {
      this.isSpeakingState = false;
      if (onEnd) onEnd();
    };

    this.currentUtterance.onerror = () => {
      this.isSpeakingState = false;
    };

    this.isSpeakingState = true;
    this.synth.speak(this.currentUtterance);
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
      this.isSpeakingState = false;
    }
  }

  public isSpeaking(): boolean {
    return this.isSpeakingState;
  }
}

export const speechNarrator = new SpeechNarrator();
