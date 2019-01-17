import React, {Component} from 'react';
import moment from 'moment';

const mothersDayForYear = (year) => {
  const firstOfMay = new Date(year, 4, 1);
  if (firstOfMay.getDay() === 0) {
    return moment(firstOfMay).add(7, 'day')
  }
  return moment(firstOfMay).add(14 - firstOfMay.getDay(), 'day');
}

const adminDayForYear = (year) => {
  const lastOfApril = new Date(year, 3, 30);
  if (lastOfApril.getDay() === 6) { // if the last day of april is saturday
    return moment(lastOfApril).subtract(3, 'day') // admin day is 3 days earlier
  }
  return moment(lastOfApril).subtract(4 + lastOfApril.getDay(), 'day')
}


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
    const { now } = this.state;
    const plauralize = (num, noun) => `${num} ${num === 1 ? noun : noun + 's'}`;

    const unitTilEndOfDayWithMod = unit => {
      const mod = unit === 'hour' ? Infinity : 60;
      return moment().endOf('day').diff(moment(), `${unit}s`) % mod > 0
        ? plauralize(moment().endOf('day').diff(moment(), `${unit}s`) % mod, unit)
        : '';
    }
    const counter = date => `${
      date.diff(now, 'days') > 0 ? plauralize(date.diff(now, 'days'), 'day') : ''
    } ${
      unitTilEndOfDayWithMod('hour')
    } ${
      unitTilEndOfDayWithMod('minute')
    } ${
      unitTilEndOfDayWithMod('second')
    }`;

    const nextAdminDay = adminDayForYear(moment().get('year')).isBefore(now)
      ? adminDayForYear(moment().get('year') + 1)
      : adminDayForYear(moment().get('year'));

    const nextMothersDay = mothersDayForYear(moment().get('year')).isBefore(now)
      ? mothersDayForYear(moment().get('year') + 1)
      : mothersDayForYear(moment().get('year'));

    const nextVday = moment('2-14', 'MM-DD');
    if (nextVday.isBefore(now)) nextVday.add(1, 'year');

    return (
      <div>
        <div className='chunk'>
          <div className='timeBlock' style={{ textAlign: 'left'}}>
            <p>{counter(nextVday)} until Valentine's Day {nextVday.get('years')}</p>
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
              src="russ.png"
              style={{
                transform: `rotate(${(now.get('seconds')/60) * 360 + 120}deg)`
              }}
            ></img>
          </div>
          <div className='timeBlock' style={{ textAlign: 'right'}}>
            <p>{counter(nextAdminDay)} until Administrative Professionals' Day {nextAdminDay.get('years')}</p>
          </div>
        </div>
        <div className='chunk'>
          <div className='timeBlock' style={{ textAlign: 'left'}}>
            <p>{counter(nextMothersDay)} until Mother's Day {nextMothersDay.get('years')}</p>
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
          <img src="stemslogo.png" /> This is the super official urbanstems flower holiday count-er down-er. <img src="stemslogo.png" /><br />
          <span style={{fontSize: '0.5em'}}>best viewed at 800px x 600px on Internet Exporer 5</span>
        </div>
      </div>
    )
  }
}
