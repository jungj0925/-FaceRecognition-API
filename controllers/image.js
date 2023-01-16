import Clarifai from 'clarifai'

const app = new Clarifai.App({
    apiKey: "74a474bbe474416fbe7881fa52630cab"

})

const handleApiCall = (req, res) => {
  app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
  .then(data => {
    res.json(data)
  })
}

const handleImage = (req, res, db) => {
    {
        const { id } = req.body;
        db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(data => {
            res.json(data[0]);
        }).catch(err => res.status(400).json('Unable to get Entries'))
    }
}

export {handleImage, handleApiCall}