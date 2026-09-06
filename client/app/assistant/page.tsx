"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, User, Send, Sparkles, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello Commander. I am your AI Disaster Intelligence Assistant. How can I assist you with telemetry data, resource deployment, or risk analysis today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    "Which area is most dangerous?",
    "Why is Sohra high risk?",
    "Which roads are blocked?",
    "What should the response team do first?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e?: React.FormEvent, customQuery?: string) => {
    e?.preventDefault();
    const query = customQuery || input;
    if (!query.trim()) return;

    setMessages(prev => [...prev, { role: "user", content: query }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query }),
      });
      const data = await res.json();
      
      if (data.success) {
        setMessages(prev => [...prev, { role: "assistant", content: data.data.reply }]);
      } else {
        setMessages(prev => [...prev, { role: "assistant", content: "Error: Could not retrieve disaster intelligence at this moment." }]);
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: "assistant", content: "Network error communicating with the intelligence server." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 py-8 h-[calc(100vh-80px)] flex flex-col space-y-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Bot className="h-8 w-8 text-cyan-400" />
          AI Disaster Intelligence
        </h1>
        <p className="text-muted-foreground mt-1">Real-time LLM analysis of active telemetry and incident reports.</p>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden border-cyan-900/30">
        <CardHeader className="bg-slate-900/50 border-b py-3 px-4 flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-sm font-mono text-cyan-400 flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              INTELLIGENCE TERMINAL
            </CardTitle>
          </div>
          <Badge variant="outline" className="text-[10px] bg-slate-800 text-slate-300">SECURE CONTEXT ENABLED</Badge>
        </CardHeader>
        
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-800 flex items-center justify-center shrink-0">
                  <Bot className="h-4 w-4 text-cyan-400" />
                </div>
              )}
              
              <div className={`px-4 py-2.5 rounded-lg max-w-[80%] text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-slate-800 text-slate-200 rounded-tr-none border border-slate-700' 
                  : 'bg-cyan-950/30 text-cyan-50 border border-cyan-900/50 rounded-tl-none font-mono'
              }`}>
                {msg.content}
              </div>

              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
                  <User className="h-4 w-4 text-slate-400" />
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-800 flex items-center justify-center shrink-0">
                <Loader2 className="h-4 w-4 text-cyan-400 animate-spin" />
              </div>
              <div className="px-4 py-2.5 rounded-lg bg-cyan-950/30 border border-cyan-900/50 rounded-tl-none flex items-center gap-1 text-cyan-400">
                <span className="animate-pulse">Analyzing telemetry...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </CardContent>

        <div className="p-3 bg-slate-900 border-t border-slate-800">
          <div className="flex flex-wrap gap-2 mb-3">
            {suggestedPrompts.map((prompt, idx) => (
              <Badge 
                key={idx} 
                variant="secondary" 
                className="cursor-pointer hover:bg-slate-700 text-xs py-1"
                onClick={() => handleSubmit(undefined, prompt)}
              >
                {prompt}
              </Badge>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input 
              placeholder="Ask the AI Assistant..." 
              value={input} 
              onChange={e => setInput(e.target.value)}
              className="bg-slate-950 border-slate-700"
              disabled={loading}
            />
            <Button type="submit" disabled={loading || !input.trim()} className="bg-cyan-600 hover:bg-cyan-700 text-white">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
