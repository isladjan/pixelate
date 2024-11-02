# Image Pixelation Effect

Image pixelation effect when img first displayed on the screen. The animation works by pixelating the image in steps, which can be customized. A JS canvas is used for rendering.

Take a peek at [demo](https://isladjan.com/lab/pixelate/)

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

//additional settings
new Pixelate( 
    img, 
    {
        steps: [1, 2, 3, 50, 60, 80, 100],   //pixel size
        timeBetweenSteps: 200                //ms
    } );

```
<br />

# License
This project is licensed under the MIT License.