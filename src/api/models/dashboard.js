class Dashboard {

    constructor() {        
        this.period = '';
        this.total = 0;
        this.pieData = [
            {
                name: 'Unread',
                value: 0,
                fill: '#f44336'
                },
            {
                name: 'Read',
                value: 0,
                fill: '#388E3C'
                }
            ]

    }
}
export default Dashboard