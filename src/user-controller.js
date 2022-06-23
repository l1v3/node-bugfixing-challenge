const axios = require('axios');
const usersList = require('./users-list');

module.exports = class UserController {
  constructor() {
    this.usersUrl = 'https://jsonplaceholder.typicode.com/users';
    this.todosUrl = 'https://jsonplaceholder.typicode.com/todos';
  }

  async getUsersForCharts() {
    const usersRes = await axios.get(this.usersUrl);
    const users = usersRes.data;
    for (const user of users) {
      const todosRes = await axios.get(`${this.todosUrl}?userId=${user.id}`);
      user.completedTodos = todosRes.data.filter(t => t.completed).length;
      user.incompletedTodos = todosRes.data.filter(t => !t.completed).length;
    }

    const unsortedUsers = users.map(u => ({
      id: u.id,
      name: u.name,
      completedTodos: u.completedTodos,
      incompletedTodos: u.incompletedTodos,
    }));

    const usersIdAscending = unsortedUsers.sort((a, b) => a.id - b.id)
    const usersCompletedAscending = usersIdAscending.sort((a, b) => a.completedTodos - b.completedTodos);
    const usersIncompletedAscending = usersIdAscending.sort((a, b) => a.incompletedTodos - b.incompletedTodos);

    return {
      usersIdAscending,
      usersCompletedAscending,
      usersIncompletedAscending
    };
  }

  async getLatestIncompletedTodos(userId) {
    const todosRes = await axios.get(`${this.todosUrl}?userId=${userId}`);
    const todos = todosRes.data;
    return todos
      .sort((a, b) => b.id - a.id)
      .map(t => ({ id: t.id, title: t.title }))
      .filter(x => !x.completed);
  }

  /**
   * Returns up to 3 users who 
   * lives in radius of 20km from event,
   * lives closest to event place
   * and have an email
   * @param {Number} x - x coordinate of event place
   * @param {Number} y - y coordinate of event place
   * @returns - {Object} User object with { id, email } properties in it
   */
  async getUsersToInvite (x, y) {
    return usersList;
  }
};
