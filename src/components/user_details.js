import React, { Component } from "react";
import axios from "axios";

class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    };
  }
  componentDidMount() {
    this.getRepos();
  }
  componentDidUpdate() {
    this.getRepos();
  }
  getRepos() {
    var vm = this;
    console.log(vm.props.login);
    axios
      .get("https://api.github.com/users/" + vm.props.login + "/repos")
      .then(function(result) {
        console.log(result.data);
        //result.data.login = user.login;
        // vm.setState({
        //     repos:result.data
        // })
      });
  }
  render() {
    if (this.props.user.length === 0) {
      return <div>no user to display</div>;
    }
    return (
      <div>
        <img src={this.props.user.avatar_url} alt="" />
      </div>
    );
  }
}

export default UserDetails;
