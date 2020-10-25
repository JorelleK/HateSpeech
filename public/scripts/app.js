'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// JSX - Javascript XML
var Tweet = function (_React$Component) {
  _inherits(Tweet, _React$Component);

  function Tweet() {
    _classCallCheck(this, Tweet);

    return _possibleConstructorReturn(this, (Tweet.__proto__ || Object.getPrototypeOf(Tweet)).apply(this, arguments));
  }

  _createClass(Tweet, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h1',
          null,
          'Indecision'
        )
      );
    }
  }]);

  return Tweet;
}(_react2.default.Component);

var TrackApp = _react2.default.createClass({
  displayName: 'TrackApp',
  getInitialState: function getInitialState() {
    return {
      tweets: [],
      banIslamCount: 0,
      banShariaCount: 0,
      civilizationJihadCount: 0,
      islamIsTheProblemCount: 0,
      endIslamCount: 0,
      totalHashTagCount: 0,
      totalCount: 0
    };
  },
  componentDidMount: function componentDidMount() {
    var _this = this;
    this.serverRequest = axios.get("api/gettweets").then(function (result) {
      _this.setState({
        tweets: result.data[0].latestTweets,
        banIslamCount: result.data[0].banIslamCount,
        banShariaCount: result.data[0].banShariaCount,
        civilizationJihadCount: result.data[0].civilizationJihadCount,
        islamIsTheProblemCount: result.data[0].islamIsTheProblemCount,
        endIslamCount: result.data[0].endIslamCount,
        totalHashTagCount: result.data[0].banIslamCount + result.data[0].banShariaCount + result.data[0].islamIsTheProblemCount + result.data[0].endIslamCount,
        totalCount: result.data[0].totalCount
      });
    });
  },
  componentWillUnmount: function componentWillUnmount() {
    this.serverRequest.abort();
  },
  render: function render() {
    _react2.default.createElement(
      'div',
      { className: 'container' },
      _react2.default.createElement(
        'div',
        { className: 'row counts' },
        _react2.default.createElement(
          'div',
          { className: 'col-md-3 col-sm-6' },
          _react2.default.createElement(
            'div',
            { className: 'count-boxes orange' },
            _react2.default.createElement(
              'p',
              { className: 'hashtag' },
              '#BanIslam'
            )
          )
        )
      )
    );
  }
});

ReactDOM.render(_react2.default.createElement(TrackApp, null), document.getElementById("app"));

//var appRoot = document.getElementById('app');

//ReactDOM.render(template, appRoot);

//Babel is javascript compiler
//babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch
//live-server public
//only a single root element in jsx template
//ex: <div><h1>Indecision App</h1><p>This is some info</p></div>
//var username = "test"  <h1>{username}</h1>
