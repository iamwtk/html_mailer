class Dashboard {

    constructor() {        
        this.period = '';
        this.total = 0;
        this.pieData = [
            {
                name: 'Unread',
                value: 0,
                fill: '#FF7043'
                },
            {
                name: 'Read',
                value: 0,
                fill: '#00796B'
                }
            ]

    }
}
export default Dashboard