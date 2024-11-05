const { Router } = require('express');

const Sheet = require('../models/sheet');
const Annotation = require('../models/annotation');

const { createSignedUploadUrl, createPath, supabase } = require('../lib/supabase');

const router = Router();

router.post('/create-signed-url', async (req, res) => {
  try {
      const filename = req.body.filename
      
      const { publicUrl, signedUrl } = await createSignedUploadUrl(filename)

      const sheet = new Sheet({
        filename,
        url: publicUrl
      })
      await sheet.save()

      res.status(200).json({ sheetId: sheet._id, signedUrl  });
  } catch (error) {
      console.log(error)
      res.status(500).json({ error });
  }
});

router.get('/', async (req, res) => {
  const sheets = await Sheet.find()

  return res.json(sheets)
})

router.get('/:sheetId', async (req, res) => {
  const sheet = await Sheet.findById(req.params?.sheetId).populate('annotations').select([
    'url',
    'annotations'
  ])

  return res.json(sheet)
})

router.delete('/:sheetId', async (req, res) => {
  const sheet = await Sheet.findById(req.params?.sheetId).populate('annotations').select([
    'url',
    'annotations'
  ])

  if(!sheet) return res.status(404).send()

  const sheetPath = createPath(sheet.url.split('/').pop())
  const annotationsPaths = sheet.annotations.map(annotation => createPath(
    annotation.url.split('/').pop()
  ))
  const paths = [sheetPath, ...annotationsPaths]

  await supabase.storage.from('sheets').remove(paths)

  await Annotation.deleteMany({ sheet: sheet.id })
  await Sheet.findOneAndDelete({ id: sheet.id })

  return res.status(200).send()
})

module.exports = router;
