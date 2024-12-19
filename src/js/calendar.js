import { Navbar } from "./components/index.js";
import { routes } from "./config.js";

const body = document.querySelector("body");

body.prepend(Navbar(routes));

const url = `${window.location.protocol}//${window.location.hostname}`;

var calendarEl = document.getElementById("calendar");
var calendar = new FullCalendar.Calendar(calendarEl, {
  initialView: "dayGridMonth",
  events: `${url}:8000/events`,
  locale: "de",
});
calendar.render();
