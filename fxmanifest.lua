--[[
----------------------------------------
RIG HUD (built for RIG-FiveM)

Author: Case (https://caseirl.dev)
Repo: https://github.com/rig-fivem/rig_hud
License: https://github.com/rig-fivem/rig_hud/blob/main/LICENSE
----------------------------------------
]]

fx_version "cerulean"
games { "gta5" }
name "rig_hud"
version "0.1.0"
description "Status and weapon hud for RIG (FiveM)."
license "Apache 2.0"
author "Case"
lua54 "yes"

ui_page "ui/index.html"
files {
    "ui/**/*",
}

shared_scripts {
    "init.lua"
}

client_scripts {
    "src/client/modules/*.lua",
    "src/client/main.lua"
}
server_scripts {
    "src/server/*.lua"
}

dependency "rig"