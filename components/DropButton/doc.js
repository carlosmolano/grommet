'use strict';

exports.__esModule = true;

var _reactDesc = require('react-desc');

exports.default = function (DropButton) {
  var DocumentedDropButton = (0, _reactDesc.describe)(DropButton).description('A control that when clicked will render its children in a drop layer.\n    When opened, the drop will control the focus so that the contents behind it are not focusable.\n    ').usage('import { DropButton } from \'grommet\';\n    <DropButton control={element}>{dropContents...}</DropButton>');

  DocumentedDropButton.propTypes = {
    a11yTitle: _reactDesc.PropTypes.string.description('Custom title to be used by screen readers.'),
    background: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.string, _reactDesc.PropTypes.shape({
      color: _reactDesc.PropTypes.string,
      opacity: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['weak', 'medium', 'strong']), _reactDesc.PropTypes.bool])
    })]).description('Background color when drop is active'),
    control: _reactDesc.PropTypes.element.description('React node to open/close the drop content.').isRequired,
    onClose: _reactDesc.PropTypes.func.description('Callback for when the drop is closed'),
    open: _reactDesc.PropTypes.bool.description('Whether the drop should be open or not.')
  };

  return DocumentedDropButton;
};