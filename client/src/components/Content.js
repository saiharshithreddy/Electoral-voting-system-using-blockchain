import React from 'react';
import Form from './Form';

class Content extends React.Component {
  
  render() {
    return (
      <div>
        <hr/>
          <Form 
            candidates={this.props.candidates} 
            castVote={this.props.castVote}
            candidateChange={this.props.candidateChange}
             />
        <p>Your account: {this.props.account}</p>
      </div>
    )
  }
}

export default Content