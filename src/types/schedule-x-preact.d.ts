import { JSX } from "preact";

declare module "@schedule-x/preact" {
  export function useCalendarApp(options: unknown): unknown;
  export function ScheduleXCalendar(props: { calendarApp: unknown }): JSX.Element;
}
