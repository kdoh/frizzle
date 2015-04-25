import Frizzle from './src/frizzle';

function handleResponse(data) {
  console.log( data ? 'pass :)' : 'fail!!!');
}

const f = new Frizzle();

f.agencies().then(handleResponse);

f.routes().then(handleResponse);

f.route('F').then(handleResponse);

f.predictions({ stop: 4502, route: 'F' }).then(handleResponse);
