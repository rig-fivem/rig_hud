--[[
----------------------------------------
RIG HUD (built for RIG-FiveM)

Author: Case (https://caseirl.dev)
Repo: https://github.com/rig-fivem/rig_hud
License: https://github.com/rig-fivem/rig_hud/blob/main/LICENSE
----------------------------------------
]]

--- @module nui
--- @file src/client/modules/nui.lua
--- @description Handles core NUI stuff; notifications, modals, ui framework etc.


--- @section Guard

if rawget(_G, "__client_nui_module") then
    return _G.__client_nui_module
end

--- @section Initialisation

local m = {}
_G.__client_nui_module = m

--- @section Headshot

function m.get_player_headshot(player_ped)
    player_ped = player_ped or PlayerPedId()
    local headshot = RegisterPedheadshotTransparent(player_ped)
    if not (headshot and IsPedheadshotValid(headshot)) then
        return nil
    end

    local timeout, txd = 1000, nil
    while not IsPedheadshotReady(headshot) and timeout > 0 do
        Wait(10)
        timeout = timeout - 10
    end

    if IsPedheadshotReady(headshot) then
        txd = GetPedheadshotTxdString(headshot)
        SetTimeout(2000, function() UnregisterPedheadshot(headshot) end)
    else
        UnregisterPedheadshot(headshot)
    end

    return txd and ("https://nui-img/%s/%s?v=%d"):format(txd, txd, GetGameTimer())
end

--- @section HUD

function m.send_headshot()
    local src = m.get_player_headshot()
    SendNUIMessage({ func = "set_status_headshot", payload = { src = src } })
end

function m.show_status_hud()
    print("m.show_status_hud")
    SendNUIMessage({ func = "show_status_hud" })
end

function m.hide_status_hud()
    SendNUIMessage({ func = "hide_status_hud" })
end

function m.update_status_hud(data)
    if not data then return end
    SendNUIMessage({ func = "update_status_hud", payload = data })
end

function m.destroy_status_hud()
    SendNUIMessage({ func = "destroy_status_hud" })
end

--- @section Events

RegisterNetEvent("rig:client:show_status_hud", function()
    m.show_status_hud()
end)

RegisterNetEvent("rig:client:hide_status_hud", function()
    m.hide_status_hud()
end)

RegisterNetEvent("rig:client:update_status_hud", function(data)
    m.update_status_hud(data)
end)

RegisterNetEvent("rig:client:destroy_status_hud", function()
    m.destroy_status_hud()
end)

--- @section Exports

exports("show_status_hud", m.show_status_hud)
exports("hide_status_hud", m.hide_status_hud)
exports("update_status_hud", m.update_status_hud)
exports("destroy_status_hud", m.destroy_status_hud)

return m