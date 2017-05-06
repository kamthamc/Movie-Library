import * as React from "react";
import {render} from "react-dom";
import {AppComponent} from "./AppComponent";

const rootEl = document.getElementById("root");

render(
    <AppComponent />,
    rootEl
);

(function () {
    if ('serviceWorker' in navigator && window.location.href.indexOf('localhost') === -1) {
        navigator.serviceWorker.register('./movie-organizer-service-worker.js');
    }
})();