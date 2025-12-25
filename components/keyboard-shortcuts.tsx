"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Keyboard } from "lucide-react";

interface KeyboardShortcutsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const shortcuts = [
  { key: "→ / Space", description: "Sonraki slide" },
  { key: "←", description: "Önceki slide" },
  { key: "Home", description: "İlk slide'a git" },
  { key: "End", description: "Son slide'a git" },
  { key: "Ctrl+K / ⌘+K", description: "Arama aç" },
  { key: "M", description: "Mini map aç/kapat" },
  { key: "?", description: "Klavye kısayolları" },
];

export function KeyboardShortcuts({
  open,
  onOpenChange,
}: KeyboardShortcutsProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Keyboard className="h-5 w-5" />
            Klavye Kısayolları
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3 py-4">
          {shortcuts.map((shortcut, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
            >
              <span className="text-sm text-muted-foreground">
                {shortcut.description}
              </span>
              <kbd className="px-3 py-1.5 text-xs font-semibold bg-background border border-border rounded-md shadow-sm">
                {shortcut.key}
              </kbd>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
