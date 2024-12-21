const authenticate = (role) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).send("Unauthorized");
    }

    if (role === "admin" && token !== "admin") {
      return res.status(403).send("Forbidden: Admins only");
    }

    if (role === "user" && token !== "user" && token !== "admin") {
      return res.status(403).send("Forbidden: Users only");
    }

    req.token = token;
    next();
  };
};

module.exports = authenticate;
