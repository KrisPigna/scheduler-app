import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Table, Icon } from 'antd';
import "./Day.css";

class Day extends Component {
  render() {
    const columns = [{
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a href="javascript:;">{text}</a>,
      }, {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
      }]

    return (
      <div>
        <Link className="back" to="/"><Icon type="left" />Back to Calendar</Link>
        <Table columns={columns} />
        <Link className="back" to="/"><Icon type="left" />Back to Calendar</Link>
      </div>
    )
  }
}

const mapStateToProps = state => ({
    appointments: state.appointments.appointments,
    response: state.appointments.response
});

export default connect(mapStateToProps, { })(Day);
