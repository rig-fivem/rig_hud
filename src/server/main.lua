--[[
----------------------------------------
RIG HUD (built for RIG-FiveM)

Author: Case (https://caseirl.dev)
Repo: https://github.com/rig-fivem/rig_hud
License: https://github.com/rig-fivem/rig_hud/blob/main/LICENSE
----------------------------------------
]]

--- @file src/server/main.lua
--- @description Handles main server side stuff

--- @section Imports


--- @section RIG Events

AddEventHandler("rig:server:player_playing_state_changed", function(source, state)
    TriggerClientEvent("rig_hud:client:toggle_display", source, state)
end)

AddEventHandler("rig:server:player_tick", function(source)
    TriggerClientEvent("rig_hud:client:update", source)
end)