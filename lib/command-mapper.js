/**
 * Command Mapper
 *
 * Maps state names to SwitchBot API command format
 * Separates command mapping logic from execution (Single Responsibility Principle)
 */

'use strict';

class CommandMapper {
    constructor() {
        /**
         * Command mapping functions
         * Each function takes a value and returns the API command format
         * IR: https://github.com/OpenWonderLabs/SwitchBotAPI/blob/main/devices/others/virtual-infrared-remote-devices.md
         */
        this.commandMap = {
            'turnOn': () => ({ command: 'turnOn', parameter: 'default' }),
            'turnOff': () => ({ command: 'turnOff', parameter: 'default' }),
            'press': () => ({ command: 'press', parameter: 'default' }),
            'setPosition': (value) => ({ command: 'setPosition', parameter: `0,ff,${value}` }),
            'setBlindPosition': (value) => ({ command: 'setPosition', parameter: String(value), commandType: 'command' }),  //2PM
            'setBrightness': (value) => ({ command: 'setBrightness', parameter: value }),
            'setColor': (value) => ({ command: 'setColor', parameter: value }),
            'setColorTemperature': (value) => ({ command: 'setColorTemperature', parameter: value }),
            'lock': () => ({ command: 'lock', parameter: 'default' }),
            'unlock': () => ({ command: 'unlock', parameter: 'default' }),
            'open': () => ({ command: 'setPosition', parameter: '0', commandType: 'command' }),
            'close': () => ({ command: 'setPosition', parameter: '100', commandType: 'command' }),                  //2PM
            'pause': () => ({ command: 'pause', parameter: 'default', commandType: 'command' }),                    //DVD, 2PM
            'break': () => ({ command: 'break', parameter: 'default', commandType: 'command' }),                    //2PM
            'stop': (value) => ({ command: 'stop', parameter: value, commandType: 'command' }),                     //DVD, vacuuming value: 'default'
            'setOn': (value) => ({ command: 'turnOn', parameter: value, commandType: 'command' }),
            'setOff': (value) => ({ command: 'turnOff', parameter: value, commandType: 'command' }),
            'mute':  () => ({ command: 'setMute', parameter: 'default', commandType: 'command'}),                   //TV, IPTV/Streamer, Set Top Box
            'voldown':  () => ({ command: 'volumeSub', parameter: 'default', commandType: 'command'}),
            'volup':  () => ({ command: 'volumeAdd', parameter: 'default', commandType: 'command'}),
            'channeldown': () => ({ command: 'channelSub', parameter: 'default', commandType: 'command'}),
            'channelup':  () => ({ command: 'channelAdd', parameter: 'default', commandType: 'command'}),
            'channel':  (value) => ({ command: 'setChannel', parameter: value, commandType: 'command'}),
            'fastforward':  () => ({ command: 'FastForward', parameter: 'default', commandType: 'command'}),        //DVD
            'rewind':  () => ({ command: 'Rewind', parameter: 'default', commandType: 'command'}),
            'nexttrack':  () => ({ command: 'Next', parameter: 'default', commandType: 'command'}),
            'lasttrack':  () => ({ command: 'Previous', parameter: 'default', commandType: 'command'}),
            'play':  () => ({ command: 'Play', parameter: 'default', commandType: 'command'}),
            'brightnessUp':  () => ({ command: 'brightnessUp', parameter: 'default', commandType: 'command'}),      //Light
            'brightnessDown':  () => ({ command: 'brightnessDown', parameter: 'default', commandType: 'command'}),  //Light
            'UserDef':  (command) => ({ command: command, parameter: 'default', commandType: 'customize'})          // User-Defined
        };
    }

    /**
     * Map command name and value to SwitchBot API format
     * @param {string} commandName - Command name
     * @param {any} value - Command value (optional, used for parameterized commands)
     * @returns {object|null} Command data object or null if command unknown
     */
    mapCommand(commandName, value = null) {
        const mapper = this.commandMap[commandName];

        if (!mapper) {
            return null;
        }

        return mapper(value);
    }

    /**
     * Check if a command is supported
     * @param {string} commandName - Command name to check
     * @returns {boolean} True if command is supported
     */
    isSupported(commandName) {
        return commandName in this.commandMap;
    }

    /**
     * Get all supported command names
     * @returns {string[]} Array of supported command names
     */
    getSupportedCommands() {
        return Object.keys(this.commandMap);
    }
}

module.exports = CommandMapper;
