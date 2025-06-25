const selectAll = document.querySelector('.selection1 input[type="checkbox"]');
const items = document.querySelectorAll('.selection2 input[type="checkbox"]');

selectAll.addEventListener('change', () => {
  items.forEach(cb => cb.checked = selectAll.checked);
});

items.forEach(cb => {
  cb.addEventListener('change', () => {
    selectAll.checked = [...items].every(cb => cb.checked);
  });
});


  document.querySelectorAll('.selection2').forEach((item) => {
    const checkbox = item.querySelector('input[type="checkbox"]');
    const removeBtn = item.querySelector('a');

    removeBtn.addEventListener('click', (e) => {
      e.preventDefault(); 

      if (checkbox.checked) {
        
        const nextImg = item.nextElementSibling;
        const nextQty = nextImg?.nextElementSibling;

        item.remove(); 
        if (nextImg && nextImg.classList.contains('selection2img')) nextImg.remove();
        if (nextQty && nextQty.classList.contains('plus-minus-box')) nextQty.remove();
      } else {
        alert("선택된 항목만 삭제할 수 있습니다.");
      }
    });
  });



  // 숫자 추출 함수 (가격에서 숫자만 뽑기)
  function parsePrice(text) {
    return parseInt(text.replace(/[^\d]/g, ''), 10) || 0;
  }

  // 배송비 상수
  const DELIVERY_FEE = 3500;

  // 수량 변경 이벤트 연결 및 삭제 이벤트 (기존에 있던 코드와 합침)
  function setupCart() {
    const selection2Items = document.querySelectorAll('.selection2');

    selection2Items.forEach((item, index) => {
      const checkbox = item.querySelector('input[type="checkbox"]');
      const removeBtn = item.querySelector('a');

      // plus-minus-box, selection2img 요소 찾기 (같은 인덱스 기준)
      const imgBox = document.querySelectorAll('.selection2img')[index];
      const qtyBox = document.querySelectorAll('.plus-minus-box')[index];

      const plusBtn = qtyBox.querySelector('.plus-icon');
      const minusBtn = qtyBox.querySelector('.minus-icon');
      const qtyValue = qtyBox.querySelector('.value');

      // 수량 초기값 1로 설정 (0이면 계산에 의미 없음)
      if (qtyValue.textContent === "0") qtyValue.textContent = "1";

      // 수량 변경 함수
      function changeQty(delta) {
        let qty = parseInt(qtyValue.textContent);
        qty += delta;
        if (qty < 0) qty = 0; 
        qtyValue.textContent = qty;
        calculateTotalPrice();
      }

      plusBtn.addEventListener('click', () => changeQty(1));
      minusBtn.addEventListener('click', () => changeQty(-1));

      // 삭제 버튼 이벤트
      removeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (checkbox.checked) {
          const nextImg = item.nextElementSibling;
          const nextQty = nextImg?.nextElementSibling;
          const targets = [item];

          if (nextImg && nextImg.classList.contains('selection2img')) targets.push(nextImg);
          if (nextQty && nextQty.classList.contains('plus-minus-box')) targets.push(nextQty);

          targets.forEach(el => {
            el.classList.add('fade-out');
            setTimeout(() => {
              el.remove();
              calculateTotalPrice();
            }, 400);
          });
        } else {
          alert("체크된 항목만 삭제할 수 있습니다.");
        }
      });
    });
  }

  // 총 가격 계산 함수 (수량 * 단가 합산 + 배송비)
  function calculateTotalPrice() {
    let total = 0;
    const priceElements = document.querySelectorAll('.selection2img');
    const qtyElements = document.querySelectorAll('.plus-minus-box');

    priceElements.forEach((el, idx) => {
      const priceTag = el.querySelector('p'); // 첫 번째 p 태그 (단가)
      const qtyBox = qtyElements[idx];
      const qtyValue = qtyBox.querySelector('.value');

      if (priceTag && qtyValue) {
        const price = parsePrice(priceTag.textContent);
        const qty = parseInt(qtyValue.textContent);
        total += price * qty;
      }
    });

    total += DELIVERY_FEE;

    document.getElementById('total-price').textContent = total.toLocaleString();
  }

  // 페이지 로드 후 초기화
  window.addEventListener('DOMContentLoaded', () => {
    setupCart();
    calculateTotalPrice();
  });


