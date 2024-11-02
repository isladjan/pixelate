// Three.js pixelate effect - https://github.com/isladjan/pixelate
'use strict';


let pixelIndex = 0,
  canvasImages = [];
let steps, duration, effectWrap, originalImg, canvasWrap, canvas, ctx, imgRatio, isAnimationActive, timeout;


export default class Pixelate {
  constructor(el, obj) {
    // The pixelation factor values determine the level of pixelation at each step of the effect
    //smaller values represent larger pixels
    if(!obj?.steps) steps = [0.5, 1, 3, 2, 4, 2, 5.5, 6, 7, 10, 20, 40, 80];
    else steps = obj.steps;

    if(!obj?.timeBetweenSteps) duration = 120;
    else duration = obj.timeBetweenSteps;

    this.canvasInit(el);
  }


  canvasInit(el) {
    effectWrap = el;
    originalImg = el.querySelector('img');

    // Create a canvas element
    canvasWrap = document.createElement('div');
    canvasWrap.classList.add('canvas-wrap');
    effectWrap.appendChild(canvasWrap);
    canvas = document.createElement('canvas');
    canvasWrap.appendChild(canvas);

    // Get the 2D rendering context of the canvas
    ctx = canvas.getContext('2d');

    // Create a new Image object and load the image source
    let newImg = new Image();
    newImg.src = originalImg.getAttribute('src');
    canvasImages.push(newImg);

    // Once the image is loaded, perform necessary calculations and rendering
    canvasImages[0].onload = () => {
      imgRatio = canvasImages[0].width / canvasImages[0].height;
      this.setCanvasSize();
      this.drawImage(canvasImages[0]);
      originalImg.style.opacity = 1;
      this.scrollEventInit();
      this.buttonHandler();
    }
  }


  // Sets the canvas size based on the dimensions of the canvasWrap element.
  setCanvasSize() {
    canvas.width = canvasWrap.offsetWidth;
    canvas.height = canvasWrap.offsetHeight;
  }


  //Renders the image on the canvas. Applies the pixelation effect based on the pixel factor.
  drawImage(img) {

    //if the viewport has been resized
    if (canvas.width !== canvasWrap.offsetWidth) {
      this.setCanvasSize();
    }

    const width = canvas.width;
    const height = canvas.height;

    // Calculate the dimensions and position for rendering the image within the canvas based on the image aspect ratio.
    let newWidth = width;
    let newHeight = height;
    let offsetX = 0;
    let offsetY = 0;

    //Adjust the dimensions and position if the image aspect ratio is different from the canvas aspect ratio
    if (newWidth / newHeight > imgRatio) {
      newHeight = Math.round(width / imgRatio)
      offsetY = (height - newHeight) / 2;
    } else {
      newWidth = Math.round(height * imgRatio);
      offsetX = (width - newWidth) / 2;
    }

    // Get the pixel factor based on the current index
    let pxFactor = steps[pixelIndex];
    let size = pxFactor * 0.01;

    // Turn off image smoothing to achieve the pixelated effect
    ctx.imageSmoothingEnabled = false;

    
    // Draw the original image at a fraction of the final size
    ctx.drawImage(img, 0, 0, width * size, height * size)

    // Enlarge the minimized image to full size
    ctx.drawImage(
      canvas,
      0,
      0,
      width * size,
      height * size,
      offsetX,
      offsetY,
      newWidth,
      newHeight
    )

  }


  //Intersection Observer is set on the image to trigger when the image is first displayed on the screen
  scrollEventInit() {
    let self = this;
    let options = {
      threshold: [0.7], //the percentage of the image that needs to be visible before the observer is triggered
    };
    let observer = new IntersectionObserver(handleIntersectPortfolio, options);
    observer.observe(effectWrap);

    function handleIntersectPortfolio(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.boundingClientRect.y > 0) {
          self.animatePixels(canvasImages[0])
          observer.unobserve(effectWrap);
        }
      });
    }
  }


  // Animates the pixelation effect.Renders the image with increasing pixelation factor at each step.
  animatePixels(img) {
    if (pixelIndex < steps.length) {
      isAnimationActive = true;
      timeout = setTimeout(() => {
        this.drawImage(img)
        pixelIndex++;
        requestIdleCallback(() => { this.animatePixels(img) })
      }, pixelIndex === 0 ? duration*2 : duration) // The first duration should be the longest
    }
    else {
      pixelIndex = steps.length - 1;
      canvas.style.opacity = 0;
      isAnimationActive = false;
    }
  }


  buttonHandler() {
    const btn = document.querySelector('.effect-container .btn');
    const images = ["/1.avif", "/2.avif", "/3.avif"];
    let counter = 1;

    function loadImage(url) {
      let img = new Image(url);
      img.src = url;
      canvasImages.push(img);
    }
    images.forEach((url) => { loadImage(url) })

    btn.addEventListener('click', () => {
      if(isAnimationActive) {
        clearTimeout(timeout);
        //ctx.clearRect(0, 0, canvas.width, canvas.height);
      }

      pixelIndex = 0;
      canvas.style.opacity = 1;
      originalImg.src = canvasImages[counter].getAttribute('src');
      this.animatePixels( canvasImages[counter]);
     
      counter++
      if (counter === canvasImages.length) counter = 0;
    })
  }


}