let logger =  null;
const DemoLogger = require("./DemoLogger");
console.log(logger)

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV !== 'production') {
    console.log("coming here")
    logger= DemoLogger()
  }

  module.exports = logger