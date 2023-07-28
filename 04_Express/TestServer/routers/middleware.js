exports.isNotLoggedIn = (req, res, next) => {
  if (!req.session.loginUser) {
    return next();
  }
  res.status(403).send('로그인한 사용자는 접근할 수 없습니다.');
};