export default (props, labels, itemHeight) => {
  if (props.maxItems && labels.length > props.maxItems) {
    return {
      height: itemHeight * props.maxItems,
    };
  };
  return {};
};