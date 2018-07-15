(function () {
  'use strict'

  // modal component
  Vue.component('modal', {
  template: '#modal-template'
  })

  // app
  var vm = new Vue({
    el: '#app',

    data: {
      newItem: '',
      todos:[], // todos[title, isDone, date]
      showModal: false,
      editId: 0
    },

    watch: {
      todos: {
        handler: function(){
          localStorage.setItem('todos', JSON.stringify(this.todos));
        },
      deep: true
      }
    },

    mounted: function(){
      this.todos = JSON.parse(localStorage.getItem('todos')) || [];
    },

    methods: {
      addItem: function (){
        var item = {
          title: this.newItem,
          isDone: false,
          date: new Date().toLocaleString()
        };
        if (this.newItem !== ''){
          this.todos.push(item);
        }
        this.newItem = ""; //inputフィールドを空に
        },
      deleteItem: function (index){
        var title = this.todos[index].title;
        if (confirm(title+'を削除しますか？')){
          this.todos.splice(index, 1);
        }
      },
      purge: function (){
        if (!confirm('終了したタスクを削除しますか？')){
          return;
        }
        this.todos = this.remaining;
      },
      editItem: function(index){
        this.editId = index;
        this.showModal = true;
      }
    },

    computed: {
      remaining: function () {
        return this.todos.filter(function(todo){
          return !todo.isDone;
        });
      }
    }

  });
})();
