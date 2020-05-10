import React, { Component } from 'react';
import { Container, Row, Col, Media } from 'reactstrap';
import '../../App.css';
import Time from 'react-time-format'

class Incident extends Component {
  render() {
    return (
      <div className="incident-box">
        <Container>
          <Row>
            <Col xs="2">
              <Media className="bike-img" object src={this.props.incidentData.media.image_url_thumb}
                alt="Picture Not Available" />
            </Col>
            <Col xs="10">
              <div className="incident-title">{this.props.incidentData.title}</div>
              <div>{this.props.incidentData.description}</div>
              <div className="incident-address">
                <span className="bold"> Stolen On:  </span> 
                <span>
                  <Time value={new Date(this.props.incidentData.occurred_at) * 1000} format="DD/MM/YYYY" />
                </span>
                <div><span className="bold"> Stolen from:  </span>{this.props.incidentData.address}</div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )

  }
}

export default Incident;