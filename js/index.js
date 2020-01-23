// Simple click event
let logo = document.querySelector('h1');
logo.addEventListener('click', (e) => {
  e.target.style.transform += 'rotate(180deg)';
  // Interesting... adding this `gsap` disables further style changes
  gsap.to(e.target, {duration: 2, x: 100});
});

// Event handler on group of elements
let navAnchors = document.querySelectorAll('nav a');
navAnchors.forEach(anchor => {
  anchor.addEventListener('mouseover', function(e) {
    this.style.color = 'red';
  });
});

// Anchor click event that disables default behavior
navAnchors.forEach(anchor => {
  anchor.addEventListener('click', e => {
    anchor.style.fontSize = 'x-large';
    e.preventDefault();
  });
});

// Event handler on the parent of the group
document.querySelector('nav').addEventListener('mouseout', function(e) {
  // Very interesting. Mouseout is triggered when you mouse over a *child* element.
  this.style.border = '3px green dotted';
  e.target.style.color = 'blue';
});

// Make an image shrink while you scroll
let pauseScrollCallback = false;
let imageWidthPercentage = 100;
let mapImage = document.querySelector('section.content-section img');
mapImage.style.display = 'block';
mapImage.style.margin = '0 auto';
document.addEventListener('scroll', function(e) {
  if (!pauseScrollCallback) {
    imageWidthPercentage -= 1;
    mapImage.style.maxWidth = `${imageWidthPercentage}%`;
    pauseScrollCallback = true;
    window.setTimeout(() => {
      pauseScrollCallback = false;
    }, 50);
  }
});

// Blink the header on load
let isBlinked = false
let blinkCounter = 0;
let header = document.querySelector('header');
function blinkToggle(counter) {
  if (counter > 0) {
    window.setTimeout(() => {
      if (isBlinked) {
        header.style.backgroundColor = 'white';
        blinkToggle(counter - 1);
      } else {
        header.style.backgroundColor = 'blue';
        blinkToggle(counter);
      }
      isBlinked = !isBlinked;
    }, 500);
  }
}
window.addEventListener('load', function() {
  blinkToggle(3);
});

// Click event on the container
let isColorToggled = false;
let container = document.querySelector('.home');
container.addEventListener('click', function(e) {
  if (isColorToggled) {
    this.style.color = 'black';
  } else {
    this.style.color = 'blue';
  }
  isColorToggled = !isColorToggled;
});

// Rotate body image on click
// Does not trigger the previous event because of stopPropagation
let bodyImages = document.querySelectorAll('.container img');
bodyImages.forEach(image => {
  image.addEventListener('click', function(e) {
    this.style.transform += 'rotate(90deg)';
    e.stopPropagation();
  });
});

// Double click handler with stopPropagation
let bodyHeaders = document.querySelectorAll('h2');
bodyHeaders.forEach(header => {
  header.addEventListener('dblclick', (e) => {
    header.style.fontFamily = 'impact';
    e.stopPropagation();
  });
});

// Resize
window.onresize = () => {
  container.style.border = '5px dotted yellow';
};

// Make image pulse when clicked
let secondImage = document.querySelector(".content-section.inverse-content img")
secondImage.addEventListener("click", (e) => {
  // Again, this disrupts all future animations (possibly all events)
  gsap.to(e.target, {duration: 1, scale: 1.4, ease: 'elastic'});
});
