const User = require("./models");

const createUser = async (username, hashedPassword) => {
  const newUser = await User.query().insertAndFetch({
    username: username,
    password: hashedPassword,
  });

  console.log(newUser.username);
};

module.exports = createUser;
