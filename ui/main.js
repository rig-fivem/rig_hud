/*
----------------------------------------
RIG HUD (built for CFX Platforms)

Author: Case (https://caseirl.dev)
Repo: https://github.com/rig-fivem/rig_hud
License: https://github.com/rig-fivem/rig_hud/blob/main/LICENSE
----------------------------------------
*/

import { StatusHUD } from "./js/status.js";
import { WeaponHUD } from "./js/weapon.js";

const HANDLERS = {}

let status_hud = null;
let weapon_hud = null;

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

/** Weapon HUD */

HANDLERS.show_weapon_hud = () => {
    if (!weapon_hud) weapon_hud = new WeaponHUD()
    weapon_hud.show()
}

HANDLERS.hide_weapon_hud = () => {
    if (weapon_hud) weapon_hud.hide()
}

HANDLERS.set_weapon_slot = (data) => {
    if (!data || !data.payload) return
    if (!weapon_hud) weapon_hud = new WeaponHUD()
    const { slot, weapon_data } = data.payload
    weapon_hud.set_weapon(slot, weapon_data)
}

HANDLERS.set_active_weapon_slot = (data) => {
    if (!data || !data.payload) return
    if (!weapon_hud) weapon_hud = new WeaponHUD()
    weapon_hud.set_active(data.payload.slot)
}

HANDLERS.update_weapon_ammo = (data) => {
    if (!data || !data.payload) return
    if (!weapon_hud) weapon_hud = new WeaponHUD()
    const { clip, reserve } = data.payload
    weapon_hud.update_ammo(clip, reserve)
}

HANDLERS.destroy_weapon_hud = () => {
    if (weapon_hud) {
        weapon_hud.destroy()
        weapon_hud = null
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