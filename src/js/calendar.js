import { Navbar } from "./components/index.js";
import { routes, API_ENDPOINT } from "./config.js";

const body = document.querySelector("body");

body.prepend(Navbar(routes));

var calendarEl = document.getElementById("calendar");
var calendar = new FullCalendar.Calendar(calendarEl, {
  initialView: "dayGridMonth",
  events: `${API_ENDPOINT()}/events`,
  locale: "de",
});
calendar.render();
