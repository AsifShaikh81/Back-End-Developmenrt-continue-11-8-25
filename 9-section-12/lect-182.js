// 182. Building the Tour Overview - Part 1

// in this lecture we will build overview template humne ek card ka template banya overviewtemp ke andar aur fir usko loop kar diya
// 1) Get tour data from collection
exports.getOverview = tryCatchAsync(async (req, res) => {
  // 1) Get tour data from collection
  const tours = await Tour.find();
  res.status(200).render('overviewTemp', {
    title: 'All Tours',
    tours,// all the tour data from collection pass to template
  });
});
// 2) Build template(overview template)
/* extends base

block content
 main.main
  .card-container
    each x in tours
        .card
            .card__header
                .card__picture
                    .card__picture-overlay &nbsp;
                    img.card__picture-img(src='img/tour-1-cover.jpg', alt='Tour 1')
                h3.heading-tertirary
                    span The Forest Hiker

            .card__details
                h4.card__sub-heading Easy 5-day tour
                p.card__text Breathtaking hike through the Canadian Banff National Park

                .card__data
                    svg.card__icon
                        use(xlink:href='img/icons.svg#icon-map-pin')
                    span Banff, Canada

                .card__data
                    svg.card__icon
                        use(xlink:href='img/icons.svg#icon-calendar')
                    span April 2021

                .card__data
                    svg.card__icon
                        use(xlink:href='img/icons.svg#icon-flag')
                    span 3 stops

                .card__data
                    svg.card__icon
                        use(xlink:href='img/icons.svg#icon-user')
                    span 25 people

            .card__footer
                p
                    span.card__footer-value $297
                    span.card__footer-text per person
                p.card__ratings
                    span.card__footer-value 4.9
                    span.card__footer-text rating (21)
                a.btn.btn--green.btn--small(href='#') Details */


// 3) Render that template using tour data from step 1
//  pug comes with built in loops
// 'tour'==> variable contain all the collection from model
// each x in tours -->// jo upar controller mein data pass kiya tha 'tours' usme total 9 collection hai toh 9 timed loop karega aur card banayga