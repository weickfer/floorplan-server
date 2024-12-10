const Annotation = require('../models/annotation')
const Sheet = require('../models/sheet')

async function createSheetAnnotation({ sheetId, title, description, filename, publicUrl, vectors }) {
  const sheet = await Sheet.findById(sheetId)

  if(!sheet) {
    return {
      error: 'Sheet not found',
      statusCode: 404,
    }
  }

  const annotation = new Annotation({
    sheet: sheet._id,

    title,
    description,
    filename,
    url: publicUrl,
    vectors,
  })

  const savedAnnotation = await annotation.save()
  sheet.annotations.push(savedAnnotation._id)
  await sheet.save()

  return {
    statusCode: 201
  }
}

module.exports = { createSheetAnnotation }