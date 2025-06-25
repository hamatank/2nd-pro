document.addEventListener('DOMContentLoaded', function () {
  const titles = document.querySelectorAll('.question-title');

  titles.forEach((title) => {
    const icon = title.querySelector('i');
    const answer = title.nextElementSibling;

   
    answer.style.display = 'none';
    icon.classList.remove('fa-circle-up');
    icon.classList.add('fa-circle-down');

    title.addEventListener('click', function () {
      const isVisible = answer.style.display === 'block';

  
      answer.style.display = isVisible ? 'none' : 'block';

      
      if (isVisible) {
        icon.classList.remove('fa-circle-up');
        icon.classList.add('fa-circle-down');
      } else {
        icon.classList.remove('fa-circle-down');
        icon.classList.add('fa-circle-up');
      }
    });
  });
});
