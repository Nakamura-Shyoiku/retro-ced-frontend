import { isEmpty } from 'lodash';

export default (props, labelsList) => {
  if (!isEmpty(props.brands)) {
    return props.brands || [];
  }
  return labelsList[props.category][props.attribute] || [];
}