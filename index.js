if(process.env.NODE_ENV === 'production'){
  module.exports = require("./lib/Tes.min.js");
} else{
  module.exports = require("./lib/Tes.js");
}