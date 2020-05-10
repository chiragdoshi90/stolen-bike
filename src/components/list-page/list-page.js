import React, { Component } from 'react';
import { Button, Form, FormGroup, Container, Row, Col, Input } from 'reactstrap';
import DatePicker from "react-datepicker";
import { IncidentService } from '../../services/incidentService';
import Incident from '../incident/incident';
import '../../App.css';
import { Loader } from '../common/spinner';
import { Toastr } from '../common/toastr';
import { toast } from 'react-toastify';
import Pagination from "react-js-pagination";
// require("bootstrap/less/bootstrap.less");

class ListPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      serachData: '',
      fromDate: '',
      toDate: '',
      incidents: [],
      currentPage: 1,
      showLoader: false,
      incidenPerPage: 10,
      submitted: false
    }

    this.incidentService = new IncidentService();
  }

  getTimeStamp(date) {
    if (date) {
      return (new Date(date).getTime() / 1000);
    }
    return ''
  }

  addOneDay(date) {
    if (date) {
      return (date + (60 * 60 * 24));
    }
    return ''
  }

  isDateValid() {
    if (this.state.fromDate && this.state.toDate && this.getTimeStamp(this.state.fromDate) > this.getTimeStamp(this.state.toDate)) {
      return false;
    }
    return true;
  }

  submitForm() {
    if (this.isDateValid()) {
      this.setState({ showLoader: true, incidents: [], submitted: false })
      this.getIncidentList();
    } else {
      toast.error("Start date should be less than end date");
    }
  }

  getIncidentList() {
    this.incidentService.getIncident(this.getParams()).then(res => {
      this.setState({ incidents: res.data.incidents, showLoader: false, submitted: true });
    })
  }


  getParams() {
    return {
      query: this.state.serachData,
      per_page: 100,
      occurred_after: this.getTimeStamp(this.state.fromDate),
      occurred_before: this.addOneDay(this.getTimeStamp(this.state.toDate))
    }
  }

  updateState = (index) => {
    this.setState({
      currentPage: index
    });
  }

  showDetails(id) {
    window.location.assign('/case/' + id);
  }

  isValid(index) {
    const { incidenPerPage } = this.state;
    const pageCheck = ((this.state.currentPage) * incidenPerPage);
    return (index < pageCheck && index >= (pageCheck - incidenPerPage))
  }


  pageSizeDropdown() {
    return (
      <select value={this.state.incidenPerPage}
        disabled={this.state.showLoader}
        onChange={e => this.setState({ incidenPerPage: e.target.value })} >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
    )
  }

  showIncidents() {
    if (this.state.incidents.length > 0) {
      let incidentsList = this.state.incidents.map((incidentData, index) => {
        if (this.isValid(index)) {
          return (
            <div onClick={() => this.showDetails(incidentData.id)}>
              <Incident key={index} incidentData={incidentData} />
            </div>
          )
        } else {
          return '';
        }
      })
      return incidentsList;
    } else if (this.state.submitted) {
      return (
        <div>
          No Data Found
        </div>
      )
    }
  }

  getPagination() {
    if (this.state.incidents.length > 0) {
      const pagnation = (
        <Pagination
          activePage={this.state.currentPage}
          itemsCountPerPage={this.state.incidenPerPage}
          totalItemsCount={this.state.incidents.length}
          pageRangeDisplayed={5}
          itemClass="page-item"
          linkClass="page-link"
          onChange={this.updateState}
        />
      );
      return pagnation;
    }
  }

  render() {
    return (
      <div className="list-page">
        {this.state.showLoader ? <Loader /> : ''}
        <div>
          <Toastr />
          <Container>
            <Form>
              <FormGroup>
                <Row>
                  <Col xs="4">
                    <Input type="text" name="serach" id="searchDesc" placeholder="Search"
                      value={this.state.serachData}
                      disabled={this.state.showLoader}
                      onChange={e => this.setState({ serachData: e.target.value })} />
                  </Col>
                  <Col xs="3">
                    <DatePicker placeholderText={'Select Start date'}
                      selected={this.state.fromDate}
                      maxDate={new Date()}
                      disabled={this.state.showLoader}
                      onChange={date => this.setState({ fromDate: date })}
                    />
                  </Col>
                  <Col xs="3">
                    <DatePicker placeholderText={'Select End date'}
                      selected={this.state.toDate}
                      maxDate={new Date()}
                      disabled={this.state.showLoader}
                      onChange={date => this.setState({ toDate: date })}
                    />
                  </Col>
                  <Col xs="2">
                    <Button color="primary" disabled={this.state.showLoader} onClick={() => this.submitForm()}>Find Cases</Button>
                  </Col>
                </Row>
              </FormGroup>

            </Form>
            <div className="total-count">
              <div className="page-dropdown">{this.pageSizeDropdown()}</div>
              {this.state.incidents.length > 0 ? 'Total: ' + this.state.incidents.length : ''}
            </div>
            <div className="incidents">
              {this.showIncidents()}
            </div>
            <div className="pagination">
              {this.getPagination()}
            </div>
          </Container>
        </div>
      </div>
    )

  }
}

export default ListPage;