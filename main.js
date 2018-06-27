(function () {
  'use strict'

  var vm = new Vue({
    el: '#app',

    data: {
      newItem: '',
      todos:[]
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
          isDone: false
        };
          this.todos.push(item);
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
