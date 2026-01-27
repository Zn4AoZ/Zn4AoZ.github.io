<script>
document.addEventListener('DOMContentLoaded', function() {
  // Scroll animations ONLY
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('active');
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // CAROUSEL - MANUAL NAVIGATION ONLY (NO AUTO)
  const track = document.getElementById('carouselTrack');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  
  const totalSlides = 9;
  const visibleSlides = 2;
  const maxPosition = 7;  // 8 positions (0-7)
  const cardWidth = 420;
  let currentIndex = 0;
  let isTransitioning = false;

  function updateCarousel() {
    isTransitioning = true;
    const offset = -currentIndex * cardWidth;
    track.style.transform = `translateX(${offset}px)`;
    
    // Update dots
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });

    setTimeout(() => {
      isTransitioning = false;
    }, 600);
  }

  function navigateTo(index) {
    if (isTransitioning) return;
    
    currentIndex = Math.max(0, Math.min(index, maxPosition));
    updateCarousel();
  }

  // Manual navigation only
  nextBtn.addEventListener('click', () => {
    navigateTo(currentIndex + 1 > maxPosition ? 0 : currentIndex + 1);
  });

  prevBtn.addEventListener('click', () => {
    navigateTo(currentIndex - 1 < 0 ? maxPosition : currentIndex - 1);
  });

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => navigateTo(index));
  });

  // Initialize first position
  updateCarousel();
});

</script>
