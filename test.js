import Frizzle from './src/frizzle';

function handleResponse(data) {
  console.log( data ? 'pass :)' : 'fail!!!');
}

const f = new Frizzle();

f.agencies().done(handleResponse);

f.routes().done(handleResponse);

f.route('F').done(handleResponse);

f.predictions({ stop: 4502, route: 'F' }).done(handleResponse);
