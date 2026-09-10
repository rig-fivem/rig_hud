/*
----------------------------------------
RIG HUD (built for CFX Platforms)

Author: Case (https://caseirl.dev)
Repo: https://github.com/rig-fivem/rig_hud
License: https://github.com/rig-fivem/rig_hud/blob/main/LICENSE
----------------------------------------
*/

const SVG_ICONS = {
    // ham
    hunger: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ham-icon lucide-ham"><path d="M13.144 21.144A7.274 10.445 45 1 0 2.856 10.856"/><path d="M13.144 21.144A7.274 4.365 45 0 0 2.856 10.856a7.274 4.365 45 0 0 10.288 10.288"/><path d="M16.565 10.435 18.6 8.4a2.501 2.501 0 1 0 1.65-4.65 2.5 2.5 0 1 0-4.66 1.66l-2.024 2.025"/><path d="m8.5 16.5-1-1"/></svg>`,
    // glass-water
    thirst: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-glass-water-icon lucide-glass-water"><path d="M5.116 4.104A1 1 0 0 1 6.11 3h11.78a1 1 0 0 1 .994 1.105L17.19 20.21A2 2 0 0 1 15.2 22H8.8a2 2 0 0 1-2-1.79z"/><path d="M6 12a5 5 0 0 1 6 0 5 5 0 0 0 6 0"/></svg>`,
    // wind
    oxygen: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.8 19.6A2 2 0 1 0 14 16H2"/><path d="M17.5 8a2.5 2.5 0 1 1 2 4H2"/><path d="M9.8 4.4A2 2 0 1 1 11 8H2"/></svg>`,
    // brain
    stress: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-brain-icon lucide-brain"><path d="M12 18V5"/><path d="M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4"/><path d="M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5"/><path d="M17.997 5.125a4 4 0 0 1 2.526 5.77"/><path d="M18 18a4 4 0 0 0 2-7.464"/><path d="M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517"/><path d="M6 18a4 4 0 0 1-2-7.464"/><path d="M6.003 5.125a4 4 0 0 0-2.526 5.77"/></svg>`,
    // heart-pulse
    fatigue: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart-pulse-icon lucide-heart-pulse"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/><path d="M3.22 13H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"/></svg>`,
    // syringe
    bleeding: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-syringe-icon lucide-syringe"><path d="m18 2 4 4"/><path d="m17 7 3-3"/><path d="M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5"/><path d="m9 11 4 4"/><path d="m5 19-3 3"/><path d="m14 4 6 6"/></svg>`,
    // radiation
    radiation: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-radiation-icon lucide-radiation"><path d="M12 12h.01"/><path d="M14 15.4641a4 4 0 0 1-4 0L7.52786 19.74597 A 1 1 0 0 0 7.99303 21.16211 10 10 0 0 0 16.00697 21.16211 1 1 0 0 0 16.47214 19.74597z"/><path d="M16 12a4 4 0 0 0-2-3.464l2.472-4.282a1 1 0 0 1 1.46-.305 10 10 0 0 1 4.006 6.94A1 1 0 0 1 21 12z"/><path d="M8 12a4 4 0 0 1 2-3.464L7.528 4.254a1 1 0 0 0-1.46-.305 10 10 0 0 0-4.006 6.94A1 1 0 0 0 3 12z"/></svg>`,
    // bug
    infection: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bug-icon lucide-bug"><path d="M12 20v-9"/><path d="M14 7a4 4 0 0 1 4 4v3a6 6 0 0 1-12 0v-3a4 4 0 0 1 4-4z"/><path d="M14.12 3.88 16 2"/><path d="M21 21a4 4 0 0 0-3.81-4"/><path d="M21 5a4 4 0 0 1-3.55 3.97"/><path d="M22 13h-4"/><path d="M3 21a4 4 0 0 1 3.81-4"/><path d="M3 5a4 4 0 0 0 3.55 3.97"/><path d="M6 13H2"/><path d="m8 2 1.88 1.88"/><path d="M9 7.13V6a3 3 0 1 1 6 0v1.13"/></svg>`,
    // skill
    poison: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12.5 17-.5-1-.5 1h1z"/><path d="M15 22a1 1 0 0 0 1-1v-1a2 2 0 0 0 1.56-3.25 8 8 0 1 0-11.12 0A2 2 0 0 0 8 20v1a1 1 0 0 0 1 1z"/><circle cx="15" cy="12" r="1"/><circle cx="9" cy="12" r="1"/></svg>`,
    // heart-plus
    health: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart-plus-icon lucide-heart-plus"><path d="m14.479 19.374-.971.939a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5a5.2 5.2 0 0 1-.219 1.49"/><path d="M15 15h6"/><path d="M18 12v6"/></svg>`,
    // shield
    armour: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shield-icon lucide-shield"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>`,
    // thermometer
    temperature: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-thermometer-icon lucide-thermometer"><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/></svg>`,
    // audio-lines
    voice: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-audio-lines-icon lucide-audio-lines"><path d="M2 10v3"/><path d="M6 6v11"/><path d="M10 3v18"/><path d="M14 8v7"/><path d="M18 5v13"/><path d="M22 10v3"/></svg>`,
    // shower-head
    hygiene: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shower-head"><path d="m4 4 2.5 2.5"/><path d="M13.5 6.5a4.95 4.95 0 0 0-7 7"/><path d="M15 5 5 15"/><path d="M14 17v.01"/><path d="M10 16v.01"/><path d="M13 13v.01"/><path d="M16 10v.01"/><path d="M11 20v.01"/><path d="M17 14v.01"/><path d="M20 11v.01"/></svg>`
}

const CONDITIONS = {
    hunger: { threshold: 60, type: 'below', color: 'var(--status_hunger)' },
    thirst: { threshold: 60, type: 'below', color: 'var(--status_thirst)' },
    oxygen: { threshold: 75, type: 'below', color: 'var(--status_oxygen)' },
    hygiene: { threshold: 75, type: 'below', color: 'var(--status_hygiene)' },
    stress: { threshold: 20, type: 'above', color: 'var(--status_stress)' },
    fatigue: { threshold: 80, type: 'above', color: 'var(--status_fatigue)' },
    bleeding: { threshold: 5, type: 'above', color: 'var(--status_bleeding)' },
    radiation: { threshold: 5, type: 'above', color: 'var(--status_radiation)' },
    infection: { threshold: 5, type: 'above', color: 'var(--status_infection)' },
    poison: { threshold: 5, type: 'above', color: 'var(--status_poison)' }
}

const CONDITION_KEYS = Object.keys(CONDITIONS)

const VOICE_MODES = {
    normal:  { label: 'NORM', class: 'voice_normal' },
    whisper: { label: 'WHIS', class: 'voice_whisper' },
    shout:   { label: 'SHOU', class: 'voice_shout' }
}

const get_condition_colour = (key, pct) => {
    const condition = CONDITIONS[key]
    
    // If a depleted stat hits 0, make it look dark/empty
    if (condition && condition.type === 'below' && pct <= 0) {
        return 'var(--status_empty)'
    }
    
    if (condition && condition.color) return condition.color
    return 'var(--status_default)'
}

const should_show_condition = (key, value, max) => {
    const condition = CONDITIONS[key]
    if (!condition) return false
    const pct = (value / max) * 100
    if (condition.type === 'above') return pct > condition.threshold
    return pct <= condition.threshold
}

export class StatusHUD {
    constructor() {
        this.statuses = {}
        this.voice = 'normal'
        this.container = null
        this.maxes = { health: 200, armour: 100, hunger: 100, thirst: 100, stamina: 100, oxygen: 100, temperature: 50, stress: 100, fatigue: 100, bleeding: 100, radiation: 100, infection: 100, poison: 100 }
        this.build()
    }

    build() {
        $('#status_hud').remove()
        this.condition_els = {}

        const condition_icons_html = CONDITION_KEYS
            .map(key => `<div class="hud_condition_icon hud_condition_hidden" id="cond_${key}" data-key="${key}">${SVG_ICONS[key] || ''}</div>`)
            .join('')
            
        this.container = $(`
            <div id="status_hud">
                <div class="hud_conditions" id="hud_conditions">${condition_icons_html}</div>
                <div class="hud_player">
                    <div class="hud_headshot" id="hud_headshot">
                        <div class="hud_headshot_fallback">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                <circle cx="12" cy="8" r="4"/>
                                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                            </svg>
                        </div>
                    </div>
                    <div class="hud_bars">
                        <div class="hud_bar_row">
                            <div class="hud_bar_icon">${SVG_ICONS.health}</div>
                            <div class="hud_bar_track">
                                <div class="hud_bar_fill" id="bar_fill_health"></div>
                            </div>
                        </div>
                        <div class="hud_bar_row">
                            <div class="hud_bar_icon">${SVG_ICONS.armour}</div>
                            <div class="hud_bar_track">
                                <div class="hud_bar_fill" id="bar_fill_armour"></div>
                            </div>
                        </div>
                    </div>
                    <div class="hud_side">
                        <div class="hud_side_row">
                            <div class="hud_bar_icon">${SVG_ICONS.temperature}</div>
                            <div class="hud_side_value" id="hud_temp">37°C</div>
                        </div>
                        <div class="hud_side_row">
                            <div class="hud_bar_icon">${SVG_ICONS.voice}</div>
                            <div class="hud_side_value voice_normal" id="hud_voice">NORM</div>
                        </div>
                    </div>
                </div>
            </div>
        `)

        // cache refs to each condition icon once, so rebuild_conditions()
        // never needs to touch the DOM structure again
        CONDITION_KEYS.forEach(key => {
            this.condition_els[key] = this.container.find(`#cond_${key}`)
        })

        $('#ui_container').append(this.container)
    }

    rebuild_conditions() {
        CONDITION_KEYS.forEach(key => {
            const value = this.statuses[key]
            const $el = this.condition_els[key]
            if (!$el) return

            const max = this.maxes[key]
            const should_show = value !== undefined && should_show_condition(key, value, max)

            if (!should_show) {
                // only touch the class if it's currently visible
                if (!$el.hasClass('hud_condition_hidden')) {
                    $el.addClass('hud_condition_hidden')
                }
                return
            }

            const pct = (value / max) * 100
            const colour = get_condition_colour(key, pct)

            // becoming visible now — safe to (re)start its animation
            if ($el.hasClass('hud_condition_hidden')) {
                $el.removeClass('hud_condition_hidden')
            }

            // update colour in place, only if it changed, so we don't
            // trigger unnecessary style recalcs / animation restarts
            if ($el.data('colour') !== colour) {
                $el.css('color', colour)
                $el.data('colour', colour)
            }
        })
    }

    update_bar(key, value, max) {
        const $fill = $(`#bar_fill_${key}`)
        if (!$fill.length) return
        const pct = Math.max(0, Math.min(100, (value / max) * 100))
        $fill.css('width', `${pct}%`)
        $fill.toggleClass('critical', pct < 25)
    }

    update_temperature(value) {
        $('#hud_temp').text(`${value.toFixed(1)}°C`)
    }

    update_voice(mode) {
        const vm = VOICE_MODES[mode] || VOICE_MODES.normal
        $('#hud_voice').text(vm.label).attr('class', `hud_side_value ${vm.class}`)
    }

    set_headshot(src) {
        $('#hud_headshot').empty().append(`<img src="${src}" alt="player">`)
    }

    set_voice(mode) {
        this.voice = mode
        this.update_voice(mode)
    }

    update(statuses) {
        if (!statuses) return
        this.statuses = { ...this.statuses, ...statuses }
        if (statuses.health !== undefined) this.update_bar('health', statuses.health, this.maxes.health)
        if (statuses.armour !== undefined) this.update_bar('armour', statuses.armour, this.maxes.armour)
        if (statuses.temperature !== undefined) this.update_temperature(statuses.temperature)
        this.rebuild_conditions()
    }

    show() { this.container.removeClass('hud_hidden') }
    hide() { this.container.addClass('hud_hidden') }
    destroy() { this.container.remove() }
}