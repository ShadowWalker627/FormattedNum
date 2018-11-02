import React from 'react';
import PropTypes from 'prop-types';

const FormattedNum = props => {
  const {
    isPercent,
    formattedId,
    showPlus,
    formatColor,
    positiveColor = '#e04940',
    negativeColor = '#34BA95',
    isInit,
    showComma,
    style,
  } = props;
  let { value } = props;
  let initValueState; // 表示值初始正负状态,1---正，0---0, -1 ---负
  let textColor = '';
  if (value < 0) {
    textColor = negativeColor;
    value = `${(isPercent ? value * 100 : value).toFixed(
      2,
    )}`;
    initValueState = -1;
  } else if (value > 0) {
    textColor = positiveColor;
    value = `${(isPercent ? value * 100 : value).toFixed(
      2,
    )}`;
    initValueState = 1;
  } else {
    value = '0.00';
    textColor = '#404040';
    initValueState = 0;
  }

  // 不显示逗号，不显示为整数时，无需处理
  if (value !== '0.00') {
    if (showComma && !isInit) {
      // 默认：显示逗号，非整数
      const leftAbsValue = Number(
        value.split('.')[0],
      ).toLocaleString();
      // 对于0的情况处理
      // initValueState === -1 && leftValue === '0' ?
      const leftValue =
        initValueState === -1 && leftAbsValue === '0'
          ? `-${leftAbsValue}`
          : leftAbsValue;
      const rightValue = value.split('.')[1];
      value = `${leftValue}.${rightValue}`;
    } else if (showComma && isInit) {
      // 显示逗号，显示为整数
      // http://www.cnblogs.com/yiway/archive/2007/02/08/644689.html奇进偶舍
      value = Math.round(
        parseFloat(value),
      ).toLocaleString();
    } else if (!showComma && isInit) {
      // 不显示逗号，整数
      value = Math.round(parseFloat(value));
    }

    if (showPlus && initValueState === 1) {
      // 需要显示加号
      value = `+${value}`;
    }

    if (isPercent) {
      // 需要显示百分号
      value = `${value}%`;
    }
  } else if (value === '0.00') {
    textColor = '#404040';
    if (isPercent) {
      value = '0.00%';
    }
  }

  if (!initValueState) {
    textColor = '#404040';
  }

  return (
    <div
      style={{ ...style, color: formatColor || textColor }}
    >
      <span id={formattedId}>{value}</span>
    </div>
  );
};

FormattedNum.propTypes = {
  value: PropTypes.number.isRequired, // 要显示的数值
  formattedId: PropTypes.string,
  isPercent: PropTypes.bool, // 是否显示百分号
  showPlus: PropTypes.bool, // 是否显示正负号
  formatColor: PropTypes.string,
  showComma: PropTypes.bool, // 是否显示逗号
  isInit: PropTypes.bool, // 是否显示小数点后两位
  style: PropTypes.object, // 样式
};

FormattedNum.defaultProps = {
  showPlus: false,
  isPercent: false,
  formatColor: '',
  showComma: true,
  isInit: false,
  style: {},
};

export default FormattedNum;
