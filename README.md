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

// Desired width of the image
'gifWidth': 200,
// Desired height of the image
'gifHeight': 200,
// If this option is used, then a GIF will be created using these images
// e.g. ['http://i.imgur.com/2OO33vX.jpg', 'http://i.imgur.com/qOwVaSN.png', 'http://i.imgur.com/Vo5mFZJ.gif'],
// Note: Make sure these image resources are CORS enabled to prevent any cross-origin JavaScript errors
// Note: You may also pass a NodeList of existing image elements on the page
'images': [],
// If this option is used, then a gif will be created using the appropriate video
// HTML5 video that you would like to create your animated GIF from
// Note: Browser support for certain video codecs is checked, and the appropriate video is selected
// Note: You may also pass a NodeList of existing video elements on the page
// e.g. 'video': ['example.mp4', 'example.ogv'],
'video': null,
// You can pass an existing video element to use for the webcam GIF creation process,
// and this video element will not be hidden (useful when used with the keepCameraOn option)
// Pro tip: Set the height and width of the video element to the same values as your future GIF
// Another Pro Tip: If you use this option, the video will not be paused, the object url not revoked, and
// the video will not be removed from the DOM.  You will need to handle this yourself.
'webcamVideoElement': null,
// Whether or not you would like the user's camera to stay on after the GIF is created
// Note: The cameraStream Media object is passed back to you in the createGIF() callback function
'keepCameraOn': false,
// Expects a cameraStream Media object
// Note: Passing an existing camera stream will allow you to create another GIF and/or snapshot without
//	asking for the user's permission to access the camera again if you are not using SSL
'cameraStream': null,
// CSS filter that will be applied to the image (eg. blur(5px))
'filter': '',
// The amount of time (in seconds) to wait between each frame capture
'interval': 0.1,
// The amount of time (in seconds) to start capturing the GIF (only for HTML5 videos)
'offset': null,
// The number of frames to use to create the animated GIF
// Note: Each frame is captured every 100 milleseconds of a video and every ms for existing images
'numFrames': 10,
// The amount of time (10 = 1s) to stay on each frame
'frameDuration': 1,
// The text that covers the animated GIF
'text': '',
// The font weight of the text that covers the animated GIF
'fontWeight': 'normal',
// The font size of the text that covers the animated GIF
'fontSize': '16px',
// The minimum font size of the text that covers the animated GIF
// Note: This option is only applied if the text being applied is cut off
'minFontSize': '10px',
// Whether or not the animated GIF text will be resized to fit within the GIF container
'resizeFont': false,
// The font family of the text that covers the animated GIF
'fontFamily': 'sans-serif',
// The font color of the text that covers the animated GIF
'fontColor': '#ffffff',
// The horizontal text alignment of the text that covers the animated GIF
'textAlign': 'center',
// The vertical text alignment of the text that covers the animated GIF
'textBaseline': 'bottom',
// The X (horizontal) Coordinate of the text that covers the animated GIF (only use this if the default textAlign and textBaseline options don't work for you)
'textXCoordinate': null,
// The Y (vertical) Coordinate of the text that covers the animated GIF (only use this if the default textAlign and textBaseline options don't work for you)
'textYCoordinate': null,
// Callback function that provides the current progress of the current image
'progressCallback': function(captureProgress) {},
// Callback function that is called when the current image is completed
'completeCallback': function() {},
// how many pixels to skip when creating the palette. Default is 10. Less is better, but slower.
// Note: By adjusting the sample interval, you can either produce extremely high-quality images slowly, or produce good images in reasonable times.
// With a sampleInterval of 1, the entire image is used in the learning phase, while with an interval of 10,
// a pseudo-random subset of 1/10 of the pixels are used in the learning phase. A sampling factor of 10 gives a
// substantial speed-up, with a small quality penalty.
'sampleInterval': 10,
// how many web workers to use to process the animated GIF frames. Default is 2.
'numWorkers': 2,
// Whether or not you would like to save all of the canvas image binary data from your created GIF
// Note: This is particularly useful for when you want to re-use a GIF to add text to later
'saveRenderingContexts': false,
// Expects an array of canvas image data
// Note: If you set the saveRenderingContexts option to true, then you get the savedRenderingContexts
//	in the createGIF callback function
'savedRenderingContexts': []
// When existing images or videos are requested used, we set a CORS attribute on the request.
// Options are 'Anonymous', 'use-credentials', or a falsy value (like '') to not set a CORS attribute.
'crossOrigin': 'Anonymous'
