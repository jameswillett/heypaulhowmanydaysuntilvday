import React, {Component} from 'react';
import moment from 'moment';
import mothersDay from 'mothers-day'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      now: moment(),
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => this.setState({ now: moment() }), 250);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const plauralize = (num, noun) => `${num} ${num === 1 ? noun : noun + 's'}`;
    const adminDays = [
      moment('2018-04-25'),
      moment('2019-04-24'),
      moment('2020-04-22'),
    ];

    const { now } = this.state;
    const nextAdminDay = adminDays.find(x => now.isBefore(x));
    const nextMothersDay = moment(mothersDay(moment().get('year')));
    const nextVday = moment('2-14', 'MM-DD');

    if (nextVday.isBefore(now)) nextVday.add(1, 'year');
    if (nextMothersDay.isBefore(now)) nextMothersDay.add(1, 'year');

    return (
      <div>
        <div className='chunk'>
          <div className='timeBlock' style={{ textAlign: 'left'}}>
            <p>{plauralize(nextVday.diff(now, 'days') + 1, 'day')} until Valentine's Day {nextVday.get('years')}</p>
          </div>
          <div className='paulFace'>
            <img
              src="paulface.png"
              style={{
                transform: `rotate(${(now.get('seconds')/60) * 360}deg)`
              }}
            ></img>
          </div>
        </div>
        <div className='chunk'>
          <div className='paulFace'>
            <img
              src="paulface.png"
              style={{
                transform: `rotate(${(now.get('seconds')/60) * 360 + 120}deg)`
              }}
            ></img>
          </div>
          <div className='timeBlock' style={{ textAlign: 'right'}}>
            <p>{plauralize(nextAdminDay.diff(now, 'days') + 1, 'day')} until Administrative Professionals' Day {nextAdminDay.get('years')}</p>
          </div>
        </div>
        <div className='chunk'>
          <div className='timeBlock' style={{ textAlign: 'left'}}>
            <p>{plauralize(nextMothersDay.diff(now, 'days') + 1, 'day')} until Mother's Day {nextMothersDay.get('years')}</p>
          </div>
          <div className='paulFace'>
            <img
              src="paulface.png"
              style={{
                transform: `rotate(${(now.get('seconds')/60) * 360 + 240}deg)`
              }}
            ></img>
          </div>
        </div>
        <div className='footer'>
          <img src="stemslogo.png" /> This is the super official urbanstems flower holiday count-er down-er. <img src="stemslogo.png" />
        </div>
      </div>
    )
  }
}
