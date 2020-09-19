import React from 'react';

class MyForm1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: 'The content of a textarea goes in the value attribute'
    };
  }
  render() {
    return (
      <form>
        <textarea value={this.state.description} />
      </form>
    );
  }
}

export default MyForm1;
