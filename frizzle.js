"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var request = _interopRequire(require("superagent"));

var when = _interopRequire(require("when"));

var extend = _interopRequire(require("extend"));

var xml2js = _interopRequire(require("xml2js"));

var Frizzle = (function () {
    function Frizzle(options) {
        var _this = this;

        _classCallCheck(this, Frizzle);

        this.endpoint = "http://webservices.nextbus.com/service/publicXMLFeed";
        this.agency = options.agency || "sf-muni";
        this.commands = ["agencyList", "routeList", "routeConfig", "predictions"];
        this.commands.map(function (command) {
            return _this[command] = function (params) {
                var requestParams = params || {};
                return this.request(extend(requestParams, { command: command, a: this.agency }));
            };
        });
    }

    _createClass(Frizzle, {
        request: {
            value: (function (_request) {
                var _requestWrapper = function request(_x) {
                    return _request.apply(this, arguments);
                };

                _requestWrapper.toString = function () {
                    return _request.toString();
                };

                return _requestWrapper;
            })(function (params) {
                var _this = this;

                return when.promise(function (resolve, reject) {
                    request.get(_this.endpoint).set("Content-type", "text/plain").query(params).end(function (error, result) {
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
