import { JSX } from "preact";
import Button from "./primitives/button";

interface TabProps {
  name: string;
  component: () => JSX.Element;
}
interface AppTabsProps {
  tabs: TabProps[];
  onClick: (tabName: string) => void;
  activeTab: string;
}
export default function AppTabs({tabs, onClick, activeTab}: AppTabsProps) {
  return (
    <div className="flex items-center justify-center" role="tablist" aria-label="Application sections">
      <div className="flex gap-1">
        {tabs.map((tab) => {
          const isActive = tab.name === activeTab;

          return (
            <Button
              key={tab.name}
              type="button"
              size="small"
              variant={isActive ? "primary" : "default"}
              role="tab"
              aria-selected={isActive}
              onClick={() => onClick(tab.name)}
            >
              {tab.name}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
