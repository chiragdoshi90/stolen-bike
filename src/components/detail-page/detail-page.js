import React, { Component } from 'react';
import { Media, Container } from 'reactstrap';
import '../../App.css';

import Time from 'react-time-format'
import { IncidentService } from '../../services/incidentService';

class IncidentDetail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      incident: {}
    }

    this.incidentService = new IncidentService();
  }

  componentDidMount() {
    this.getIncidentDetail(this.getIdByURL())
  }

  getIdByURL() {
    return this.props.location.pathname.split('/')[2]
  }

  getIncidentDetail(id) {
    this.incidentService.getIncidentDetail(id)
      .then(res => {
        this.setState({ incident: res.data.incident });
      })
  }

  render() {
    const date = this.state.incident?.occurred_at
    return (
      <div >
        <Container>
          <div className="detail-title">{this.state.incident.title}</div>
          <div className="incident-address">
            <span className="bold"> Stolen On:  </span>
            <span>
              <Time value={new Date(date) * 1000} format="DD/MM/YYYY" />
            </span>
            <div><span className="bold"> Stolen from:  </span>{this.state.incident?.address}</div>
          </div>
          <div>
            <Media className="detail-bike-img" object src={this.state.incident?.media?.image_url}
              alt="Picture Not Available" />
          </div>
          <div>
            <label className="detail-title">Description of Incident:</label>
            <div>{this.state.incident?.description}</div>
          </div>
        </Container>
      </div>
    )

  }
}

export default IncidentDetail;