# frizzle
a simple nextbus api in javascript

## is this name dumb?
you guys get this is a magic schoolbus reference right? right?

## install

```sh
$ npm install frizzle
```

## import and basic instantiation
this is pretty primitive right now and would only really work in an es6 env, but it handles all the major functions for interfacing with nextbus

```js
import frizzle from 'frizzle'

/* create a new instance of frizzle with a specified agency. otherwise it defaults to sf-muni cause thats where I live */
let frizzle = new Frizzle({
  agency: 'sf-muni'
})
```

## methods and usage example

```js
/*
  assuming an instantiated class named 'frizzle' like you see above
*/

/* callback, what for to do something with the results from each api function */
let handleNextBusResponse = (result, error) => {
  console.log(result)
  // do other stuff!
}

/* get all the nextbus agencies */
frizzle.agencyList().done(handleNextBusResponse)

/* get all the routes for a given agency */
frizzle.routeList.done(handleNextBusResponse)

/*
  get all information about a route.
  optional param r: stands for the tag of the route if it
  wasn't part of the creation

  here we're getting information about the 'F-Market and Wharves'
  line in San Francisco
*/
frizzle.routeConfig({
  r: 'F'
}).done(handleNextBusResponse)

/*
  get predictions for a given spot
  (s: <string> of stop id)
  on a given route...
  (r: <string> of agency route) if you didn't already specify it

  here, we get all info for 'The Embarcadero & Bay' St station towards
  'Castro Station via Downtown' on the 'F-Market and Wharves' line
*/
frizzle.predictions({
  s: '4502',
  r: 'F'
}.done(handleNextBusResponse)

```

## kudos

- to [Nirav Sanghani](twitter.com/iamnirav) for derping around on this together and
collectively figuring out the nextbus API
- [Designer Fund](http://designerfund.com/) and my Bridge buddies for the amazing trip to Costanoa, where I ended up hacking on this

## project goals
its worth nothing I'm not necessarily looking to make a 'rock solid' library for Nextbus (the es6 usage probably gives that away) and am using this more as an exploratory project. the basic goals are...

- explore es6
- provide a decent javascript interface to the NextBus XML API in javascript
- explore API patterns
- create a simple API interface to use for React project examples

that being said, I'll try not to be a dick and push breaking changes
