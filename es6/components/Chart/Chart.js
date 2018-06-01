var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { compose } from 'recompose';

import { colorForName, parseMetricToNum } from '../../utils';

import { withTheme } from '../hocs';

import StyledChart from './StyledChart';

import doc from './doc';

var renderBars = function renderBars(values, bounds, scale, height) {
  return (values || []).map(function (valueArg, index) {
    var label = valueArg.label,
        onHover = valueArg.onHover,
        value = valueArg.value,
        rest = _objectWithoutProperties(valueArg, ['label', 'onHover', 'value']);

    var key = 'p-' + index;
    var bottom = value.length === 2 ? bounds[1][0] : value[1];
    var top = value.length === 2 ? value[1] : value[2];
    if (top !== 0) {
      var d = 'M ' + (value[0] - bounds[0][0]) * scale[0] + ',' + ('' + (height - (bottom - bounds[1][0]) * scale[1])) + (' L ' + (value[0] - bounds[0][0]) * scale[0] + ',') + ('' + (height - (top - bounds[1][0]) * scale[1]));

      var hoverProps = void 0;
      if (onHover) {
        hoverProps = {
          onMouseOver: function onMouseOver() {
            return onHover(true);
          },
          onMouseLeave: function onMouseLeave() {
            return onHover(false);
          }
        };
      }

      return React.createElement(
        'g',
        { key: key, fill: 'none' },
        React.createElement(
          'title',
          null,
          label
        ),
        React.createElement('path', _extends({ d: d }, hoverProps, rest))
      );
    }
    return undefined;
  });
};

var renderLine = function renderLine(values, bounds, scale, height, _ref) {
  var onClick = _ref.onClick,
      onHover = _ref.onHover;

  var d = '';
  (values || []).forEach(function (_ref2, index) {
    var value = _ref2.value;

    d += (index ? ' L' : 'M') + ' ' + (value[0] - bounds[0][0]) * scale[0] + ',' + ('' + (height - (value[1] - bounds[1][0]) * scale[1]));
  });

  var hoverProps = void 0;
  if (onHover) {
    hoverProps = {
      onMouseOver: function onMouseOver() {
        return onHover(true);
      },
      onMouseLeave: function onMouseLeave() {
        return onHover(false);
      }
    };
  }
  var clickProps = void 0;
  if (onClick) {
    clickProps = { onClick: onClick };
  }

  return React.createElement(
    'g',
    { fill: 'none' },
    React.createElement('path', _extends({ d: d }, hoverProps, clickProps))
  );
};

var renderArea = function renderArea(values, bounds, scale, height, _ref3) {
  var color = _ref3.color,
      onClick = _ref3.onClick,
      onHover = _ref3.onHover,
      theme = _ref3.theme;

  var d = '';
  (values || []).forEach(function (_ref4, index) {
    var value = _ref4.value;

    var top = value.length === 2 ? value[1] : value[2];
    d += (!index ? 'M' : ' L') + ' ' + (value[0] - bounds[0][0]) * scale[0] + ',' + ('' + (height - (top - bounds[1][0]) * scale[1]));
  });
  (values || []).reverse().forEach(function (_ref5) {
    var value = _ref5.value;

    var bottom = value.length === 2 ? bounds[1][0] : value[1];
    d += ' L ' + value[0] * scale[0] + ',' + ('' + (height - (bottom - bounds[1][0]) * scale[1]));
  });
  d += ' Z';

  var hoverProps = void 0;
  if (onHover) {
    hoverProps = {
      onMouseOver: function onMouseOver() {
        return onHover(true);
      },
      onMouseLeave: function onMouseLeave() {
        return onHover(false);
      }
    };
  }
  var clickProps = void 0;
  if (onClick) {
    clickProps = { onClick: onClick };
  }

  return React.createElement(
    'g',
    { fill: colorForName(color, theme) },
    React.createElement('path', _extends({ d: d }, hoverProps, clickProps))
  );
};

var normalizeBounds = function normalizeBounds(bounds, values) {
  var result = bounds;
  if (!result) {
    result = [[0, 1], [0, 1]];
    (values || []).forEach(function (value) {
      result[0][0] = Math.min(result[0][0], value.value[0]);
      result[0][1] = Math.max(result[0][1], value.value[0]);
      result[1][0] = Math.min(result[1][0], value.value[1]);
      result[1][1] = Math.max(result[1][1], value.value[1]);
    });
  }
  return result;
};

var Chart = function (_Component) {
  _inherits(Chart, _Component);

  function Chart() {
    var _temp, _this, _ret;

    _classCallCheck(this, Chart);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = { containerWidth: 0, containerHeight: 0 }, _this.onResize = function () {
      var parent = findDOMNode(_this.containerRef).parentNode;
      if (parent) {
        var rect = parent.getBoundingClientRect();
        _this.setState({ containerWidth: rect.width, containerHeight: rect.height });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Chart.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var bounds = nextProps.bounds,
        values = nextProps.values;
    var stateBounds = prevState.bounds;

    var nextBounds = normalizeBounds(bounds, values);
    if (!stateBounds || nextBounds[0][0] !== stateBounds[0][0] || nextBounds[0][1] !== stateBounds[0][1] || nextBounds[1][0] !== stateBounds[1][0] || nextBounds[1][1] !== stateBounds[1][1]) {
      return { bounds: nextBounds };
    }
    return null;
  };

  Chart.prototype.componentDidMount = function componentDidMount() {
    window.addEventListener('resize', this.onResize);
    this.onResize();
  };

  Chart.prototype.componentWillUnmount = function componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  };

  Chart.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        color = _props.color,
        onClick = _props.onClick,
        onHover = _props.onHover,
        round = _props.round,
        size = _props.size,
        theme = _props.theme,
        thickness = _props.thickness,
        type = _props.type,
        values = _props.values,
        rest = _objectWithoutProperties(_props, ['color', 'onClick', 'onHover', 'round', 'size', 'theme', 'thickness', 'type', 'values']);

    var _state = this.state,
        bounds = _state.bounds,
        containerWidth = _state.containerWidth,
        containerHeight = _state.containerHeight;


    var sizeWidth = typeof size === 'string' ? size : size.width || 'medium';
    var sizeHeight = typeof size === 'string' ? size : size.height || 'medium';
    var width = sizeWidth === 'full' ? containerWidth : parseMetricToNum(theme.global.size[sizeWidth]);
    var height = sizeHeight === 'full' ? containerHeight : parseMetricToNum(theme.global.size[sizeHeight]);
    var strokeWidth = parseMetricToNum(theme.global.edgeSize[thickness]);
    var scale = [width / (bounds[0][1] - bounds[0][0]), height / (bounds[1][1] - bounds[1][0])];

    var contents = void 0;
    if (type === 'bar') {
      contents = renderBars(values, bounds, scale, height);
    } else if (type === 'line') {
      contents = renderLine(values, bounds, scale, height, this.props);
    } else if (type === 'area') {
      contents = renderArea(values, bounds, scale, height, this.props);
    }

    return React.createElement(
      StyledChart,
      _extends({
        ref: function ref(_ref6) {
          _this2.containerRef = _ref6;
        },
        viewBox: '-' + strokeWidth / 2 + ' -' + strokeWidth / 2 + '\n          ' + (width + strokeWidth) + ' ' + (height + strokeWidth),
        preserveAspectRatio: 'xMinYMin meet',
        width: size === 'full' ? '100%' : width,
        height: size === 'full' ? '100%' : height
      }, rest),
      React.createElement(
        'g',
        {
          stroke: colorForName(color, theme),
          strokeWidth: strokeWidth,
          strokeLinecap: round ? 'round' : 'butt',
          strokeLinejoin: round ? 'round' : 'miter'
        },
        contents
      )
    );
  };

  return Chart;
}(Component);

Chart.defaultProps = {
  color: 'accent-1',
  size: { width: 'medium', height: 'small' },
  thickness: 'medium',
  type: 'bar'
};


if (process.env.NODE_ENV !== 'production') {
  doc(Chart);
}

export default compose(withTheme)(Chart);