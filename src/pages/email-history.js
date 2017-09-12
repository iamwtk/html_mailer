import React from 'react'
import axios from 'axios'
import EmailList from '../components/email-history/email-list'



class EmailHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {apiData: []};
    }
    componentDidMount() {
        axios.get('/api/email')
        .then((result)=> {        
          const thisData = result.data;
          this.setState({
            apiData: thisData
          }); 
        })        
    }
   
    
    render() {
        const apiData = this.state.apiData;
        
        if (Object.keys(apiData).length > 0 && apiData.constructor === Array) {
            return(
                <EmailList list={ apiData }/>
            )
        } else {
            return (
                <p>Nothing found!</p>
            )
            
        }
        
       
    }
}


export default EmailHistory;
