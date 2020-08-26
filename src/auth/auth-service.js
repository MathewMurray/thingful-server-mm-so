/* eslint-disable strict */
const AuthService = {
  getUserWithUserName(db,user_name){
    return db('thingful_users')
      .where({ user_name})
      .first();
  }
};
module.exports = AuthService;