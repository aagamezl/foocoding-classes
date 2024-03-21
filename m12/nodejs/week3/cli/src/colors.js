export const colors = {
  /**
   *
   * @param {string} message
   * @returns {string}
   */
  blue: (message) => {
    return `\x1b[34m${message}\x1b[0m`
  },

  /**
   *
   * @param {string} message
   * @returns {string}
   */
  cyan: (message) => {
    return `\x1b[36m${message}\x1b[0m`
  },

  /**
   *
   * @param {string} message
   * @returns {string}
   */
  green: (message) => {
    return `\x1b[32m${message}\x1b[0m`
  },

  /**
   *
   * @param {string} message
   * @returns {string}
   */
  magenta: (message) => {
    return `\x1b[35m${message}\x1b[0m`
  },

  /**
   *
   * @param {string} message
   * @returns {string}
   */
  red: (message) => {
    return `\x1b[31m${message}\x1b[0m`
  },

  /**
   *
   * @param {string} message
   * @returns {string}
   */
  yellow: (message) => {
    return `\x1b[33m${message}\x1b[0m`
  }
}
