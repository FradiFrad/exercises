const User = require("./models");

const createUser = async (username, hashedPassword) => {
  const newUser = await User.query().insertAndFetch({
    username: username,
    password: hashedPassword,
  });
  delete newUser.password;
  delete newUser.id;

  // const { password, id, ...user } = newUser;
  return newUser;

  // console.log(newUser.username);
};

module.exports = createUser;
