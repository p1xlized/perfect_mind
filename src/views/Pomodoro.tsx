import { useEffect, useState } from "preact/hooks";
import Button from "../components/primitives/button";
import Dialog from "../components/primitives/dialog";
import Input from "../components/primitives/input";
import { IconSettings } from "@tabler/icons-preact";

type Mode = "focus" | "break";

const DEFAULT_DURATIONS: Record<Mode, number> = {
  focus: 25,
  break: 5,
};

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
  const remainingSeconds = (seconds % 60).toString().padStart(2, "0");

  return `${minutes}:${remainingSeconds}`;
};

export default function Pomodoro() {
  const [mode, setMode] = useState<Mode>("focus");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [durations, setDurations] = useState(DEFAULT_DURATIONS);
  const [remaining, setRemaining] = useState(DEFAULT_DURATIONS.focus * 60);
  const [running, setRunning] = useState(false);
  const [draftFocusDuration, setDraftFocusDuration] = useState(String(DEFAULT_DURATIONS.focus));
  const [draftBreakDuration, setDraftBreakDuration] = useState(String(DEFAULT_DURATIONS.break));

  useEffect(() => {
    if (!running) {
      return;
    }

    const timer = window.setInterval(() => {
      setRemaining((current) => {
        if (current <= 1) {
          setRunning(false);
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [running]);

  const changeMode = (nextMode: Mode) => {
    setMode(nextMode);
    setRemaining(durations[nextMode] * 60);
    setRunning(false);
  };

  const reset = () => {
    setRemaining(durations[mode] * 60);
    setRunning(false);
  };

  const openSettings = () => {
    setDraftFocusDuration(String(durations.focus));
    setDraftBreakDuration(String(durations.break));
    setSettingsOpen(true);
  };

  const applySettings = () => {
    const focus = Number(draftFocusDuration);
    const breakDuration = Number(draftBreakDuration);

    if (!Number.isInteger(focus) || !Number.isInteger(breakDuration) || focus < 1 || breakDuration < 1) {
      return;
    }

    const nextDurations = { focus, break: breakDuration };
    setDurations(nextDurations);
    setRemaining(nextDurations[mode] * 60);
    setRunning(false);
    setSettingsOpen(false);
  };

  return (
    <div className="mx-auto flex h-full w-full max-w-xl flex-col items-center justify-center gap-8">
      <div className="flex gap-2" role="tablist" aria-label="Timer mode">
        <div className="absolute right-0 top-16 left-4">
          <button
            type="button"
            className="rounded-full text-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            onClick={openSettings}
            aria-label="Open Pomodoro settings"
          >
            <IconSettings stroke={2} size={18} />
          </button>

          <Dialog
            open={settingsOpen}
            onOpenChange={setSettingsOpen}
            title="Settings"
            description="Set the duration for each timer mode."
          >
            <div className="space-y-4">
              <label className="block space-y-1 text-sm">
                <span>Focus duration (minutes)</span>
                <Input
                  value={draftFocusDuration}
                  onInput={(event) => setDraftFocusDuration(event.currentTarget.value)}
                  type="number"
                  min="1"
                  step="1"
                />
              </label>
              <label className="block space-y-1 text-sm">
                <span>Break duration (minutes)</span>
                <Input
                  value={draftBreakDuration}
                  onInput={(event) => setDraftBreakDuration(event.currentTarget.value)}
                  type="number"
                  min="1"
                  step="1"
                />
              </label>

              <div className="flex justify-end">
                <Button type="button" size="small" onClick={applySettings}>
                  Done
                </Button>
              </div>
            </div>
          </Dialog>
        </div>
        <Button
          type="button"
          size="small"
          variant={mode === "focus" ? "primary" : "default"}
          aria-selected={mode === "focus"}
          onClick={() => changeMode("focus")}
        >
          Focus
        </Button>
        <Button
          type="button"
          size="small"
          variant={mode === "break" ? "primary" : "default"}
          aria-selected={mode === "break"}
          onClick={() => changeMode("break")}
        >
          Break
        </Button>
      </div>

      <div className="text-center">
        <p className="text-metadata">{mode === "focus" ? "Focus session" : "Break session"}</p>
        <time className="font-display text-7xl text-primary" dateTime={`PT${remaining}S`}>
          {formatTime(remaining)}
        </time>
      </div>

      <div className="flex gap-2">
        <Button type="button" variant="primary" size="large" onClick={() => setRunning(!running)}>
          {running ? "Pause" : "Start"}
        </Button>
        <Button type="button" size="large" onClick={reset}>
          Reset
        </Button>
      </div>
    </div>
  );
}
