'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _vanilla = require('../themes/vanilla');

var _vanilla2 = _interopRequireDefault(_vanilla);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ThemeContext = _react2.default.createContext(_vanilla2.default);

ThemeContext.Extend = function (_ref) {
  var children = _ref.children,
      value = _ref.value;
  return _react2.default.createElement(
    ThemeContext.Consumer,
    null,
    function (theme) {
      return _react2.default.createElement(
        ThemeContext.Provider,
        {
          value: (0, _utils.deepMerge)(theme, value)
        },
        children
      );
    }
  );
};

exports.default = ThemeContext;