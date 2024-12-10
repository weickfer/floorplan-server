const { Router } = require('express');

const Sheet = require('../models/sheet');
const Annotation = require('../models/annotation');
const GenericAnnotation = require('../models/generic-annotation');

const { createSignedUploadUrl } = require('../lib/supabase');
const { createSheetAnnotation } = require('../use-cases/create-sheet-annotation');
const { createGenericAnnotation } = require('../use-cases/create-generic-annotation');

const router = Router();

router.post('/:sheetId/create-signed-url', async (req, res) => {
  const { body, params } = req
  const sheetId = params.sheetId

  const { title, description, filename } = body
  const { publicUrl, signedUrl } = await createSignedUploadUrl(filename)
  const vectors = JSON.parse(body.vectors)

  const sheet = await Sheet.findById(sheetId)

  if(!sheet) {
    return res.status(404).send()
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
  
  return res.json({ signedUrl })
});

router.post('/create-signed-url', async (req, res) => {
  const { body, query } = req
  const { sheetId, type } = query
  let response;

  const { title, description, filename } = body
  const { publicUrl, signedUrl } = await createSignedUploadUrl(filename)
  const vectors = JSON.parse(body.vectors)

  if(sheetId) {
    response = await createSheetAnnotation({
      sheetId, title, description, filename, publicUrl, vectors
    })
  }

  if(type) {
    response = await createGenericAnnotation({
      title, description, filename, publicUrl, vectors, type,
    })
  }
  
  if(response.error) {
    return res.status(response.statusCode).send()
  }

  return res.json({ signedUrl })
});


router.get('/by-type/:type', async (req, res) => {
  const { params } = req
  const type = params.type

  const genericAnnotations = await GenericAnnotation.find({
    type
  })

  return res.status(200).json(genericAnnotations)
});

router.get('/:sheetId', async (req, res) => {
  const { params } = req
  const sheetId = params.sheetId

  const sheet = await Sheet.findById(sheetId).populate('annotations').select('annotations');
  
  return res.status(200).json(sheet.annotations)
});

module.exports = router;
