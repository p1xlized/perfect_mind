import { useEffect, useState } from "preact/hooks";
import Button from "./primitives/button";
import Input from "./primitives/input";
import Switch from "./primitives/switch";
import Dropdown from "./primitives/dropdown";
import { applyTheme, ThemeName, themeNames } from "../theme";

interface SettingsProps {
  theme: ThemeName;
  onDone: (theme: ThemeName) => void;
}

export default function Settings({ theme, onDone }: SettingsProps) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [draftTheme, setDraftTheme] = useState(theme);

  useEffect(() => {
    setDraftTheme(theme);
  }, [theme]);

  const applySettings = () => {
    applyTheme(draftTheme);
    onDone(draftTheme);
  };

  return (
    <div className="space-y-4">
      <label className="block space-y-1 text-sm">
        <span>Workspace name</span>
        <Input placeholder="Productive Mind" />
      </label>
      <label className="flex items-center justify-between gap-4 text-sm">
        <span>Notifications</span>
        <Switch
          checked={notificationsEnabled}
          onCheckedChange={setNotificationsEnabled}
          aria-label="Toggle notifications"
        />
      </label>
      <label className="block space-y-1 text-sm">
        <span>Theme</span>
        <Dropdown
          value={draftTheme}
          onChange={(value) => setDraftTheme(value as ThemeName)}
          aria-label="Select application theme"
        >
          {themeNames.map((themeOption) => (
            <option key={themeOption} value={themeOption}>
              {themeOption[0].toUpperCase() + themeOption.slice(1)}
            </option>
          ))}
        </Dropdown>
      </label>
      <div className="flex justify-end">
        <Button type="button" size="small" onClick={applySettings}>
          Done
        </Button>
      </div>
    </div>
  );
}
