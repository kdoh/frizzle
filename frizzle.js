"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var request = _interopRequire(require("superagent"));

var when = _interopRequire(require("when"));

var xml2js = _interopRequire(require("xml2js"));

var ENDPOINT = "http://webservices.nextbus.com/service/publicXMLFeed";

var Frizzle = (function () {
    function Frizzle() {
        var agency = arguments[0] === undefined ? "sf-muni" : arguments[0];

        _classCallCheck(this, Frizzle);

        this.agency = agency;
    }

    _createClass(Frizzle, {
        agencyList: {
            value: function agencyList(params) {
                return this.request("agencyList", params);
            }
        },
        routeList: {
            value: function routeList(params) {
                return this.request("routeList", params);
            }
        },
        routeConfig: {
            value: function routeConfig(params) {
                return this.request("routeConfig", params);
            }
        },
        predictions: {
            value: function predictions(params) {
                return this.request("predictions", params);
            }
        },
        request: {
            value: (function (_request) {
                var _requestWrapper = function request(_x) {
                    return _request.apply(this, arguments);
                };

                _requestWrapper.toString = function () {
                    return _request.toString();
                };

                return _requestWrapper;
            })(function (command) {
                var _this = this;

                var params = arguments[1] === undefined ? {} : arguments[1];

                return when.promise(function (resolve, reject) {
                    request.get(ENDPOINT).set("Content-type", "text/plain").query(Object.assign({ command: command, a: _this.agency }, params)).end(function (error, result) {
                        if (error) {
                            reject(new Error(error));
                        } else {
                            var parser = new xml2js.Parser();
                            parser.parseString(result.text, function (error, result) {
                                if (error) {
                                    reject(new Error(error));
                                } else {
                                    resolve(result);
                                }
                            });
                        }
                    });
                });
            })
        }
    });

    return Frizzle;
})();

module.exports = Frizzle;
