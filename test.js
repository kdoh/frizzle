import Frizzle from './src/frizzle';

function handleResponse(data) {
  console.log( data ? 'pass :)' : 'fail!!!');
}

const f = new Frizzle();

f.predictions({ s: 4502, r: 'F' }).done(handleResponse);

f.agencyList().done(handleResponse);

f.routeList().done(handleResponse);

f.routeConfig({ r: 'F' }).done(handleResponse);
