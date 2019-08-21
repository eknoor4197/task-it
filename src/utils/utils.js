module.exports = {
    //Get saved todos from localStorage
    getSavedTodos: function() {
        let todosJSON = localStorage.getItem('Todos')
        return todosJSON ? JSON.parse(todosJSON) : []
    },

    //Save Todos in localStorage
    saveTodos: function(todos) {
        localStorage.setItem('Todos', JSON.stringify(todos))
    }
}