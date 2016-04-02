Todos = new Mongo.Collection('todos');
if (Meteor.isClient) {
  Meteor.subscribe('todos');
 Template.main.helpers({
todos: function(){
return Todos.find( {} ,{sort: {createdAt:-1}});
}
 });
 Template.main.events({
  "submit .new-todo" : function(event) {
    var text= event.target.text.value ;

     Meteor.call('addTodo',text);
    //clear form
    event.target.text.value='' ;
     return false ;
  },
  "click .toggle-checked " : function(){
    Meteor.call('setchecked',this._id ,! this.checked );
  },
  "click .delete-todo " : function(){
    if (confirm("Are you sure ?")){
      Meteor.call('deleteTodos',this._id);
     }
  }
 });
 Accounts.ui.config({
   passwordSignupFields:"USERNAME_ONLY"
 });
}
if (Meteor.isServer) {
Meteor.publish('todos',function(){
    if (!this.userId){
      throw new Meteor.error('plz sight in to edit ');
    return Todos.find( );

    }
    else
      return Todos.find({userId:this.userId});

});


  }

//meteor methods
Meteor.methods({
addTodo: function(text){
  if (!Meteor.userId()){
    throw new Meteor.error('not-authorized');
  }
  Todos.insert({
    text:text,
    createdAt:new Date(),
    userId: Meteor.userId(),
    username: Meteor.user().username
  });
},
deleteTodos:function(todoId){
  var todo = Todos.findOne(todoId);
  if(todo.userId !==Meteor.userId()){
    throw new Meteor.Error('not-authorized');
  }
  Todos.remove(todoId);
},
setchecked:function(todoId ,setchecked){
  var todo = Todos.findOne(todoId);
  if(todo.userId !==Meteor.userId()){
    throw new Meteor.Error('not-authorized');
  }
  Todos.update(todoId , {$set:{checked : setchecked}});
},
});
