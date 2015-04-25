'use strict';

import request from 'superagent';
import when from 'when';
import xml2js from 'xml2js';

const ENDPOINT = 'http://webservices.nextbus.com/service/publicXMLFeed';

class Frizzle {
    constructor(agency = 'sf-muni') {
        this.agency = agency;
    }

    agencyList(params) {
      return this.request('agencyList', params);
    }

    routeList(params) {
      return this.request('routeList', params);
    }

    routeConfig(params) {
      return this.request('routeConfig', params);
    }

    predictions(params) {
      return this.request('predictions', params);
    }

    request(command, params = {}) {
        return when.promise((resolve, reject) => {
            request
                .get(ENDPOINT)
                .set('Content-type', 'text/plain')
                .query(Object.assign({ command, a: this.agency }, params))
                .end((error, result) => {
                    if (error) {
                        reject(new Error(error));
                    } else {
                        const parser = new xml2js.Parser();
                        parser.parseString(result.text, (error, result) => {
                            if (error) {
                                reject(new Error(error));
                            } else {
                                resolve(result);
                            }
                        });
                    }
                });
        });
    }
}

export default Frizzle;
