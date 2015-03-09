import request from 'superagent'
import when from 'when'
import extend from 'extend'
import xml2js from 'xml2js'

class Frizzle {
    constructor (options) {
        this.endpoint = 'http://webservices.nextbus.com/service/publicXMLFeed'
        this.agency = options.agency || 'sf-muni'
        this.commands = ['agencyList', 'routeList', 'routeConfig', 'predictions']
        this.commands.map(command =>
            this[command] = function (params) {
                let requestParams = params || {}
                return this.request(extend(requestParams, { command: command, a: this.agency }))
            }
        )
    }

    request (params) {
        return when.promise((resolve, reject) => {
            request
                .get(this.endpoint)
                .set('Content-type', 'text/plain')
                .query(params)
                .end((error, result) => {
                    if(error) {
                        reject(new Error(error))
                    } else {
                        let parser = new xml2js.Parser()
                        parser.parseString(result.text, (error, result) => {
                            if(error) {
                                reject(new Error(error))
                            } else {
                                resolve(result)
                            }
                        })
                    }
                })
        })
    }
}

export default Frizzle
