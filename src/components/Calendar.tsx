// @ts-expect-error Schedule X exposes types through an export path unsupported by bundler resolution.
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/preact'
import {
  createViewDay,
  createViewWeekAgenda,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar'
import { Temporal } from 'temporal-polyfill'
import '@schedule-x/theme-default/dist/index.css'

function CalendarApp() {
  const calendar = useCalendarApp({
    views: [
      createViewDay(),
      createViewWeekAgenda(),
      createViewWeek(),
      createViewMonthGrid(),
      createViewMonthAgenda(),
    ],
    events: [
      {
        id: '1',
        title: 'Event 1',
        start: Temporal.PlainDate.from('2023-12-16'),
        end: Temporal.PlainDate.from('2023-12-16'),
      },
    ],
  })

  return (
    <div className="h-full w-full overflow-hidden">
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  )
}

export default CalendarApp;
