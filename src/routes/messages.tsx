import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { AuthGate, useHubSession } from "@/components/auth/guard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { listMessages, sendMessage } from "@/lib/hub/api";
import { cn, initials } from "@/lib/utils";

export const Route = createFileRoute("/messages")({ component: MessagesPage });

function MessagesPage() {
  return (
    <AuthGate>
      <MessagesInner />
    </AuthGate>
  );
}

function MessagesInner() {
  const { user } = useHubSession();
  const qc = useQueryClient();
  const q = useQuery({
    queryKey: ["messages"],
    queryFn: () => listMessages(),
    refetchInterval: 8000,
  });
  const [text, setText] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const mut = useMutation({
    mutationFn: () => sendMessage({ data: text }),
    onSuccess: () => {
      setText("");
      void qc.invalidateQueries({ queryKey: ["messages"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [q.data?.length]);

  return (
    <div className="flex min-h-[70vh] flex-col">
      <header className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Class lounge</p>
        <h1 className="mt-1 text-3xl">Say hello.</h1>
      </header>
      <div className="flex-1 space-y-3 overflow-y-auto rounded-[28px] border border-border bg-card p-4">
        {(q.data ?? []).map((m) => {
          const mine = m.mine || m.senderId === user?.id;
          return (
            <div key={m.id} className={cn("flex gap-2", mine && "flex-row-reverse")}>
              <div className="grid size-9 shrink-0 place-items-center rounded-full bg-primary-soft text-xs font-semibold text-accent-foreground">
                {initials(m.senderName)}
              </div>
              <div
                className={cn(
                  "max-w-[80%] rounded-2xl px-3.5 py-2 text-sm",
                  mine ? "rounded-tr-sm bg-primary text-primary-foreground" : "rounded-tl-sm bg-muted",
                )}
              >
                {!mine ? (
                  <p className="mb-0.5 text-[11px] font-semibold opacity-80">{m.senderName}</p>
                ) : null}
                <p className="whitespace-pre-wrap">{m.content}</p>
              </div>
            </div>
          );
        })}
        <div ref={endRef} />
      </div>
      <form
        className="mt-3 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          mut.mutate();
        }}
      >
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a note…"
          required
        />
        <Button type="submit" disabled={mut.isPending}>
          Send
        </Button>
      </form>
    </div>
  );
}
