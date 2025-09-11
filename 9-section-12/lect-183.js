// 183. Building the Tour Overview - Part 2

//in this lect  now fill each of the card elements with the correct data for each of the tours.

/* extends base

block content
 main.main
  .card-container
    each x in tours
        .card
            .card__header
                .card__picture
                    .card__picture-overlay &nbsp;
                    img.card__picture-img(src=`img/tours/${x.imageCover}`, alt=`${x.name}`)
                h3.heading-tertirary
                    //x ke andar tour model ka data hai aur tour model se humne name nikala
                    span= x.name 

            .card__details
                // changed here
                h4.card__sub-heading= `${x.difficulty} ${x.duration}-day tour ` 
                p.card__text= x.summary

                .card__data
                    svg.card__icon
                        use(xlink:href='img/icons.svg#icon-map-pin')
                    // changed here
                    span= x.startLocation.description

                .card__data
                    svg.card__icon
                        use(xlink:href='img/icons.svg#icon-calendar')
                    // changed here
                    span= x.startDates[0].toLocaleString('en-us',{month:'long',year:'numeric'})

                .card__data
                    svg.card__icon
                        use(xlink:href='img/icons.svg#icon-flag')
                    // changed here
                    span= `${x.locations.length} stops`

                .card__data
                    svg.card__icon
                        use(xlink:href='img/icons.svg#icon-user')
                    // changed here
                    span= `${x.maxGroupSize} people` 

            .card__footer
                p
                    span.card__footer-value= `${x.price}`
                    | 
                    span.card__footer-text per person
                p.card__ratings
                    span.card__footer-value= x.ratingsAverage
                    |   
                    span.card__footer-text= `rating (${x.ratingsQuantity})`
                a.btn.btn--green.btn--small(href=`/tours/${x.slug}`) Details
 */