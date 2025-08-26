class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  filter() {
    //*-------------------req.query
    const queryObj = { ...this.queryStr }; // we cannot directly use 'req.query so we using 'this'
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 1B) Advance Filtering
    let qStr = JSON.stringify(queryObj);

    qStr = qStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    console.log(this.queryStr, JSON.parse(qStr));

    this.query = this.query.find(JSON.parse(qStr));
    //*Tour.find()
    return this;
  }
  sort() {
    //----req.query.sort
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(',').join(' ');
      console.log(sortBy);
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }
  limitFields() {
    //-req.query.fields
    if (this.queryStr.fields) {
      const fieldss = this.queryStr.fields.split(',').join(' ');

      this.query = this.query.select(fieldss);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }
  paginate() {
    const pages = this.queryStr.page * 1 || 1;
    const limits = this.queryStr.limit * 1 || 100;
    const skips = (pages - 1) * limits;

    this.query = this.query.skip(skips).limit(limits);

    console.log({ page: pages, limit: limits, skip: skips });
    return this;
  }
}
module.exports = ApiFeatures;
