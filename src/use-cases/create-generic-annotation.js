const GenericAnnotation = require('../models/generic-annotation')

async function createGenericAnnotation({ type, title, description, filename, publicUrl, vectors }) {
  const annotation = new GenericAnnotation({
    title,
    description,
    filename,
    url: publicUrl,
    vectors,
    type,
  })

  await annotation.save()

  return {
    statusCode: 201
  }
}

module.exports = { createGenericAnnotation }