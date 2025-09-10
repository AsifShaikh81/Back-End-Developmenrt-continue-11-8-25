exports.getOverview = (req, res) => {
  res.status(200).render('overviewTemp', {
    tour: 'the forest hiker',
    user: 'Asif',
  });
};

exports.getTour =  (req, res) => {
  res.status(200).render('tourTemp', {
    title: 'the forest hiker',
  });
}