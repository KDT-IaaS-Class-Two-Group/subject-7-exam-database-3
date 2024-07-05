export const requestValidation = (idNode, pwNode) => {
  return idNode.style.borderColor === 'green' && pwNode.style.borderColor === 'green' ? true : false;
}

