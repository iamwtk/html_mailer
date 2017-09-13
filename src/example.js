import path from 'path'
import mongoose from 'mongoose'
import Email from '../models/email'
import Dashboard from '../models/dashboard'

export function getStatistics(req, res) {
    let emailTotal = [];
    const now = new Date(),
          week = new Date(now.valueOf() - ( 1000 * 60 * 60 * 24 * 7 )),
          month = new Date(now.valueOf() - ( 1000 * 60 * 60 * 24 * 30 )),
          month_3 = new Date(now.valueOf() - ( 1000 * 60 * 60 * 24 * 90 ));
          
    Email.find({owner: req.user._id}, (err, emails) => {
        emailTotal = emails;        
        let last7 = new Dashboard(),
            last30 = new Dashboard(),
            last90 = new Dashboard(),
            overall = new Dashboard();
        
        last7.period = 'Last 7 days';
        last30.period = 'Last 30 days';
        last90.period = 'Last 90 days';  
        overall.period = 'Overall';  
        
        emailTotal.map(email => {
            if (email.date < now && email.date > week) {
                
                ++last7.total;                
                if (!email.read) {
                    ++last7.pieData[0].value; //unread
                } else {
                    ++last7.pieData[1].value;
                } 
                
            } else if (email.date < now && email.date > month) {
                
                last30.total +=1;                
                if (!email.read) {
                    ++last30.pieData[0].value; //unread
                } else {
                    ++last30.pieData[1].value;
                }
                
            } else if (email.date < now && email.date > month_3) {
                last90.total +=1;                
                if (!email.read) {
                    ++last90.pieData[0].value; //unread
                } else {
                    ++last90.pieData[1].value;
                }
            } else {
                overall.total +=1; 
                if (!email.read) {
                    ++overall.pieData[0].value; //unread
                } else {
                    ++overall.pieData[1].value;
                }
            }
        });
        
        //total
        last30.total += last7.total;
        last90.total += last30.total; 
        overall.total += last90.total; 
        //total unread
        last30.pieData[0].value += last7.pieData[0].value; 
        last90.pieData[0].value += last30.pieData[0].value; 
        overall.pieData[0].value += last90.pieData[0].value;
        //total read
        last30.pieData[1].value += last7.pieData[1].value; 
        last90.pieData[1].value += last30.pieData[1].value; 
        overall.pieData[1].value += last90.pieData[1].value;
        
        const apiRes = [
            last7,
            last30,
            last90,
            overall
        ]
        
        return res.status(200).json(apiRes);
    });
    
    
    
    
    
        
    
}

