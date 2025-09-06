
//* lect 158. Implementing Simple Nested Routes


/* we're going to talk about something called
nested routes, what they are,
why we need them, and how we can
actually implement them in Express. */

/* Let's think for a second how in practice,
we actually want to create a new review.
Up until this point, when creating new reviews,
we always manually passed the tour ID
and the user ID into the request body,
and then created the review from there, right.
That's okay during development, but of course,
that's not how a review will
be created in the real world.
So, in the real world, the user ID
should ideally come from the currently logged in user
and a tour ID should come from the current tour. */

// inside review controller 
// while posting if we manually dont specify tour id and user id in body then automatocally get tour and user id from url
    if(!req.body.tour) req.body.tour = req.params.tourID;
    if(!req.body.user) req.body.user  = req.user.id //comming from protect tour route 

    //route inside tour route 
    router.route('/:tourID/reviews').post(authController.protectTourRoute,authController.restrictTo('user'),ReviewController.createReview )
    