import { FormatRegistry } from '@sinclair/typebox/type'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { Errors } from '@sinclair/typebox/errors'

import { REQUEST_SEGMENTS } from '../utils/index.js'
import { isEmail, isUuid } from '../validations/formatters/index.js'

// Register TypeBox curtom formatter
FormatRegistry.Set('uuid', isUuid)
FormatRegistry.Set('email', isEmail)

/**
 * Give format to the Joi error object
 *
 * @param {object[]} error
 * @param {string} source
 * @returns {object}
 */
const formatError = (error, source) => {
  const errors = Array.from(error).map(({ path, message }) => {
    return {
      key: path.slice(1),
      message
    }
  })

  return {
    status: StatusCodes.BAD_REQUEST,
    title: ReasonPhrases.BAD_REQUEST,
    details: {
      source,
      errors
    }
  }
}

/**
 *
 * @param {ValidationSchema} schema Joi schema
 * @returns {Function} The validation middleware
 */
const validate = (schema) => {
  return async (req, res, next) => {
    if (schema[REQUEST_SEGMENTS.PARAMS] !== undefined) {
      const error = [...Errors(schema[REQUEST_SEGMENTS.PARAMS], req.params)]

      if (error.length > 0) {
        return res.status(StatusCodes.BAD_REQUEST)
          .json(formatError(error, REQUEST_SEGMENTS.QUERY))
      }
    }

    if (schema[REQUEST_SEGMENTS.QUERY] !== undefined) {
      const { error } = await schema[REQUEST_SEGMENTS.QUERY]
        .validateAsync(req.query, VALIDATE_OPTIONS)
        .catch((error) => {
          return { error }
        })

      if (error) {
        return res.status(StatusCodes.BAD_REQUEST)
          .json(formatError(error, REQUEST_SEGMENTS.QUERY))
      }
    }

    if (schema[REQUEST_SEGMENTS.BODY] !== undefined) {
      const error = [...Errors(schema[REQUEST_SEGMENTS.BODY], req.body)]

      if (error.length > 0) {
        return res.status(StatusCodes.BAD_REQUEST)
          .json(formatError(error, REQUEST_SEGMENTS.BODY))
      }
    }

    if (schema[REQUEST_SEGMENTS.FILES] !== undefined) {
      const { error } = await schema[REQUEST_SEGMENTS.FILES]
        .validateAsync((req).files, VALIDATE_OPTIONS)
        .catch((error) => {
          return { error }
        })

      if (error) {
        return res.status(StatusCodes.BAD_REQUEST)
          .json(formatError(error, REQUEST_SEGMENTS.FILES))
      }
    }

    next()
  }
}

export default validate
