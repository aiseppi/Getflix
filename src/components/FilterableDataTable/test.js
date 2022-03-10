import React from "react";

class StatefulParent extends React.Component {
  constructor(props) {
    super(props);
    // Set up initial state here
    // Bind handler functions here
  }

  handlerMethod(event) {
    // Update state here
    console.log("this is what I do!!");
  }

  render() {
    return (
      <div>
        <InputComponent onChange={handlerMethod} />
        <DisplayComponent valueToDisplay={this.state.valueToDisplay} />
      </div>
    );
  }
}
