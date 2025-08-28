const express = require('express')
const router = express.Router()
const authCookies = require('../middleware/authCookies')
const reviewController = require('../controllers/reviewController')

router.get('/', reviewController.getAllReviews)
router.get('/:id', reviewController.getReviewById)
router.post('/', authCookies, reviewController.createReview)

module.exports = router
