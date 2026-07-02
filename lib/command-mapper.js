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
         */
        this.commandMap = {
            'turnOn': () => ({ command: 'turnOn', parameter: 'default' }),
            'turnOff': () => ({ command: 'turnOff', parameter: 'default' }),
            'press': () => ({ command: 'press', parameter: 'default' }),
            'setPosition': (value) => ({ command: 'setPosition', parameter: `0,ff,${value}` }),
            'setBlindPosition': (value) => ({ command: 'setPosition', parameter: String(value), commandType: 'command' }),
            'setBrightness': (value) => ({ command: 'setBrightness', parameter: value }),
            'setColor': (value) => ({ command: 'setColor', parameter: value }),
            'setColorTemperature': (value) => ({ command: 'setColorTemperature', parameter: value }),
            'lock': () => ({ command: 'lock', parameter: 'default' }),
            'unlock': () => ({ command: 'unlock', parameter: 'default' }),
            'open': () => ({ command: 'turnOff', parameter: 'default', commandType: 'command' }),
            'close': () => ({ command: 'turnOn', parameter: 'default', commandType: 'command' }),
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
