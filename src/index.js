import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

let model = {
	running: false,
	time: 0
}

const view = (m) => {
  const minutes = Math.floor(m.time / 60);
  const seconds = m.time - (minutes * 60);
  const secondsFormatted = `${seconds < 10 ? '0' : ''}${seconds}`;  
  const onclickHandler = (event) => {
    model = update(model, m.running ? 'STOP' : 'START');
  };

  return <div>
        <p>{minutes}:{secondsFormatted}</p>
        <button onClick={onclickHandler}>{m.running ? 'Stop' : 'Start'}</button>
    </div>;
}

const update = (model, intent) => {
  const intents = {
    'START': (m) => Object.assign(m, {running: true}),
    'STOP' : (m) => Object.assign(m, {running: false}),
    'TICK' : (m) => Object.assign(m, {time: m.time + (m.running ? 1 : 0)})
  };

  return intents[intent](model);
}

const render = () => {
  ReactDOM.render(view(model),
    document.getElementById('root')
  );  
}

setInterval(() => {
  model = update(model, 'TICK');
  render();
}, 1000);

