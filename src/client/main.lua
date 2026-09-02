--[[
----------------------------------------
RIG HUD (built for RIG-FiveM)

Author: Case (https://caseirl.dev)
Repo: https://github.com/rig-fivem/rig_hud
License: https://github.com/rig-fivem/rig_hud/blob/main/LICENSE
----------------------------------------
]]

--- @file src/client/main.lua
--- @description Handles main client side stuff

--- @section Imports

local _nui = require("src.client.modules.nui")

--- @section Variables

local hud_active = false

--- @section Functions

local function build_hud_payload()
    local statuses = exports.rig:get_player_data("statuses") or {}
    return {
        health = statuses.health or 200,
        armour = statuses.armour or 0,
        hunger = statuses.hunger or 100,
        thirst = statuses.thirst or 100,
        hygiene = statuses.hygiene or 100,
        fatigue = statuses.fatigue or 0,
        sanity = statuses.sanity or 100,
        temperature = statuses.temperature or 37,
        bleeding = statuses.bleeding or 0,
        radiation = statuses.radiation or 0,
        infection = statuses.infection or 0,
        poison = statuses.poison or 0,
        stamina = 100 - GetPlayerSprintStaminaRemaining(PlayerId()),
        oxygen = GetPlayerUnderwaterTimeRemaining(PlayerId()) * 10
    }
end

--- @section Events

RegisterNetEvent("rig_hud:client:toggle_display", function(state)
    if state then
        hud_active = true
        _nui.show_status_hud()
        _nui.send_headshot()
        _nui.update_status_hud(build_hud_payload())
    else
        hud_active = false
        _nui.hide_status_hud()
        _nui.hide_weapon_hud()
    end
end)

RegisterNetEvent("rig_hud:client:update", function()
    if hud_active then
        _nui.update_status_hud(build_hud_payload())
    end
end)

RegisterNetEvent("rig_hud:client:weapon_state_changed", function(is_equipped, weapon_data)
    local weapon_data = weapon_data or {}

    if is_equipped then
        _nui.show_weapon_hud()
        local slot = weapon_data.group or "primary"

        _nui.set_weapon_slot(slot, {
            name = weapon_data.label or weapon_data.id,
            image = weapon_data.id and ("nui://rig_inventory/images/%s.png"):format(weapon_data.id) or nil,
            ammo_clip = tonumber(weapon_data.metadata and weapon_data.metadata.ammo) or 0,
            ammo_reserve = 0
        })
        _nui.set_active_weapon_slot(slot)
    else
        _nui.hide_weapon_hud()
    end
end)

RegisterCommand("togglehud", function()
    hud_active = not hud_active

    if hud_active then
        _nui.show_status_hud()
        _nui.send_headshot()
        _nui.update_status_hud(build_hud_payload())
    else
        _nui.hide_status_hud()
        _nui.hide_weapon_hud()
    end
end)