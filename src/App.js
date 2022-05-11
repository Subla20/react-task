import './App.css';
import React from 'react';
import relax from './relax.svg';
import trash from './trash.svg';

var classNames = require('classnames');

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: '', 
      tasks: [],
      toggle: true,
      check: null
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
      this.setState({check: false});
    };

    const handleLater = (id) => {
      this.setState({check: true});
      setTimeout(() => remove(id), 4000);
    }; 

    var checkClass = classNames({
      checkLabel : true,
      crossedline: this.state.check
    });

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
                <input type="checkbox" id="checkID" value={this.state.toggle} onChange={(e) => this.setState({ toggle: e.target.checked})} onClick={() => handleLater(subItems)} className='check' />
                <label htmlFor="checkID" className={checkClass}>{subItems}</label>
                <img src={trash} className='imageT' alt="Trash Can" onClick={() => remove(subItems)} />
              </li>
          })}
        </ul>
      </div>
    );
  }
}

export default App;
