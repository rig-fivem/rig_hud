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

--- @section Constants

local UNARMED_HASH = joaat("WEAPON_UNARMED")

--- @section Variables

local hud_active = false
local current_weapon = nil
local ammo_thread_active = false
local last_clip = -1
local last_reserve = -1

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
        stress = statuses.stress or 100,
        temperature = statuses.temperature or 37,
        bleeding = statuses.bleeding or 0,
        radiation = statuses.radiation or 0,
        infection = statuses.infection or 0,
        poison = statuses.poison or 0,
        stamina = 100 - GetPlayerSprintStaminaRemaining(PlayerId()),
        oxygen = GetPlayerUnderwaterTimeRemaining(PlayerId()) * 10
    }
end

local function update_ammo_counts(ped, hash)
    if not hash or hash == UNARMED_HASH then return end

    local found, clip = GetAmmoInClip(ped, hash)
    if not found then return end

    local total = GetAmmoInPedWeapon(ped, hash)
    local reserve = math.max(0, total - clip)

    if clip ~= last_clip or reserve ~= last_reserve then
        last_clip = clip
        last_reserve = reserve
        _nui.update_weapon_ammo(clip, reserve)
    end
end

local function start_ammo_tracker()
    if ammo_thread_active then return end
    ammo_thread_active = true

    CreateThread(function()
        while current_weapon do
            local ped = PlayerPedId()
            local weapon_hash = GetSelectedPedWeapon(ped)

            if weapon_hash and weapon_hash ~= UNARMED_HASH then
                update_ammo_counts(ped, weapon_hash)

                if IsPedShooting(ped) or IsPedReloading(ped) then
                    Wait(0)
                else
                    Wait(150)
                end
            else
                Wait(250)
            end
        end

        ammo_thread_active = false
        last_clip = -1
        last_reserve = -1
    end)
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
    weapon_data = weapon_data or {}

    if is_equipped then
        current_weapon = weapon_data
        _nui.show_weapon_hud()
        local slot = weapon_data.group or "primary"

        local ped = PlayerPedId()
        local weapon_hash = GetSelectedPedWeapon(ped)
        local clip_ammo = tonumber(weapon_data.metadata and weapon_data.metadata.ammo) or 0
        local reserve_ammo = 0

        if weapon_hash and weapon_hash ~= UNARMED_HASH then
            local found, clip = GetAmmoInClip(ped, weapon_hash)
            if found then clip_ammo = clip end
            local total = GetAmmoInPedWeapon(ped, weapon_hash)
            reserve_ammo = math.max(0, total - clip_ammo)
        end

        last_clip = clip_ammo
        last_reserve = reserve_ammo

        _nui.set_weapon_slot(slot, {
            name = weapon_data.label or weapon_data.id,
            image = weapon_data.id and ("nui://rig_inventory/images/%s.png"):format(weapon_data.id) or nil,
            ammo_clip = clip_ammo,
            ammo_reserve = reserve_ammo
        })
        _nui.set_active_weapon_slot(slot)

        start_ammo_tracker()
    else
        current_weapon = nil
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