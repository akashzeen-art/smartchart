import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./StoryModal.module.css";
import { fetchStoriesByCategory, pickMatchingStory } from "../api/stories";
import { useLanguage } from "../contexts/LanguageContext";

const DEFAULT_TYPING_SPEED_MS = 14;

const joinStoryText = (story) => {
  if (!story) return "";
  const title = story.title || story.name || story.heading;
  const subtitle = story.subTitle || story.subtitle || story.sub_title || story.sub || story.tagline;
  const body = story.dsc || story.desc || story.description || story.story || story.content || story.text || story.body;
  const t = title ? `${title}\n` : "";
  const s = subtitle ? `${subtitle}\n\n` : "";
  const b = body ? String(body) : "";
  return `${t}${s}${b}`.trim();
};

const speakText = (text, voice, rate, pitch) => {
  if (!window.speechSynthesis) return null;
  
  // Chrome bug fix: cancel any pending speech first
  window.speechSynthesis.cancel();
  
  const utter = new SpeechSynthesisUtterance(text);
  if (voice) utter.voice = voice;
  utter.rate = rate;
  if (typeof pitch === 'number') utter.pitch = pitch;
  
  // Chrome bug fix: speechSynthesis gets stuck, need to resume
  // This is a well-known Chrome bug workaround
  const resumeInfinity = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      window.speechSynthesis.resume();
    }
  };
  
  // Chrome stops after ~15 seconds, keep it alive
  const keepAliveInterval = setInterval(() => {
    if (!window.speechSynthesis.speaking) {
      clearInterval(keepAliveInterval);
    } else {
      resumeInfinity();
    }
  }, 10000);
  
  utter.onend = () => clearInterval(keepAliveInterval);
  utter.onerror = () => clearInterval(keepAliveInterval);
  
  // Small delay helps Chrome initialize properly
  setTimeout(() => {
    window.speechSynthesis.speak(utter);
  }, 100);
  
  return utter;
};

const stopSpeaking = () => {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
};

const useSpeechVoices = () => {
  const [voices, setVoices] = useState([]);
  const [supported, setSupported] = useState(() => typeof window !== 'undefined' && !!window.speechSynthesis);
  useEffect(() => {
    const synth = window.speechSynthesis;
    if (!synth) { setSupported(false); return; }
    setSupported(true);
    const load = () => setVoices(synth.getVoices());
    // Initial load and polling fallback (some browsers need time)
    let tries = 0;
    const poll = () => {
      const v = synth.getVoices();
      if (v && v.length) { setVoices(v); }
      else if (tries++ < 25) setTimeout(poll, 120);
    };
    poll();
    synth.onvoiceschanged = load;
    return () => { try { synth.onvoiceschanged = null; } catch (_) {} };
  }, []);
  const refreshVoices = () => {
    try { const v = window.speechSynthesis?.getVoices() || []; setVoices(v); } catch (_) {}
  };
  return { voices, refreshVoices, supported };
};

const StoryModal = ({ isOpen, onClose, category, preferredTitle, rawText }) => {
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [stories, setStories] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [typingSpeed, setTypingSpeed] = useState(DEFAULT_TYPING_SPEED_MS);
  const [speakEnabled, setSpeakEnabled] = useState(false);
  const [speechRate, setSpeechRate] = useState(() => Number(localStorage.getItem('story_voice_rate')) || 1);
  const [speechPitch, setSpeechPitch] = useState(() => Number(localStorage.getItem('story_voice_pitch')) || 1);
  const [selectedVoiceName, setSelectedVoiceName] = useState(() => localStorage.getItem('story_voice_name') || "");
  const [originalPrompt, setOriginalPrompt] = useState("");
  const [generatedStories, setGeneratedStories] = useState([]);
  const { voices, refreshVoices, supported } = useSpeechVoices();
  
  // Filter voices to only show English, French, Spanish, and Arabic
  const filteredVoices = useMemo(() => {
    return voices.filter(v => {
      const lang = v.lang.toLowerCase();
      return lang.startsWith('en') || lang.startsWith('fr') || lang.startsWith('es') || lang.startsWith('ar');
    });
  }, [voices]);
  
  // Map language codes
  const languageCodeMap = {
    'EN': 'en',
    'FR': 'fr',
    'ES': 'es',
    'AR': 'ar'
  };
  
  const preferredVoice = useMemo(() => {
    const langCode = languageCodeMap[language] || 'en';
    if (selectedVoiceName) {
      const v = filteredVoices.find(v => v.name === selectedVoiceName);
      if (v) return v;
    }
    return filteredVoices.find(v => v.lang.toLowerCase().startsWith(langCode)) || filteredVoices[0];
  }, [filteredVoices, selectedVoiceName, language]);

  const presets = useMemo(() => ([
    { id: 'male', label: 'Male', test: /(Guy|Male|David|Mark|George|Brian|Eric|Matthew)/i },
    { id: 'female', label: 'Female', test: /(Female|Zira|Jenny|Samantha|Aria|Lia|Olivia|Emma)/i },
  
  ]), []);

  const applyPreset = (presetId) => {
    const preset = presets.find(p => p.id === presetId);
    if (!preset) return;
    const match = filteredVoices.find(v => preset.test.test(`${v.name} ${v.lang}`));
    if (match) setSelectedVoiceName(match.name);
  };

  const typingTimerRef = useRef(null);
  const currentUtteranceRef = useRef(null);

  const activeStory = generatedStories[activeIndex] || stories[activeIndex] || (rawText ? { title: preferredTitle || "Story", dsc: rawText } : null);
  const fullText = useMemo(() => {
    if (generatedStories[activeIndex]) return generatedStories[activeIndex].dsc;
    return rawText ? String(rawText) : joinStoryText(activeStory);
  }, [activeStory, rawText, generatedStories, activeIndex]);

  useEffect(() => {
    if (!isOpen) return;
    let mounted = true;
    setIsLoading(true);
    setTypedText("");
    setIsTyping(true);
    stopSpeaking();
    if (rawText) {
      setStories([]);
      setActiveIndex(0);
      setGeneratedStories([{ title: preferredTitle || "Story", dsc: rawText }]);
      setIsLoading(false);
      setOriginalPrompt(preferredTitle || "");
      return;
    }
    setGeneratedStories([]);
    fetchStoriesByCategory(category)
      .then((list) => {
        if (!mounted) return;
        const normalize = (s) => ({
          ...s,
          title: s?.title || s?.name || s?.heading || "",
          subTitle: s?.subTitle || s?.subtitle || s?.sub_title || s?.tagline || "",
          dsc: s?.dsc || s?.desc || s?.description || s?.story || s?.content || s?.text || s?.body || "",
        });
        const ordered = Array.isArray(list) ? list.map(normalize) : [];
        const first = pickMatchingStory(ordered, preferredTitle);
        const startIndex = Math.max(0, first ? ordered.findIndex(s => s === first) : 0);
        setStories(ordered);
        setActiveIndex(startIndex >= 0 ? startIndex : 0);
      })
      .finally(() => mounted && setIsLoading(false));
    return () => { mounted = false; };
  }, [isOpen, category, preferredTitle, rawText]);

  useEffect(() => {
    if (!isOpen) return;
    setTypedText("");
    setIsTyping(true);
    stopSpeaking();
  }, [fullText, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    if (!isTyping) return;
    if (!fullText) return;
    if (typedText.length >= fullText.length) {
      setIsTyping(false);
      return;
    }
    const nextTimer = setTimeout(() => {
      setTypedText(prev => prev + fullText[prev.length]);
    }, typingSpeed);
    typingTimerRef.current = nextTimer;
    return () => clearTimeout(nextTimer);
  }, [typedText, isTyping, typingSpeed, fullText, isOpen]);

  const handleClose = () => {
    clearTimeout(typingTimerRef.current);
    stopSpeaking();
    onClose?.();
  };

  const handleTogglePlay = () => {
    if (isTyping) {
      setIsTyping(false);
      clearTimeout(typingTimerRef.current);
    } else {
      setIsTyping(true);
    }
  };

  const handleRestart = () => {
    clearTimeout(typingTimerRef.current);
    stopSpeaking();
    setTypedText("");
    setIsTyping(true);
  };

  const handleSpeakToggle = () => {
    const next = !speakEnabled;
    setSpeakEnabled(next);
    if (!next) {
      stopSpeaking();
    } else if (fullText) {
      // Force cancel first to clear any stuck state
      stopSpeaking();
      // Small delay to ensure clean state before speaking
      setTimeout(() => {
        currentUtteranceRef.current = speakText(fullText, preferredVoice, speechRate, speechPitch);
      }, 150);
    }
  };

  const handleNext = async () => {
    if (!originalPrompt && stories.length <= 1) return;
    
    if (originalPrompt) {
      setIsLoading(true);
      stopSpeaking();
      try {
        const { sendStoryPrompt } = await import("../api/stories");
        const langCode = languageCodeMap[language] || 'en';
        const newStory = await sendStoryPrompt(originalPrompt, langCode);
        if (newStory) {
          const newStoryObj = { title: originalPrompt, dsc: newStory };
          setGeneratedStories(prev => {
            const updated = [...prev, newStoryObj];
            setActiveIndex(updated.length - 1);
            return updated;
          });
        }
      } catch (error) {
        console.error("Failed to generate new story:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      const nextIndex = (activeIndex + 1) % stories.length;
      setActiveIndex(nextIndex);
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    if (speakEnabled && fullText) {
      stopSpeaking();
      currentUtteranceRef.current = speakText(fullText, preferredVoice, speechRate, speechPitch);
    }
    return () => stopSpeaking();
  }, [activeIndex, speakEnabled, speechRate, speechPitch, preferredVoice, fullText, isOpen]);

  useEffect(() => { localStorage.setItem('story_voice_rate', String(speechRate)); }, [speechRate]);
  useEffect(() => { localStorage.setItem('story_voice_pitch', String(speechPitch)); }, [speechPitch]);
  useEffect(() => { if (selectedVoiceName) localStorage.setItem('story_voice_name', selectedVoiceName); }, [selectedVoiceName]);

  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} role="dialog" aria-modal="true">
      <div className={styles.modal}>
        <div className={styles.toolbar}>
          {supported ? (
            <>
              <select className={styles.select} value={selectedVoiceName} onChange={(e) => setSelectedVoiceName(e.target.value)}>
                <option value="">Default Voice</option>
                {filteredVoices.map((v) => (
                  <option key={`${v.name}-${v.lang}`} value={v.name}>{`${v.name} (${v.lang})`}</option>
                ))}
              </select>
              <button className={styles.controlBtn} onClick={refreshVoices}>Reload</button>
              <div className={styles.presetRow}>
                {presets.map((p) => (
                  <button
                    key={p.id}
                    className={`${styles.presetBtn} ${preferredVoice && p.test.test(`${preferredVoice.name} ${preferredVoice.lang}`) ? styles.presetActive : ''}`}
                    onClick={() => applyPreset(p.id)}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className={styles.label}>Voice not supported in this browser</div>
          )}
          <div className={styles.controlGroup}>
            <label className={styles.label}>Pitch</label>
            <input type="range" min="0.5" max="2" step="0.1" value={speechPitch} onChange={(e) => setSpeechPitch(Number(e.target.value))} />
          </div>
          <div className={styles.progressWrap}>
            <div className={styles.progressBar} style={{ width: fullText ? `${Math.min(100, (typedText.length / fullText.length) * 100)}%` : '0%' }} />
          </div>
        </div>
        <div className={styles.header}>
          <div className={styles.titleArea}>
            <div className={styles.categoryPill}>{String(category || "").toUpperCase()}</div>
            <h3 className={styles.titleText}>{activeStory?.title || "Story"}</h3>
            {activeStory?.subTitle && (
              <div className={styles.subtitleText}>{activeStory.subTitle}</div>
            )}
          </div>
          <button className={styles.closeBtn} onClick={handleClose} aria-label="Close">✕</button>
        </div>

        <div className={styles.contentArea}>
          {isLoading ? (
            <div className={styles.loading}>Loading story…</div>
          ) : (
            <pre className={styles.storyText}>{typedText}</pre>
          )}
        </div>

        <div className={styles.controls}>
          <button className={styles.controlBtn} onClick={handleTogglePlay}>
            {isTyping ? "Pause" : "Play"}
          </button>
          <button className={styles.controlBtn} onClick={handleRestart}>Repeat</button>
          <button className={`${styles.controlBtn} ${!speakEnabled ? styles.voiceHighlight : ''}`} onClick={handleSpeakToggle}>
            {speakEnabled ? "🔊 Voice: On" : "🔇 Voice: Off"}
          </button>
          <div className={styles.controlGroup}>
            <label className={styles.label}>Speed</label>
            <input
              type="range"
              min="4"
              max="40"
              value={typingSpeed}
              onChange={(e) => setTypingSpeed(Number(e.target.value))}
            />
          </div>
          <div className={styles.controlGroup}>
            <label className={styles.label}>Voice Rate</label>
            <input
              type="range"
              min="0.7"
              max="1.4"
              step="0.1"
              value={speechRate}
              onChange={(e) => setSpeechRate(Number(e.target.value))}
            />
          </div>
          <button className={styles.controlBtn} onClick={handleNext} disabled={isLoading || (!originalPrompt && stories.length <= 1)}>Next</button>
        </div>
        {speakEnabled && (
          <div className={styles.eq} aria-hidden="true">
            <div className={styles.eqBar}></div>
            <div className={styles.eqBar}></div>
            <div className={styles.eqBar}></div>
            <div className={styles.eqBar}></div>
            <div className={styles.eqBar}></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryModal;


