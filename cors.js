module.exports = function() {
    return function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Origin", "http://localhost:8080"); 
      res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type');
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      next();
    };
  }