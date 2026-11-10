import { useState } from "preact/hooks";
import Navbar from "./components/Navbar";
import AppTabs from "./components/Tabs";
import CalendarApp from "./components/Calendar";
import Pomodoro from "./views/Pomodoro";
import Tasks from "./views/Tasks";
import Tamagotchi from "./views/Tamagotchi";

function App() {
  const tabs = [
    {
      name: "Pomodoro",
      component: Pomodoro,
    },
    {
      name: "Tasks",
      component: Tasks,
    },
    {
      name: "Calendar",
      component: CalendarApp,
    },
    {
      name: "Tamagotchi",
      component: Tamagotchi,
    },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].name);
  const ActiveTab = tabs.find((tab) => tab.name === activeTab)?.component ?? tabs[0].component;

  return (
    <main class="flex h-screen w-full flex-col overflow-hidden bg-background">
      <Navbar>
        <AppTabs tabs={tabs} activeTab={activeTab} onClick={setActiveTab} />
      </Navbar>
      <section className="min-h-0 flex-1 overflow-hidden p-4 text-foreground" role="tabpanel">
        <ActiveTab />
      </section>
    </main >
  );
}

export default App;
