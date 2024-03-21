export const Email = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i

/**
 * `[ajv-formats]` Internet Email Address [RFC 5321, section 4.1.2.](http://tools.ietf.org/html/rfc5321#section-4.1.2)
 * @example `user@domain.com`
 */
export const isEmail = (value) => {
  return Email.test(value)
}
