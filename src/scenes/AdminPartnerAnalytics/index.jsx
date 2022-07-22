import React from 'react';
import { NotificationManager } from 'react-notifications';
import { isEmpty } from 'lodash';
import moment from 'moment';
import { connect } from 'react-redux';
import shortid from 'shortid';
import { getPartnerSummary, getPartnerProductSummary } from '../../services/admin/actions';
import Loading from '../../components/Loading';

let today = moment();
today = today.format('YYYY-MM-DD');

// For predefined dates - Start date for the last seven days
let lastSevenDays = moment();
lastSevenDays = lastSevenDays.subtract(7, 'days');
lastSevenDays = lastSevenDays.format('YYYY-MM-DD');

// For predefined dates - Start date of this month
let startOfThisMonth = moment();
startOfThisMonth = startOfThisMonth.startOf('month');
startOfThisMonth = startOfThisMonth.format('YYYY-MM-DD');

// For predined dates - Start date of last month
let startOfLastMonth = moment();
startOfLastMonth = startOfLastMonth.startOf('month');
startOfLastMonth = startOfLastMonth.subtract(1, 'months');
startOfLastMonth = startOfLastMonth.format('YYYY-MM-DD');

// For predefined dates - End date of last month
let endOfLastMonth = moment();
endOfLastMonth = endOfLastMonth.subtract(1, 'months');
endOfLastMonth = endOfLastMonth.endOf('month');
endOfLastMonth = endOfLastMonth.format('YYYY-MM-DD');

// For predefined dates - Start date of last 2 months
let startOfLastTwoMonths = moment();
startOfLastTwoMonths = startOfLastTwoMonths.startOf('month');
startOfLastTwoMonths = startOfLastTwoMonths.subtract(2, 'months');
startOfLastTwoMonths = startOfLastTwoMonths.format('YYYY-MM-DD');

// For predefined dates - End date of last 2 months
let endOfLastTwoMonths = moment();
endOfLastTwoMonths = endOfLastTwoMonths.subtract(2, 'months');
endOfLastTwoMonths = endOfLastTwoMonths.endOf('month');
endOfLastTwoMonths = endOfLastTwoMonths.format('YYYY-MM-DD');

const currentDate = new Date();

const dates = {
  year: currentDate.getFullYear(),
  thisMonth: currentDate.getMonth(),
  lastMonth: (currentDate.getMonth() - 1),
  beforeLastMonth: (currentDate.getMonth() - 2),
};

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];


class AdminPartnerAnalytics extends React.Component {
  state = {
    fromDate: '',
    toDate: '',
  }

  componentWillMount() {
    if (this.props.session.user.acl < 100) {
      NotificationManager.error('Invalid Permission Rights');
      this.context.router.history.push('/');
    }
  }

  componentDidMount() {
    if (this.props.session.user.partner_site_id !== 0) {
      this.props.getPartnerSummary();
      this.props.getPartnerProductSummary();
    }
  }

  onDateChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onDatesApply = (e) => {
    e.preventDefault();
    if (isEmpty(this.state.fromDate) || isEmpty(this.state.toDate)) {
      NotificationManager.error('Please enter a date range');
    } else {
      this.props.getPartnerProductSummary(this.state.fromDate, this.state.toDate);
    }
  }

  onDatesSelected = (e) => {
    e.preventDefault();
    if (e.target.name === 'sevenDays') {
      this.props.getPartnerProductSummary(lastSevenDays, today);
    } else if (e.target.name === 'thisMonth') {
      this.props.getPartnerProductSummary(startOfThisMonth, today);
    } else if (e.target.name === 'lastMonth') {
      this.props.getPartnerProductSummary(startOfLastMonth, endOfLastMonth);
    } else if (e.target.name === 'beforeLastMonth') {
      this.props.getPartnerProductSummary(startOfLastTwoMonths, endOfLastTwoMonths);
    }
    this.setState({
      fromDate: '',
      toDate: '',
    });
  }

  render() {
    const {
      isLoading,
      trackingSummary,
      productTracking,
    } = this.props.admin;

    return (
      <div className="container">
        <div style={{ height: 220 }} />
        {isLoading ? (
          <Loading style={{ marginTop: 50 }} />
        ) : (
          <div className="row">
            <div className="col-md-12">
              <h3 className="text-center">
                Traffic to your website
              </h3>
              <br />
            </div>
            <div className="col-6" style={{ margin: '0 auto' }}>
              <table className="table table-striped table-dark">
                <thead>
                  <tr>
                    <th scope="col" style={{ width: '50%' }}>Time Interval</th>
                    <th scope="col" style={{ width: '10%' }}>No. of Clicks</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Today:</td>
                    <td>{trackingSummary.today_clicks}</td>
                  </tr>
                  <tr>
                    <td>Last 7 days:</td>
                    <td>{trackingSummary.last_seven_days_clicks}</td>
                  </tr>
                  <tr>
                    <td>{months[dates.thisMonth]}:</td>
                    <td>{trackingSummary.this_month_clicks}</td>
                  </tr>
                  <tr>
                    <td>{months[dates.lastMonth]}:</td>
                    <td>{trackingSummary.last_month_clicks}</td>
                  </tr>
                  <tr>
                    <td>{months[dates.beforeLastMonth]}:</td>
                    <td>{trackingSummary.before_last_month_clicks}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="row">
              <div className="col-12" style={{ margin: '5% auto' }}>
                <div className="row" style={{ marginBottom: 10 }}>
                  <div className="col-6" style={{ padding: 0 }}>
                    From:
                    <input
                      name="fromDate"
                      type="date"
                      onChange={this.onDateChange}
                      value={this.state.fromDate}
                      style={{ height: 29, width: 160, display: 'inline-block' }}
                      className="form-control"
                    />&nbsp;
                    To:
                    <input
                      name="toDate"
                      type="date"
                      onChange={this.onDateChange}
                      value={this.state.toDate}
                      style={{
                        height: 29, width: 160, display: 'inline-block', marginRight: 5,
                      }}
                      className="form-control"
                    />
                    <button className="btn btn-sm btn-primary" onClick={this.onDatesApply}>
                    Apply
                    </button>
                  </div>
                  <div className="col-6" style={{ textAlign: 'right', padding: 0 }}>
                    <button name="sevenDays" className="btn btn-sm btn-primary" onClick={this.onDatesSelected}>
                      Last 7 days
                    </button>&nbsp;
                    <button name="thisMonth" className="btn btn-sm btn-primary" onClick={this.onDatesSelected}>
                      {months[dates.thisMonth]}
                    </button>&nbsp;
                    <button name="lastMonth" className="btn btn-sm btn-primary" onClick={this.onDatesSelected}>
                      {months[dates.lastMonth]}
                    </button>&nbsp;
                    <button name="beforeLastMonth" className="btn btn-sm btn-primary" onClick={this.onDatesSelected}>
                      {months[dates.beforeLastMonth]}
                    </button>
                  </div>
                </div>
                <table className="table table-striped table-dark">
                  <thead>
                    <tr>
                      <th scope="col" style={{ width: '50%' }}>Link</th>
                      <th scope="col" style={{ width: '10%' }}>No. of Clicks</th>
                    </tr>
                  </thead>
                  {!isEmpty(productTracking) ? (
                    <tbody>
                      {productTracking.map(product => (
                        <tr key={shortid.generate()}>
                          <td><a href={product.link} target="_blank">{product.link}</a></td>
                          <td>{product.clicks}</td>
                        </tr>
                  ))}
                    </tbody>
                    ) : (
                      <tbody>
                        <tr>
                          <td>No Results Found</td>
                          <td />
                        </tr>
                      </tbody>
                    )}
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  admin: state.admin,
  session: state.Session,
});

const mapDispachToProps = {
  getPartnerSummary,
  getPartnerProductSummary,
};

export default connect(mapStateToProps, mapDispachToProps)(AdminPartnerAnalytics);
