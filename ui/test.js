/*
----------------------------------------
RIG HUD (built for CFX Platforms)

Author: Case (https://caseirl.dev)
Repo: https://github.com/rig-fivem/rig_hud
License: https://github.com/rig-fivem/rig_hud/blob/main/LICENSE
----------------------------------------
*/

import { StatusHUD } from "./js/status.js"
import { WeaponHUD } from "./js/weapon.js"

const status_hud = new StatusHUD()

status_hud.update({
    health: 30,
    armour: 10,
    hunger: 15,
    thirst: 20,
    stamina: 10,
    oxygen: 10,
    temperature: 37,
    sanity: 60,
    fatigue: 10,
    bleeding: 75,
    radiation: 30,
    infection: 20,
    poison: 100
})


const weapon_hud = new WeaponHUD()

weapon_hud.set_weapon('primary', { ammo_clip: 28, ammo_reserve: 90 })
weapon_hud.set_active('primary')
weapon_hud.show()