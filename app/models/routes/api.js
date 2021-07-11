var User = require("../user");

module.exports = function (router) {
  //http://localhost:8080/users
  router.post("/users", function (req, res) {
    var user = new User();

    user.username = req.body.username;
    user.password = req.body.password;
    user.email = req.body.email;

    if (
      user.username === null ||
      user.username === "" ||
      user.password == null ||
      user.password == "" ||
      user.email == null ||
      user.email == ""
    ) {
      res.send("Ensure username, password and email must be enterd !");
    } else {
      user.save(function (err) {
        if (err) {
          res.send("User or Email already exists !!");
        } else {
          res.send("user created");
        }
      });
    }
  });
  return router;
};
