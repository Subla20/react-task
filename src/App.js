import './App.css';
import React from 'react';
import relax from './relax.svg';
import trash from './trash.svg';

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: '', 
      tasks: [],
      toggle: true
    };

    this.valueRef = React.createRef();
  };

  render () {
    
    const handleNewTask = (e) => {
      e.preventDefault();
      this.state.tasks.push(this.state.value);
      this.setState({ value: ''});
      this.valueRef.current.focus();
    };

    const handleChange = (e) => {
      this.setState({value: e.target.value});
    };

    const remove = (id) => {
      const newA = this.state.tasks.filter(task => task !== id);
      this.setState({tasks: newA});
    };

    const handleLater = (id, e) => {
      e.target.classList.toggle("crossed-line");
      setTimeout(() => remove(id), 4000);
    }; 

    const canSubmit = this.state.value.length === 0;
    const taskExists = this.state.tasks.length === 0;

    return (
      <div className="App">
        <header className="AppHeader">       
          <p>
            Task List
          </p>
        </header>
        <form onSubmit={handleNewTask}>
          <input type='text' 
          value={this.state.value} 
          ref={this.valueRef}
          onChange={handleChange} 
          className= "taskBox" 
          />
          <button type='submit' disabled={canSubmit} onClick={handleNewTask} className='create'>Create</button>
        </form>
        {canSubmit && taskExists && (
        <div>
          <img src={relax} className='imageR' alt='relaxing with no tasks'/>
          <p className='imageText'>No Tasks yet!</p>
        </div>
        )}
        <ul className='list'>
          {this.state.tasks.map((subItems) => {
            return <li key={subItems.id} className='listItem'>
                <input type="checkbox" id="checkID" value={this.state.toggle} onChange={(e) => this.setState({ toggle: e.target.checked})} onClick={(e) => handleLater(subItems, e)} className='check' />
                <label htmlFor="checkID" className='checkLabel'>{subItems}</label>
                <img src={trash} className='imageT' alt="Trash Can" onClick={() => remove(subItems)} />
              </li>
          })}
        </ul>
      </div>
    );
  }
}

export default App;
