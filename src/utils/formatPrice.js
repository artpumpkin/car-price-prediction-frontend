const formatPrice = (price) => {
  if (price) {
    const [number, floatPoint = '00'] = price.split('.');
    return `${number
      .split('')
      .reverse()
      .join('')
      .match(/\d{1,3}/g)
      .join(',')
      .split('')
      .reverse()
      .join('')}.${floatPoint.slice(0, 2).padEnd(2, '0')} MAD`;
  }
  return '0.00 MAD';
};

export default formatPrice;
