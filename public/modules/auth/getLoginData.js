export const getLoginData = () => {
  const id = document.getElementById('id');
  const pw = document.getElementById('pw');
  if (id.style.borderColor === 'green' && pw.style.borderColor === 'green') {
    return {
      name: id.value,
      pw: pw.value
    };
  } else {
    return null;
  }
}

