import React from 'react'
import {PieChart,
        Pie,
        Legend,
        Tooltip}
from 'recharts'

class Charts extends React.Component {
    render() {
        
        const apiData = this.props.apiData;
        
        
        
        
        
        return (
        <div id="charts">
                
            {apiData.map((pie) =>
                <div className="single-chart" key={pie.period}>
                <h2 className="period">{pie.period}</h2>            
                <PieChart width={170} height={180}>
                    <Pie data={pie.pieData} cx={85} cy={90} innerRadius={30} outerRadius={60} label  />
                    <Tooltip/>
                </PieChart>
                <span className="total">Total sent: {pie.total}</span>
                </div>             
            )}
            
                
                
        </div>        
            
        )
    }
}
  


export default Charts;