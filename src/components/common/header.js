import React, { Component } from 'react';
import { Container, Row, Col, Media } from 'reactstrap';
import '../../App.css';
import logo from '../../police-logo.jpg'

class Header extends Component {
  render() {
    return (
      <div className="header">
        <Container>
          <Row>
            <Col xs="2">
            <Media className="bike-img" object src={logo}
              alt="Picture Not Available" />
            </Col>
            <Col xs="10">
              <div className="header-title">Police Department of Berlin</div>
              <div className="header-sub-title">Stolen Bikes</div>
            </Col>
          </Row>
        </Container>
      </div>
    )

  }
}

export default Header;