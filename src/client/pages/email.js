import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import axios from 'axios'

const Email = ({ match }) => (
  <div>   

    <Route path={`${match.url}/new`} component={NewEmail}/>
    <Route path={`${match.url}/history`} component={EmailHistory}/>
    <Route exact path={match.url} render={() => (
      <h3>Choose what you want to do.</h3>
    )}/>
  </div>
)



const NewEmail = () => (
    <h1>new email component</h1> 
)



const EmailHistory = () => (
    <div>
    
    <GetEmailHistory/>    
        </div>
)

class GetEmailHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {apiData: {}};
  }
    
  componentDidMount() {
    axios.get('http://localhost:3000/email')
    .then((result)=> {        
      const thisData = result.data;
      this.setState({
        apiData: result.data
      });
    })
  }

  componentWillUnmount() {    
    this.serverRequest.abort();
  }

  render() {

    const apiEmailHistory = this.state.apiData;  
    
    if (Object.keys(apiEmailHistory).length > 0 && apiEmailHistory.constructor === Array ){ 
      return (        
            <ul className="email-list">
              {apiEmailHistory.map((email) => 
                <li className="single-email">
                    <span className="to">{email.to}</span>
                    <span className="from">{email.from}</span>
                    <span className="message">{email.html}</span>
                </li>
              )}
            </ul>
         
      );
    } else {
      return (
        <div className="App">Nothing Found!</div>
      )
    }

  }
}









export default Email;
