const router = require('express').Router()
const User = require('../models/user')




router.post('/register', async(req, res) => {

  try {
  const user = await new User({...req.body})
  await user.save()
  res.status(200).json(user)
  } catch (e) {
    res.status(500).send(e)
  }

})

module.exports = router