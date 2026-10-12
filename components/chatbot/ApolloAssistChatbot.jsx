"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MessageSquare,
  X,
  Send,
  Mic,
  MicOff,
  RotateCcw,
  Calendar,
  Activity,
  Globe,
  AlertTriangle,
  PhoneCall,
  Sparkles,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Check,
  Bot,
  User as UserIcon,
} from "lucide-react";
import {
  WELCOME_MESSAGE,
  QUICK_ACTIONS,
  FLOW_RESPONSES,
  generateBotResponse,
} from "./chatData";

const STORAGE_KEY = "apollo_assist_chat_v1";

function formatCurrentTime() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

export default function ApolloAssistChatbot() {
  const pathname = usePathname();
  const prevPathnameRef = useRef(pathname);

  const [isOpen, setIsOpen] = useState(false);
  const [hasUnreadNotice, setHasUnreadNotice] = useState(true);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [micError, setMicError] = useState("");
  const [activeSuggestions, setActiveSuggestions] = useState([]);

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const recognitionRef = useRef(null);
  const chatWindowRef = useRef(null);

  // Automatically close chatbot on every route change across the entire website
  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      setIsOpen(false);
      if (isListening && recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // ignore
        }
        setIsListening(false);
      }
    }
  }, [pathname, isListening]);

  // Initialize from sessionStorage on client-side
  useEffect(() => {
    try {
      const savedHistory = sessionStorage.getItem(STORAGE_KEY);
      if (savedHistory) {
        const parsed = JSON.parse(savedHistory);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
          setHasUnreadNotice(false);
        }
      }
    } catch {
      // Ignore storage read errors
    }
  }, []);

  // Save to sessionStorage whenever messages change
  useEffect(() => {
    try {
      if (messages.length > 1) {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
      }
    } catch {
      // Ignore storage write errors
    }
  }, [messages]);

  // Scroll to bottom smoothly when new messages appear or typing state changes
  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen, scrollToBottom]);

  // Speech Recognition (Web Speech API) setup
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        setSpeechSupported(true);
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = "en-IN";

        recognition.onstart = () => {
          setIsListening(true);
          setMicError("");
        };

        recognition.onresult = (event) => {
          let transcript = "";
          for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
          }
          setInputMessage(transcript);
        };

        recognition.onerror = (event) => {
          setIsListening(false);
          if (event.error === "not-allowed") {
            setMicError("Microphone permission denied.");
          } else if (event.error !== "no-speech") {
            setMicError("Voice input error. Please try typing.");
          }
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // ignore cleanup errors
        }
      }
    };
  }, []);

  // Escape key to close chat
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      setHasUnreadNotice(false);
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
        }
      }, 250);
    }
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  const handleResetConversation = () => {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setMessages([WELCOME_MESSAGE]);
    setActiveSuggestions([]);
    setInputMessage("");
    setIsTyping(false);
    if (isListening && recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
    }
  };

  const handleToggleVoice = () => {
    if (!speechSupported) {
      setMicError("Voice input is not supported in this browser.");
      setTimeout(() => setMicError(""), 3500);
      return;
    }

    if (isListening) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
      setIsListening(false);
    } else {
      setMicError("");
      try {
        recognitionRef.current.start();
      } catch {
        setIsListening(false);
      }
    }
  };

  const handleSendMessage = (textToSend) => {
    const text = (typeof textToSend === "string" ? textToSend : inputMessage).trim();
    if (!text) return;

    if (isListening && recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
      setIsListening(false);
    }

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: text,
      timestamp: formatCurrentTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setIsTyping(true);
    setActiveSuggestions([]);

    // Simulate thoughtful healthcare assistant response delay
    const delay = Math.min(1100, Math.max(500, text.length * 20));
    setTimeout(() => {
      const responseData = generateBotResponse(text);

      const botMsg = {
        id: `assistant-${Date.now()}`,
        sender: "assistant",
        text: responseData.text,
        cards: responseData.cards,
        infoNote: responseData.infoNote,
        isUrgent: responseData.isUrgent,
        timestamp: formatCurrentTime(),
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);

      if (responseData.suggestions && responseData.suggestions.length > 0) {
        setActiveSuggestions(responseData.suggestions);
      }
    }, delay);
  };

  const handleQuickAction = (action) => {
    handleSendMessage(action.query);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* ─────────────────────────────────────────────────────────────
          1. FLOATING LAUNCHER BUTTON (Bottom-Right)
          ───────────────────────────────────────────────────────────── */}
      <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end pointer-events-none select-none">
        {/* Entrance / Floating Tooltip Badge when closed */}
        {!isOpen && hasUnreadNotice && (
          <div
            className="mb-3 px-3.5 py-2 rounded-2xl bg-white/95 backdrop-blur-md border border-[#087F9C]/30 shadow-xl text-slate-800 text-xs font-semibold flex items-center gap-2 animate-bounce transition-all duration-300 pointer-events-auto"
            role="status"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-[#0E526B] font-bold">Chat with Apollo Assist</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setHasUnreadNotice(false);
              }}
              aria-label="Dismiss hint"
              className="ml-1 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Circular Floating Launcher */}
        <button
          onClick={toggleChat}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close Apollo Assist chat" : "Chat with Apollo Assist"}
          className={`pointer-events-auto group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full text-white shadow-[0_10px_35px_rgba(14,82,107,0.38)] transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#16A6C5]/40 border-2 ${
            isOpen
              ? "bg-[#0E526B] border-white/30 rotate-90"
              : "bg-gradient-to-tr from-[#0E526B] via-[#087F9C] to-[#16A6C5] border-white/60 hover:shadow-[0_12px_40px_rgba(8,127,156,0.5)]"
          }`}
        >
          {/* Active pulsing halo when closed */}
          {!isOpen && (
            <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#087F9C] to-[#16A6C5] opacity-25 blur-sm animate-pulse pointer-events-none" />
          )}

          {/* Launcher Icons with rotation transition */}
          <div className="relative z-10 flex items-center justify-center">
            {isOpen ? (
              <X className="w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-300 rotate-0" />
            ) : (
              <div className="relative flex items-center justify-center">
                <Bot className="w-7 h-7 sm:w-8 sm:h-8 text-white transition-transform duration-300 group-hover:scale-110" />
                <Sparkles className="w-3.5 h-3.5 text-[#F59E0B] absolute -top-1 -right-1 animate-pulse" />
              </div>
            )}
          </div>

          {/* Online status indicator dot */}
          <span
            className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white shadow-sm"
            title="Apollo Assist is Online"
          >
            <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
          </span>
        </button>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. MAIN CHAT WINDOW (Desktop & Responsive Mobile)
          ───────────────────────────────────────────────────────────── */}
      {isOpen && (
        <div
          ref={chatWindowRef}
          role="dialog"
          aria-modal="true"
          aria-label="Apollo Assist Healthcare Assistant"
          className="fixed bottom-20 right-3 sm:bottom-24 sm:right-6 z-50 w-[calc(100vw-1.5rem)] sm:w-[440px] max-w-[460px] h-[min(640px,calc(100dvh-5.5rem))] max-h-[calc(100dvh-5.5rem)] sm:max-h-[690px] flex flex-col bg-[#F4FAFC] rounded-3xl border border-[#BFD6DF]/70 shadow-[0_20px_60px_-10px_rgba(14,82,107,0.35)] overflow-hidden transition-all duration-300 animate-in fade-in zoom-in-95 origin-bottom-right"
        >
          {/* ─────────────────────────────────────────────────────────
              A. ATTRACTIVE HEALTHCARE HEADER
              ───────────────────────────────────────────────────────── */}
          <div className="relative z-10 bg-gradient-to-r from-[#0E526B] via-[#087F9C] to-[#0E526B] text-white p-3.5 sm:p-4.5 border-b border-white/10 shadow-md">
            {/* Soft background pattern */}
            <div
              className="absolute inset-0 opacity-[0.06] pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(#FFFFFF 1px, transparent 1px)",
                backgroundSize: "16px 16px",
              }}
            />

            <div className="relative z-10 flex items-center justify-between gap-2.5">
              {/* Avatar + Brand info */}
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/15 p-1 border border-white/30 shadow-inner flex items-center justify-center shrink-0">
                  <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#0E526B] to-[#16A6C5] flex items-center justify-center text-white">
                    <Bot className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-400 border-2 border-[#0E526B]" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <h2 className="font-serif-apollo text-sm sm:text-base font-bold text-white tracking-wide truncate">
                      Apollo Assist
                    </h2>
                    <span className="shrink-0 px-1.5 sm:px-2 py-0.5 rounded-full bg-[#16A6C5]/25 border border-[#16A6C5]/40 text-[9px] sm:text-[10px] font-bold text-cyan-100 uppercase tracking-wider">
                      24/7 AI
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-cyan-100/90 font-medium truncate">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                    <span className="truncate">Online • Apollo JBP Hospitals Jabalpur</span>
                  </div>
                </div>
              </div>

              {/* Header Action Buttons (Reset, Close) */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={handleResetConversation}
                  aria-label="Restart conversation"
                  title="New conversation"
                  className="p-1.5 sm:p-2 rounded-xl text-cyan-100 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#16A6C5]"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chat window"
                  title="Close"
                  className="p-1.5 sm:p-2 rounded-xl text-cyan-100 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#16A6C5]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────
              B. CONVERSATION AREA (Independent Scrollable Container)
              ───────────────────────────────────────────────────────── */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 overscroll-contain">
            {messages.map((msg, index) => {
              const isAssistant = msg.sender === "assistant";

              return (
                <div
                  key={msg.id || index}
                  className={`flex flex-col ${
                    isAssistant ? "items-start" : "items-end"
                  } space-y-1.5`}
                >
                  <div
                    className={`flex items-end gap-2 max-w-[90%] sm:max-w-[85%] ${
                      isAssistant ? "flex-row" : "flex-row-reverse"
                    }`}
                  >
                    {/* Small Assistant Icon Avatar */}
                    {isAssistant && (
                      <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#0E526B] to-[#16A6C5] flex items-center justify-center text-white shrink-0 shadow-sm border border-white">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}

                    {/* Bubble Content */}
                    <div
                      className={`p-3.5 sm:p-4 text-xs sm:text-sm rounded-2xl shadow-xs transition-all ${
                        isAssistant
                          ? "bg-white text-slate-800 border border-[#E3EEF2] rounded-tl-xs leading-relaxed"
                          : "bg-gradient-to-r from-[#0E526B] to-[#087F9C] text-white rounded-tr-xs shadow-md leading-relaxed"
                      }`}
                    >
                      <p className="whitespace-pre-line">{msg.text}</p>

                      {/* Optional Rich Cards attached to assistant response */}
                      {msg.cards && msg.cards.length > 0 && (
                        <div className="mt-3.5 space-y-2.5">
                          {msg.cards.map((card, cIdx) => (
                            <div
                              key={cIdx}
                              className={`p-3 rounded-xl border text-left transition-all ${
                                card.highlight
                                  ? "bg-rose-50/90 border-rose-200 text-slate-900"
                                  : "bg-[#F7FBFD] border-[#BFD6DF]/60 text-slate-800"
                              }`}
                            >
                              <div className="flex items-center justify-between gap-2 mb-1">
                                <h4 className="font-bold text-xs sm:text-sm text-[#0E526B]">
                                  {card.title}
                                </h4>
                                {card.badge && (
                                  <span className="px-2 py-0.5 rounded-full bg-[#16A6C5]/15 text-[#087F9C] text-[10px] font-bold">
                                    {card.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] sm:text-xs text-slate-600 whitespace-pre-line mb-2.5 leading-relaxed">
                                {card.desc}
                              </p>

                              {card.actionType === "link" && card.actionUrl && (
                                <Link
                                  href={card.actionUrl}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0E526B] text-white text-xs font-bold hover:bg-[#087F9C] transition-colors shadow-xs"
                                >
                                  <span>{card.actionText || "Learn More"}</span>
                                  <ChevronRight className="w-3.5 h-3.5" />
                                </Link>
                              )}

                              {card.actionType === "call" && card.actionUrl && (
                                <a
                                  href={card.actionUrl}
                                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shadow-xs ${
                                    card.highlight
                                      ? "bg-rose-600 hover:bg-rose-700 text-white animate-pulse"
                                      : "bg-[#087F9C] hover:bg-[#0E526B] text-white"
                                  }`}
                                >
                                  <PhoneCall className="w-3.5 h-3.5" />
                                  <span>{card.actionText || "Call Now"}</span>
                                </a>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Optional Info Note */}
                      {msg.infoNote && (
                        <div className="mt-2.5 p-2 rounded-lg bg-amber-50/80 border border-amber-200 text-[11px] text-amber-900 font-medium flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span>{msg.infoNote}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Timestamp */}
                  <span className="text-[10px] text-slate-400 px-2 font-medium">
                    {msg.timestamp || "Just now"}
                  </span>

                  {/* ─────────────────────────────────────────────────────────
                      C. WELCOME MESSAGE: 4 PRESERVED QUICK ACTIONS
                      ───────────────────────────────────────────────────────── */}
                  {msg.isWelcome && (
                    <div className="w-full pt-1 pb-2">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-[#087F9C] mb-2 px-1">
                        Select a quick action:
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {QUICK_ACTIONS.map((action) => {
                          const isEmergency = action.isEmergency;

                          return (
                            <button
                              key={action.id}
                              onClick={() => handleQuickAction(action)}
                              className={`group relative p-3 rounded-2xl text-left border transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 cursor-pointer shadow-xs ${
                                isEmergency
                                  ? "bg-gradient-to-br from-rose-50/90 to-amber-50/80 border-rose-300 hover:border-rose-400 focus:ring-rose-400/50"
                                  : "bg-white hover:bg-[#EBF5F8] border-[#BFD6DF]/70 hover:border-[#087F9C] focus:ring-[#087F9C]/40"
                              }`}
                            >
                              <div className="flex items-start gap-2.5">
                                <div
                                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                                    isEmergency
                                      ? "bg-rose-500 text-white shadow-xs"
                                      : "bg-[#0E526B]/10 text-[#0E526B] group-hover:bg-[#087F9C] group-hover:text-white"
                                  }`}
                                >
                                  {action.icon === "calendar" && (
                                    <Calendar className="w-4 h-4" />
                                  )}
                                  {action.icon === "activity" && (
                                    <Activity className="w-4 h-4" />
                                  )}
                                  {action.icon === "globe" && (
                                    <Globe className="w-4 h-4" />
                                  )}
                                  {action.icon === "alert" && (
                                    <AlertTriangle className="w-4 h-4 animate-pulse" />
                                  )}
                                </div>

                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center justify-between gap-1">
                                    <span
                                      className={`text-[10px] font-bold uppercase tracking-wider ${
                                        isEmergency
                                          ? "text-rose-600"
                                          : "text-[#087F9C]"
                                      }`}
                                    >
                                      {action.tag}
                                    </span>
                                  </div>
                                  <div
                                    className={`text-xs font-bold leading-tight mt-0.5 ${
                                      isEmergency
                                        ? "text-rose-900"
                                        : "text-[#0E526B] group-hover:text-[#087F9C]"
                                    }`}
                                  >
                                    {action.label}
                                  </div>
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Typing Indicator Bubble */}
            {isTyping && (
              <div className="flex items-end gap-2 max-w-[80%] animate-fade-in">
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#0E526B] to-[#16A6C5] flex items-center justify-center text-white shrink-0 shadow-sm">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white border border-[#E3EEF2] rounded-2xl rounded-tl-xs p-3 shadow-xs flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#087F9C] animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-2 h-2 rounded-full bg-[#087F9C] animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-2 h-2 rounded-full bg-[#087F9C] animate-bounce" />
                </div>
              </div>
            )}

            {/* Dynamic Suggestion Chips */}
            {activeSuggestions.length > 0 && !isTyping && (
              <div className="pt-2 flex flex-wrap gap-1.5 animate-fade-in">
                {activeSuggestions.map((sug, sIdx) => (
                  <button
                    key={sIdx}
                    onClick={() => handleSendMessage(sug)}
                    className="px-3 py-1.5 rounded-full bg-white hover:bg-[#EBF5F8] border border-[#BFD6DF] hover:border-[#087F9C] text-[#0E526B] hover:text-[#087F9C] text-[11px] font-semibold transition-all shadow-2xs hover:shadow-xs active:scale-95"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* ─────────────────────────────────────────────────────────
              D. MODERN MESSAGE COMPOSER & VOICE INPUT
              ───────────────────────────────────────────────────────── */}
          <div className="p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-white border-t border-[#E3EEF2] relative z-10 shrink-0">
            {/* Listening Banner or Microphone Notice */}
            {isListening && (
              <div className="mb-2 px-3 py-1.5 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-900 text-xs font-medium flex items-center justify-between animate-pulse">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  <span>Listening... Speak into your microphone</span>
                </div>
                <button
                  onClick={handleToggleVoice}
                  className="text-cyan-700 hover:text-cyan-950 font-bold"
                >
                  Stop
                </button>
              </div>
            )}

            {micError && (
              <div className="mb-2 px-3 py-1.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium">
                {micError}
              </div>
            )}

            <div className="flex items-end gap-2 bg-[#F8FAFC] border border-[#BFD6DF] rounded-2xl p-1.5 focus-within:border-[#087F9C] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#087F9C]/15 transition-all">
              {/* Text Input */}
              <textarea
                ref={textareaRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                placeholder="Ask me anything..."
                aria-label="Ask Apollo Assist anything"
                className="flex-1 max-h-24 min-h-[38px] px-2.5 py-2 text-xs sm:text-sm text-slate-800 placeholder-slate-400 bg-transparent resize-none focus:outline-none"
              />

              {/* Voice / Microphone Button */}
              <button
                type="button"
                onClick={handleToggleVoice}
                aria-label={
                  isListening
                    ? "Stop speech recognition"
                    : "Start voice input with microphone"
                }
                title={
                  isListening
                    ? "Stop listening"
                    : speechSupported
                    ? "Voice input"
                    : "Speech recognition not supported"
                }
                className={`p-2 rounded-xl transition-all duration-200 shrink-0 ${
                  isListening
                    ? "bg-rose-500 text-white animate-pulse"
                    : "text-slate-500 hover:text-[#087F9C] hover:bg-slate-100"
                }`}
              >
                {isListening ? (
                  <MicOff className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                ) : (
                  <Mic className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                )}
              </button>

              {/* Send Button */}
              <button
                type="button"
                onClick={() => handleSendMessage()}
                disabled={!inputMessage.trim() || isTyping}
                aria-label="Send message"
                className={`p-2 rounded-xl font-bold transition-all duration-200 shrink-0 ${
                  inputMessage.trim() && !isTyping
                    ? "bg-gradient-to-r from-[#0E526B] to-[#087F9C] text-white shadow-xs hover:brightness-110 active:scale-95"
                    : "bg-slate-100 text-slate-400 cursor-not-allowed"
                }`}
              >
                <Send className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </button>
            </div>

            {/* ─────────────────────────────────────────────────────────
                E. FOOTER & BRANDING (Powered by Eka Care)
                ───────────────────────────────────────────────────────── */}
            <div className="pt-2 text-center flex items-center justify-center gap-1.5 text-[10px] text-slate-400 font-medium select-none">
              <span>Powered by</span>
              <a
                href="https://www.eka.care"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#087F9C] hover:underline"
              >
                Eka Care
              </a>
              <span>• Apollo JBP Hospitals Jabalpur</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
