export class EnterEvent {
  constructor() {
    this.event();
  }
  event() {
    window.addEventListener('keydown', async (e) => {
      if (e.key === "Enter") {

        const id = document.getElementById('id');
        const pw = document.getElementById('pw');

        if (id.style.borderColor === 'green' && pw.style.borderColor === 'green') {
          const loginData = {
            name: document.getElementById('id').value,
            pw: document.getElementById('pw').value
          }
          try {
            const response = await fetch('http://localhost:3000/adminLogin', {
              method: "POST",
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(loginData)
            });

            if (!response.ok) {
              throw new Error('실패');
            }
            

            // 성공 시 페이지 이동 등 추가 로직
            // window.location.href = '/dashboard'; // 예: 대시보드 페이지로 이동

          } catch (error) {
            console.error('Error:', error);
          }
        } else {
          return;
        }


      }
    });
  }
}
