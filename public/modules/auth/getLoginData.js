export const getLoginData = () => {
  const id = document.getElementById('id');
  const pw = document.getElementById('pw');
  if (idNode.style.borderColor === 'green' && pwNode.style.borderColor === 'green') {
    return {
      name: id.value,
      pw: pw.value
    };
  } else {
    return null;
  }
}

