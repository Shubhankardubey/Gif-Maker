# Gif-Maker
JavaScript library that can create animated GIFs from media streams, videos, or images. Using the gif shot api.

gifmaker uses the following technologies:

- The webRTC `getUserMedia()` API to get permission to use a user's webcam and manipulate the `CameraStream` Media object
- The HTML5 `Filesystem` APIs to handle the temporary blob URL creation
- The HTML5 `video` element to stream the blob URL
- The `canvas` API to create a dynamic image from an HTML5 video, or images
- `Web workers` to process the GIF frames
- `Typed Arrays` to handle binary image data
- `Base 64 encoding` to create a base 64 encoded image string

## Browser Support

- **Animated GIF from Webcam** :

- Firefox 17+, Chrome 21+, Opera 18+, Blackberry Browser 10+, Opera Mobile 12+, Chrome For Android 35+, Firefox for Android 29+

- **Animated GIF from Existing Video** :

- All modern browsers (IE10+)

- **Animated GIF from Existing Images** :

- All modern browsers (IE10+)

## Quick Start

- Include `gifshot` on your HTML page (`gifshot.js` can be found in the `build` directory)

```html
<script src='gifshot.js'></script>
```

- Start using the JavaScript API to create your animated GIFs

```javascript
// By default, a user's webcam is used to create the animated GIF
gifshot.createGIF({}, function(obj) {
  if(!obj.error) {
    var image = obj.image,
    animatedImage = document.createElement('img');
    animatedImage.src = image;
    document.body.appendChild(animatedImage);
  }
});
```

