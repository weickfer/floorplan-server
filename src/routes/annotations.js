const { Router } = require('express');

const Sheet = require('../models/sheet');
const Annotation = require('../models/annotation');

const { createSignedUploadUrl } = require('../lib/supabase');

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

router.get('/:sheetId', async (req, res) => {
  const { params } = req
  const sheetId = params.sheetId

  const sheet = await Sheet.findById(sheetId).populate('annotations').select('annotations');
  
  return res.status(200).json(sheet.annotations)
});

module.exports = router;
