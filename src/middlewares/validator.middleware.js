export const validateSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body)
    next()
  } catch (error) {
    // error: recorre el array de errors y muestra solo el mensaje de error en json
    return res.status(400).json({ error: error.errors.map((error) => error.message) })
  }
}
