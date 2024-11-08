# Image Pixelation Effect

This project applies an image pixelation effect when the image first appears on the screen. The animation progressively pixelates the image in customizable steps, creating a dynamic visual transition. Rendering is performed using a JavaScript canvas.

Take a peek at [demo](https://isladjan.com/lab/pixelate/)

https://github.com/user-attachments/assets/9138bfd4-1c64-416c-bb9c-2ac4261814bf

This effect is inspired by this website: [davidanthonychenault.com](https://www.davidanthonychenault.com/)
<br />

# Requirements
No dependencies (Vite.js only for building project)
<br />


# Installation
``` 
npm install

//run example
npx vite
npx vite --host
npx vite build
npx vite preview
```
<br />


# How to use
Grab pixelate.js and set it up according to the example in index.html.
```javascript
import  Pixelate  from '../pixelate.js'

const img = document.querySelector('.image-for-pixelate');
new Pixelate( img );

// additional settings
new Pixelate( 
    img, 
    {
        // the pixel size for each step - smaller values represent larger pixels
        // defaul: [0.5, 1, 3, 2, 4, 2, 5.5, 6, 7, 10, 20, 40, 80])
        steps: [1, 2, 3, 50, 60, 80, 100],

        // ms (default: 100)
        timeBetweenSteps: 200                
    } );

```
<br />

# License
This project is licensed under the MIT License.
