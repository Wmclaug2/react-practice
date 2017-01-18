//imports react from react vendor file
import React from 'react';
//creates a new class for our app and extends the React.Component
class App extends React.Component {
  //constructor for our component
  constructor(){
    //required in all constructor functions to assign this to the current component
    super();
    //sets the state using an object that is passed key value pairs
    this.state = {
      txt:'This is the state text',
      text:'This is text',
      currentEvent:'---',
    }
    // sets up an updateEvent call for this component
    this.updateEvent= this.updateEvent.bind(this);
  }
  //function to update the state of our currentEvent in the component state
  updateEvent( e ) {
    this.setState({currentEvent: e.type});
  }
  //function to update the state of the txt value in the component state
  updateHeader( e ){
    this.setState({txt:e.target.value});
  }
  //function to update the state of the text value in the component state
  updateP ( e ) {
    this.setState({text:e.target.value});
  }
  //all components require a render function 
  render(){
    //returns JSX elements, all javascript must be between curly braces {}
    return (
      <div>
        <h1>{this.state.txt}</h1> 
        <Widget test='this is testing custom prop validation' 
                text='here is some text' 
                updateHeader={this.updateHeader.bind(this)}/>
        <Button><Heart/> React</Button>
        <p>{this.state.text}</p>
        <TextBox test='this is testing custom prop validation' 
                text='here is some text' 
                updateP={this.updateP.bind(this)}/>
        <Button><Heart/> React</Button>
        <br/><br/>
        <textarea onKeyPress={this.updateEvent} 
                  onCopy={this.updateEvent} 
                  onFocus={this.updateEvent} 
                  onBlur={this.updateEvent} 
                  onKeyDown={this.updateEvent} 
                  onPaste={this.updateEvent}
                  cols='30' 
                  rows='10'/>
        <h1>{this.state.currentEvent}</h1>
      </div>
    )
  }
}
//Heart component to pass through to custom Button component using props.children
class Heart extends React.Component {
  //required render function
  render(){
    return <span>&hearts;</span>
  }
}
//Button component that uses the child element (innerHTML) to pass through to the custom component
const Button = (props) => <button>{props.children}</button>;
//Widget component that uses the updateHeader prop to call the updateHeader function when changed
const Widget = (props) => <input type='text' onChange={props.updateHeader}/>
//TextBox component that uses the updateP prop to call the updateP function when changed
const TextBox = (props) => <input type='text' onChange={props.updateP}/>
//gives an error if Widget component does not have a text prop
Widget.propTypes = {
  text(props, propName, component) {
    if (!(propName in props)){
      return new Error(`${propName} is missing`);
    }
  },
  //gives an error if Widget does not have a test prop
  test(props, propName, component) {
    if (!(propName in props)) {
      return new Error(`${propName} is missing`);
    }
  }
}
//exports components for use in index.js
export default App;