import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import loadingGif from './giphy.gif';
import Listitem from './Listitem';

class App extends Component {
  constructor(){
    super()
    this.state={
      newTodo:'',
      editing: false,
      editingIndex:null,
      notification:null,
      loading:true,
      
      todos:[]
    }
    this.api_url = 'https://5b460ae7ae7efb00143cc28a.mockapi.io';
    this.handlechange = this.handlechange.bind(this);
    this.addTodo=this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.editTodo =this.editTodo.bind(this);
    
  }
  handlechange(event){
    this.setState({
      newTodo:event.target.value
    })
  }

 

  async addTodo(){
    

      const response = await axios.post(`${this.api_url}/todos`,{
        name:this.state.newTodo
      })
      console.log(response)

  

    const todos = this.state.todos
    todos.push(response.data)
    this.setState({
      todos:todos,
      newTodo:''
      
    

    })
    this.alert('Added Todo succesffuuly')
  }
  alert(notification){
    this.setState({
      notification
    })
    setTimeout=(()=>{
      this.setState({
        notification:null
      })
    },1000)
  }

  async deleteTodo(i){
    const todos = this.state.todos;
    const todo = todos[i]
    await axios.delete(`${this.api_url}/todos/${todo.id}`)
    delete todos[i]

    this.setState({
      todos
      
    })
    this.alert('deletedTodo succesffuuly')
  }

  editTodo(i){
const todo = this.state.todos[i]

  this.setState({
    editing:true,
    newTodo: todo.name,
    editingIndex:i
  })


  }

  async updateTodo(){
    const todo = this.state.todos[this.state.editingIndex]
    const response = await axios.get(`${this.api_url}/todos/${todo.id}`,{
      name:this.state.newTodo
    })

  const todos =this.state.todos

  todos[this.state.editingIndex] =response.data;

  this.setState({
    todos,
    editingIndex:null,
    newTodo:'',
    editing:false,
   
  })
 this.alert('Updated Todo succesffuuly')

  }
  
  async componentDidMount(){
    const response = await axios.get(`${this.api_url}/todos`);
    console.log(response)
    this.setState({
      todos:response.data,
      loading:false
    })
  }

 

  render() {
    console.log(this.state.newTodo)
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">CRUD React</h1>
        </header>
        <div className="container">
        {this.state.notification&&
         <div className="alert mt-3 alert-success">
         <p className="text-center">{this.state.notification}</p>
         
         </div>
        }
        <input className="mb-4 mt-2 form-control form-control-lg" type="text"
         placeholder="add new todo" value={this.state.newTodo} onChange={this.handlechange}/>
         <button type="button" className="btn btn-info mb-3"onClick={this.state.editing?this.updateTodo:this.addTodo}>{this.state.editing?'Update Todo':'Add todo'}</button>
        
        <ul className="list-group-item">
        {this.state.todos.map((todo,i)=>{

          return (<Listitem
          key ={todo.id}
          todo ={todo}
          editTodo = {()=>{this.editTodo(i)}}
          deleteTodo= {()=>{this.deleteTodo(i)}}
          />)
          
        })} 

        </ul>
        </div>
      </div>
    );
  }
}

export default App;
