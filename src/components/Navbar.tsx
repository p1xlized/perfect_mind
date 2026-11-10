import { IconSettings, IconX } from '@tabler/icons-preact';
import { useState } from 'preact/hooks';
import ThemeSwitcher from "./ThemeSwitcher";
import { ComponentChildren } from 'preact';
import Dialog from "./primitives/dialog";
import { invoke } from '@tauri-apps/api/core';
import { getStoredTheme, ThemeName } from "../theme";
import Settings from "./Settings";


interface NavbarProps {
  children?: ComponentChildren;
}

export default function Navbar({ children }: NavbarProps) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [theme, setTheme] = useState<ThemeName>(getStoredTheme);

  return (
    <>
      <div className="bg-primary/5 flex w-full items-center justify-between border border-b-primary/20 p-2">
      <div>
        Productive Mind
      </div>
      <div>
        {children}
      </div>
      <div className="flex gap-4">
        <ThemeSwitcher />

        <button
          type="button"
          className="rounded-full text-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          onClick={() => setSettingsOpen(true)}
          aria-label="Open settings"
        >
          <IconSettings stroke={2} size={18} />
        </button>
        <IconX
          stroke={2}
          size={18}
          className="hover:text-destructive cursor-pointer transition-colors"
          onClick={() => invoke('close_window')}
        />
      </div>
      </div>
      <Dialog
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        title="Settings"
        description="Configure your workspace preferences."
      >
        <Settings
          theme={theme}
          onDone={(nextTheme) => {
            setTheme(nextTheme);
            setSettingsOpen(false);
          }}
        />
      </Dialog>
    </>
  );
}
