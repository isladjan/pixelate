# Image Pixelation Effect

Image pixelation effect when image first displayed on the screen. The animation works by pixelating the image in steps, which can be customized. A JS canvas is used for rendering.

Take a peek at [demo](https://isladjan.com/lab/pixelate/)

https://github.com/user-attachments/assets/b2db4e6a-b9a8-40c6-a5d0-a4c62b763a2f

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
