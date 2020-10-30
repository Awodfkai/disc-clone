const router = require('express').Router();

const routes = ['user', 'server', 'channel', 'role', 'serverMembers'];

for (let route of routes) {
  router.use(`/${route}`, require(`./${route}`));
}

module.exports = router;
