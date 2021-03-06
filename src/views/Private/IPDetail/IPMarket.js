import React from 'react';
import Chart from './Chart';
import SellTrans from './SellTrans';
import BuyTrans from './BuyTrans';
import Trade from './Trade';
import { getData } from './ChartUtil';

const isMobile=(width)=> width <=500;

class IPMarket extends React.Component {
    state = {
        data: null,
        width: window.innerWidth
    };

    componentDidMount() {
		getData().then(data => {
			this.setState({ data })
        })
    }
    
    handleWindowSizeChange = () => {
        this.setState({width: window.innerWidth });
    }

    componentWillMount() {
        window.addEventListener('resize', this.handleWindowSizeChange)
    }

    componentWillUnmount(){
        window.removeEventListener('resize', this.handleWindowSizeChange );
    }

    render() {
        const { width } = this.state;
        const renderChartComponent=this.state.data == null?(
            <div>Loading...</div>
        ):(
            <div>
              <Chart type={'svg'} data={this.state.data} width={isMobile(width)?300:600} />
            </div>
        )

        return (
            <div className='container'>
                <div className='row'>
                    <div className={isMobile(width)?'col-sm-6':'col-sm-7'}>
                      {renderChartComponent}
                    </div>
                    <div className={isMobile(width)?'col-sm-6':'col-sm-5'}>
                        <SellTrans />
                    </div>
                </div>
                <div className='row'>
                    <div className={isMobile(width)?'col-sm-6':'col-sm-7'}>
                       <Trade />
                    </div>
                    <div className={isMobile(width)?'col-sm-6':'col-sm-5'}>
                       <BuyTrans />
                    </div>
                </div>
            </div>
        )
    }
}

export default IPMarket;