import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import '../../assets/css/menu.scss';

function Home() {
    return <h2>Home</h2>;
}
function About() {
    return <h2>About</h2>;
}
function Users() {
    return <h2>Users</h2>;
}

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        count: 0
    };
  }

  btnLeft = () => {
    // event.preventDefault();
    this.setState({ count: this.state.count - 1 })
    this.refs.work.scrollIntoView();
    console.log(this.state.count);
  }
  btnRight = () => {
    // event.preventDefault();
    this.setState({ count: this.state.count + 1 })
    this.refs.home.scrollIntoView();
    console.log(this.state.count);
  }

  render () {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                        <Link to="/">Home</Link>
                        </li>
                        <li>
                        <Link to="/about">About</Link>
                        </li>
                        <li>
                        <Link to="/users">Users</Link>
                        </li>
                    </ul>
                </nav>
                {/* A <Switch> looks through its children <Route>s and
                    renders the first one that matches the current URL. */}
                <Switch>
                    <Route path="/about">
                        <About />
                    </Route>
                    <Route path="/users">
                        <Users />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
  }
}