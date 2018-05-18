import React, { Component } from "react";
import axios from "axios";
import UserDetails from "./user_details";

class GitUser extends Component {
  constructor() {
    super();
    this.state = {
      users: "",
      currentUserList: "",
      pageCount: 1,
      pagesize: 3,
      enableNext: true,
      userDetail: ""
    };
    this.nextPage = this.nextPage.bind(this);
  }
  componentDidMount() {
    var vm = this;
    axios
      .get("https://api.github.com/users")
      .then(function(response) {
        console.log(response);
        vm.getfirstSet(response.data);
        // response.data.classname = "";
        response.data.map(obj => {
          return (obj.class_name = "false");
        });
        vm.setState(
          {
            users: response.data
          },
          () => {
            vm.showDetails(vm.state.users[0]);
          }
        );
      })
      .catch(function(error) {
        console.log(error);
        this.setState({
          enableNext: false
        });
      });
  }
  getfirstSet(result) {
    var getUsers = [];
    var pagecount = this.state.pageCount;
    for (let i = 0; i < this.state.pagesize; i++) {
      getUsers.push(result[i]);
    }
    this.setState({
      currentUserList: getUsers,
      pageCount: pagecount + 1
    });
  }
  getUsers = () => {
    if (this.state.currentUserList.length === 0) {
      return <div>no result found</div>;
    }
    return this.state.currentUserList.map((user, index) => {
      return (
        <div
          className={"userGrid text-center " + user.class_name}
          onClick={this.showDetails.bind(this, user)}
          key={user.id}
        >
          <img className="img-responsive" src={user.avatar_url} />
          <p>{user.login}</p>
        </div>
      );
    });
  };
  nextPage = () => {
    var nextuser = [];
    var pagecount = this.state.pageCount;
    var pagesize = this.state.pagesize;
    for (
      let i = pagesize * pagecount - pagesize;
      i < pagesize * pagecount;
      i++
    ) {
      if (this.state.users[i]) {
        nextuser.push(this.state.users[i]);
      } else {
        this.setState({
          enableNext: false
        });
      }
    }
    console.log(pagesize * pagecount - pagesize, pagesize * pagecount);
    this.setState({
      pageCount: pagecount + 1,
      currentUserList: nextuser
    });
  };
  showDetails = dd => {
    //console.log(dd);
    var user = dd;
    var getId = dd.id;
    //console.log(getId);
    this.state.users.map(user => {
      if (user.id === getId) {
        user.class_name = "active";
      } else {
        user.class_name = "";
      }
      return user;
    });
    var vm = this;
    vm.setState({
      userDetail: user
    });
  };
  showPage = () => {
    if (this.state.enableNext) {
      return (
        <div className="pageCount" onClick={this.nextPage}>
          show next page
        </div>
      );
    } else {
      return <div className="pageCount">no result available</div>;
    }
  };
  render() {
    return (
      <div className="gitUsers">
        <div className="userLeft">{this.getUsers()}</div>
        <div className="userRight">
          <UserDetails user={this.state.userDetail} />
        </div>
        {this.showPage()}
      </div>
    );
  }
}

export default GitUser;
