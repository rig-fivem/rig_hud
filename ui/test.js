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
    health: 80,
    armour: 10,
    hunger: 55,
    thirst: 50,
    stamina: 100,
    oxygen: 100,
    temperature: 100,
    stress: 100,
    fatigue: 100,
    bleeding: 100,
    radiation: 100,
    infection: 100,
    poison: 100
})


const weapon_hud = new WeaponHUD()

weapon_hud.set_weapon('primary', { ammo_clip: 28, ammo_reserve: 90 })
weapon_hud.set_active('primary')
weapon_hud.show()