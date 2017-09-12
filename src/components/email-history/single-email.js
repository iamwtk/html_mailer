import React from 'react'


const SingleEmail = (props) => (    
      
    <li className="single-email">
        <span className="to">{props.to}</span>
        <span className="from">{props.from}</span>
        <span className="message">{props.html}</span>
        <span className="status">{props.status}</span>
    </li>   
)

export default SingleEmail