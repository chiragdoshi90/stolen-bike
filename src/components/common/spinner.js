import React, { Component } from 'react';
import { Spinner } from 'reactstrap';
export class Loader extends Component {

  render() {
    return (
      <Spinner style={{ width: '3rem', height: '3rem', position: 'absolute',  top: '50%', left: '50%' }} />
    )
  }
}
