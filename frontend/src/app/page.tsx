'use client';

import {
  ArrowUpRight,
  Clock,
  Files,
  History,
  MessageSquarePlus,
  Paperclip,
  Pin,
  Send,
  Sparkles,
  Upload,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const files = [
  {
    id: "file-1",
    name: "Q3 OKRs.pdf",
    size: "2.3 MB",
    uploadedAt: "Sep 15, 2025",
    status: "Indexed",
  },
  {
    id: "file-2",
    name: "Personal Bio.docx",
    size: "820 KB",
    uploadedAt: "Sep 10, 2025",
    status: "Processing",
  },
  {
    id: "file-3",
    name: "Weekly Update.txt",
    size: "12 KB",
    uploadedAt: "Sep 08, 2025",
    status: "Indexed",
  },
];

const notes = [
  {
    id: "note-1",
    title: "Project Aurora — recap",
    excerpt: "Focus on improving agent latency and setting up Pinecone namespaces per client.",
    pinned: true,
    updatedAt: "2d ago",
  },
  {
    id: "note-2",
    title: "Coaching goals",
    excerpt: "Prepare for next week mentoring session covering roadmap trade-offs.",
    pinned: false,
    updatedAt: "5d ago",
  },
];

type Message = {
  id: number;
  role: "assistant" | "user";
  content: string;
  timestamp: string;
  citations?: string[];
};

const messages: Message[] = [
  {
    id: 1,
    role: "assistant",
    content:
      "Welcome back! I reviewed the latest weekly update you uploaded. Would you like a quick summary before we continue?",
    timestamp: "09:12",
    citations: ["Weekly Update.txt"],
  },
  {
    id: 2,
    role: "user",
    content: "Yes, and let's make sure we're on track for the Q3 OKRs milestones as well.",
    timestamp: "09:13",
  },
  {
    id: 3,
    role: "assistant",
    content:
      "You have two milestones due this week: ship the Pinecone namespace manager and finalize the coaching outline. Shall I draft a task checklist?",
    timestamp: "09:13",
    citations: ["Q3 OKRs.pdf", "Project Aurora — recap"],
  },
];

export default function Home() {
  return (
    <div className="flex min-h-dvh min-h-screen flex-col bg-background text-foreground">
      <div className="flex flex-1 flex-col lg:grid lg:min-h-dvh lg:grid-cols-[minmax(280px,360px)_1fr]">
        <aside className="flex min-h-[280px] flex-col border-b border-r bg-sidebar/80 text-sidebar-foreground lg:border-b-0">
          <div className="flex items-center justify-between gap-2 border-b px-4 py-4">
            <div>
              <h2 className="text-lg font-semibold">Memories</h2>
              <p className="text-sm text-muted-foreground">Uploaded files & generated notes</p>
            </div>
            <Button size="sm" className="gap-2">
              <Upload className="h-4 w-4" />
              Upload
            </Button>
          </div>
          <div className="flex items-center gap-2 px-4 py-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Files className="h-4 w-4" />
              Add note
            </Button>
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
              <Sparkles className="h-4 w-4" />
              Auto summarize
            </Button>
          </div>
          <Separator className="opacity-50" />
          <ScrollArea className="flex-1">
            <div className="space-y-6 px-4 py-5">
              <section className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    Files
                  </span>
                  <Badge variant="muted" className="rounded-md">
                    {files.length} total
                  </Badge>
                </div>
                <div className="space-y-3">
                  {files.map((file) => (
                    <Card key={file.id} className="border-border/80 bg-card">
                      <CardHeader className="space-y-2 pb-3">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <CardTitle className="text-base font-semibold text-foreground">
                              {file.name}
                            </CardTitle>
                            <CardDescription className="text-xs text-muted-foreground">
                              Uploaded {file.uploadedAt}
                            </CardDescription>
                          </div>
                          <Badge variant={file.status === "Indexed" ? "default" : "muted"} className="gap-1">
                            <span className="h-2 w-2 rounded-full bg-primary-foreground/70" />
                            {file.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="flex items-center justify-between border-t border-dashed border-border/60 pt-3 text-xs text-muted-foreground">
                        <span>{file.size}</span>
                        <button className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                          Manage
                          <ArrowUpRight className="h-3 w-3" />
                        </button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              <Separator className="opacity-60" />

              <section className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    Memory notes
                  </span>
                  <Badge variant="muted" className="rounded-md">
                    {notes.length} active
                  </Badge>
                </div>
                <div className="space-y-3">
                  {notes.map((note) => (
                    <Card
                      key={note.id}
                      className="border-border/80 bg-card transition-shadow hover:shadow-md"
                    >
                      <CardHeader className="space-y-2 pb-3">
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1">
                            <CardTitle className="text-base font-semibold text-foreground">
                              {note.title}
                            </CardTitle>
                            <CardDescription className="line-clamp-2 text-xs text-muted-foreground">
                              {note.excerpt}
                            </CardDescription>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className={`h-8 w-8 shrink-0 rounded-full border border-border/50 text-muted-foreground hover:text-foreground ${
                              note.pinned ? "bg-secondary/70" : ""
                            }`}
                            aria-label={note.pinned ? "Unpin note" : "Pin note"}
                          >
                            <Pin className={`h-4 w-4 ${note.pinned ? "fill-current" : ""}`} />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="flex items-center justify-between border-t border-dashed border-border/60 pt-3 text-xs text-muted-foreground">
                        <span>Updated {note.updatedAt}</span>
                        <button className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                          View details
                          <ArrowUpRight className="h-3 w-3" />
                        </button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            </div>
          </ScrollArea>
        </aside>

        <main className="flex min-h-0 flex-1 flex-col bg-background">
          <div className="flex flex-col gap-4 border-b bg-card/80 px-6 py-5 shadow-sm lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">Chat with your assistant</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                The assistant will automatically ground responses in your latest memories.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <History className="h-4 w-4" />
                View chats
              </Button>
              <Button variant="secondary" size="sm" className="gap-2">
                <MessageSquarePlus className="h-4 w-4" />
                New chat
              </Button>
            </div>
          </div>

          <div className="flex min-h-0 flex-1 flex-col gap-4 px-6 py-6">
            <Card className="border-border/70 bg-card/70">
              <CardContent className="flex flex-wrap items-center gap-3 px-4 py-3 text-sm text-muted-foreground">
                <Sparkles className="h-4 w-4 text-primary" />
                AI is using <strong className="font-semibold text-foreground">{notes[0].title}</strong> and
                <strong className="font-semibold text-foreground"> {files[0].name}</strong> for context in this chat.
              </CardContent>
            </Card>

            <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-border/70 bg-card">
              <ScrollArea className="flex-1">
                <div className="space-y-6 px-6 py-6">
                  {messages.map((message) => {
                    const isAssistant = message.role === "assistant";
                    return (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${isAssistant ? "items-start" : "items-end justify-end"}`}
                      >
                        {isAssistant && (
                          <Avatar className="h-9 w-9 border border-border/70">
                            <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
                              AI
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div className={`flex max-w-[min(100%,520px)] flex-col gap-2 ${isAssistant ? "" : "items-end text-right"}`}>
                          <div
                            className={`rounded-2xl border px-4 py-3 text-sm leading-6 shadow-sm ${
                              isAssistant
                                ? "bg-card text-foreground"
                                : "bg-primary text-primary-foreground"
                            }`}
                          >
                            <p>{message.content}</p>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            {message.citations && message.citations.length > 0 && (
                              <div className="flex items-center gap-1">
                                <Paperclip className="h-3 w-3" />
                                <span className="font-medium">{message.citations.join(", ")}</span>
                              </div>
                            )}
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {message.timestamp}
                            </span>
                          </div>
                        </div>
                        {!isAssistant && (
                          <Avatar className="h-9 w-9 border border-border/70">
                            <AvatarFallback className="bg-secondary/20 text-sm font-semibold text-secondary-foreground">
                              You
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>

              <Separator className="opacity-60" />

              <form className="flex flex-col gap-3 px-6 py-5" onSubmit={(event) => event.preventDefault()}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-sm font-medium text-muted-foreground">
                    Draft your next message
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <Button type="button" variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                      <Sparkles className="h-4 w-4" />
                      Suggest follow-up
                    </Button>
                    <Button type="button" variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                      <Paperclip className="h-4 w-4" />
                      Attach memory
                    </Button>
                  </div>
                </div>
                <Textarea
                  placeholder="Ask something, reference a project, or tell the assistant what to remember."
                  className="min-h-[140px] resize-none bg-background/80"
                />
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <History className="h-3 w-3" />
                    Last synced 3 minutes ago
                  </div>
                  <Button type="submit" className="gap-2">
                    Send
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
