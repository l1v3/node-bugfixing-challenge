const express = require('express');
const UserController = require('./user-controller');

const router = express.Router();

router
  .get('/charts', async (req, res) => {
    const controller = new UserController();
    const usersForCharts = await controller.getUsersForCharts();
    res.json(usersForCharts);
  })
  .get('/:userId/latestTodos', async (req, res) => {
    const controller = new UserController();
    const todos = await controller.getLatestIncompletedTodos(req.params.userId);
    res.json(todos);
  })
  .get('/invite/:lat/:lng', (async (req, res) => {
    const controller = new UserController();
    const { lat, lng } = req.params;
    const users = controller.getUsersToInvite(lat, lng);
    return users;
  }))
  ;


module.exports = router;
