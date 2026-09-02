/*
----------------------------------------
RIG HUD (built for CFX Platforms)

Author: Case (https://caseirl.dev)
Repo: https://github.com/rig-fivem/rig_hud
License: https://github.com/rig-fivem/rig_hud/blob/main/LICENSE
----------------------------------------
*/

// Imports

import { StatusHUD } from "./js/status.js";

const HANDLERS = {}

let status_hud = null;

// Handler Functions

/** HUD */

HANDLERS.show_status_hud = () => {
    if (!status_hud) status_hud = new StatusHUD()
    status_hud.show()
}

HANDLERS.hide_status_hud = () => {
    if (status_hud) status_hud.hide()
}

HANDLERS.update_status_hud = (data) => {
    if (!data || !data.payload) return
    if (!status_hud) status_hud = new StatusHUD()
    status_hud.update(data.payload)
}

HANDLERS.set_status_headshot = (data) => {
    if (!data || !data.payload) return
    if (!status_hud) status_hud = new StatusHUD()
    status_hud.set_headshot(data.payload.src)
}

HANDLERS.destroy_status_hud = () => {
    if (status_hud) {
        status_hud.destroy()
        status_hud = null
    }
}

/**
 * Global message listener for all NUI messages.
 * Routes each message to its corresponding handler.
 */
window.addEventListener("message", (event) => {
    const { func } = event.data;
    const handler = HANDLERS[func];

    if (typeof handler !== "function") {
        console.warn(`Handler missing: ${func}`);
        return;
    }

    handler(event.data);
});