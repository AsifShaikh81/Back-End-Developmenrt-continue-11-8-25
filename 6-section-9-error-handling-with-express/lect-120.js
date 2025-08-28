// topci:120. Handling Duplicate Database Fields

// lect 120
const handleDuplicateFieldsDB = err => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0]; // regex to find text in between qoutes" " ,errmsg returns array so we selecting first element by [0]
  console.log(value);

  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

if (error.code === 11000) error = handleDuplicateFieldsDB(error);