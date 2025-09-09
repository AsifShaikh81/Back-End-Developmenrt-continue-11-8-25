// 165. Adding Missing Authentication and Authorization

So, we're currently in the process
of putting some finishing touches on our API,
and one of the things that we need to do now
is to fix some of the authentication
and authorization in all our resources.


basicly agar humara api koi aur tour website embed karna chahe toh ?toh islye hum get all tour se auth hata diye 

// get all tour se auth hata kar create and update tour mein laga diya 
router.route('/').get(/* authController.protectTourRoute, */TourControllersDB.getAllTours).post(authController.protectTourRoute,authController.restrictTo('user','lead-guide'),TourControllersDB.postTours);

.patch(authController.protectTourRoute,authController.restrictTo('user','lead-guide'),TourControllersDB.updateTours)

router.route('/monthly-plan/:YEAR').get(authController.protectTourRoute,authController.restrictTo('user','lead-guide'),TourControllersDB.getMonthlyPlan);


// middelware run sequencly , so we using protect function globally => router. use (authCont roller. protect) ; iske baad jo bhi route ayga sab protect hojayga 
router.use(authController.protectTourRoute) // lect 165


//now only adming can get all user ,get user by id,create user,patch,delete user , why ? bcz ye middleware hai aur globally use kiya and middleware rund sequencly
router.use(authController.restrictTo('admin')) //lect 165
router.route('/').get(getAllUsers).post(postUsers);
router.route('/:ID').get(getUsers).patch(patchUsers).delete(deleteUsers);
