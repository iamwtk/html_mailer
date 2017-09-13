import React from 'react'
import axios from 'axios'

import Charts from '../components/dashboard/charts'

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {apiData: {}};
    }
    componentDidMount() {
        axios.get('/api/dashboard')
        .then((result)=> {        
          const thisData = result.data;          
          this.setState({
            apiData: result.data
          });  
        })        
    }
   
    
    render() {
        const apiData = this.state.apiData;        
        console.log(Object.keys(apiData).length, apiData.constructor);
        if (Object.keys(apiData).length > 0 && apiData.constructor === Array && apiData[3].total > 0) {
            return(
                <div>
                    <h1>Statistics</h1>
                    <Charts apiData={ apiData } />
                </div>
            )
        } else {
            return (
                <div>
                    <h1>Statistics</h1>
                    <p>Nothing found, how about sending an email?</p>
                </div>
            )
        } 
    }
}
  


export default Dashboard;



