// 159. Nested Routes with Express.


// inside better file strucuture
app.use('/api/v1/tours', ToursRouteDB)
app.use('/api/v1/reviews', ReviewRoute) // ye route humne review create karne ke liye banaya hai 



// insisde tour route
// router.route('/:tourID/reviews').post(authController.protectTourRoute,authController.restrictTo('user'),ReviewController.createReview ) (aab ye logic ki zarwat nahi toh delete kar do or u can comment)
router.use('/:tourID/reviews', Reviewrouter) // agar mein ye route hit kar ke review banaunga toh automatic user ki id ajaygi no need to specify manually , par upar dekhu tour route wala logic and review route wala logic donon duplicate hoo rahe ye nahi hona chaiye kar ke hum merge param ka use kar rahe.

/* ye route ke liye '/:tourID/reviews' and ye route ke liye '/reviews' logic same lag raha toh hum isko merge kar denge using merge param
kaise? like this -->(inside review route) const router = express.Router({mergeParams:true}); */

// insise review route 
router.route('/').get(ReviewController.getAllReviews).post(authController.protectTourRoute,authController.restrictTo('user'),ReviewController.createReview);

// humne dekha  lect 158: jo user review likh raha hai uski id automatically url mein ani chaiye (dhya se lecr 158 ko dekho) ye implement karte waqt kuch chize duplicate ho rahi thi toh iss lecture mein hum merge karenge


// POST /:tourID/reviews