(function(window, document) {
    var saveGIFButton = document.querySelector('#save-gif');
    var downloadAttrSupported = ('download' in document.createElement('a'));
    var createGIFButton = document.querySelector('#create-gif');
    var gifSource = document.querySelector('#GIFSource');
    var gifType = document.querySelector('#GIFType');
    var filter = document.querySelector("#filter");
    var interval = document.querySelector("#interval");
    var numFrames = document.querySelector("#numFrames");
    var frameDuration = document.querySelector("#frameDuration");
    var gifHeight = document.querySelector("#gifHeight");
    var gifWidth = document.querySelector("#gifWidth");
    var progressBar = document.querySelector("progress");
    var text = document.querySelector('#gifText');
    var fontWeight = document.querySelector('#fontWeight');
    var fontSize = document.querySelector('#fontSize');
    var fontFamily = document.querySelector('#fontFamily');
    var fontColor = document.querySelector('#fontColor');
    var textAlign = document.querySelector('#textAlign');
    var textBaseline = document.querySelector('#textBaseline');
    var sampleInterval = document.querySelector('#sampleInterval');
    var numWorkers = document.querySelector('#numWorkers');
    var gifshotImagePreview = document.querySelector('.gifshot-image-preview-section');
    var placeholderDiv = document.querySelector('.placeholder-div');
    var placeholderDivDimensions = document.querySelector('.placeholder-div-dimensions');
    var gifshotCode = document.querySelector('.gifshot-code');
    var gifshotCodeTemplate = document.querySelector('.gifshot-code-template');
    var getSelectedOptions = function () {
        return {
            gifWidth: Number(gifWidth.value),
            gifHeight: Number(gifHeight.value),
            images: gifSource.value === 'images' ? ['http://i.imgur.com/2OO33vX.png', 'http://i.imgur.com/qOwVaSN.png', 'http://i.imgur.com/Vo5mFZJ.gif'] : false,
            video: gifSource.value === 'video' ? ['example.mp4', 'example.ogv'] : false,
            filter: filter.value,
            interval: Number(interval.value),
            numFrames: Number(numFrames.value),
            frameDuration: Number(frameDuration.value),
            text: text.value,
            fontWeight: fontWeight.value,
            fontSize: fontSize.value + 'px',
            fontFamily: fontFamily.value,
            fontColor: fontColor.value,
            textAlign: textAlign.value,
            textBaseline: textBaseline.value,
            sampleInterval: Number(sampleInterval.value),
            numWorkers: Number(numWorkers.value)
        }
    };
    var passedOptions;
    var updateCodeBlock = function (obj) {
      obj = obj || {};

      var targetElem = obj.targetElem;
      var selectedOptions = getSelectedOptions();
      var options = (function() {
          var obj = {};

          _.each(selectedOptions, function(val, key) {
              if (val) {
                obj[key] = val;
              }
          });

          return obj;
      }());
      var template = _.template(gifshotCodeTemplate.innerHTML, {
          gifshot: window.gifshot,
          selectedOptions: options,
          method: gifType.value === 'snapshot' ? 'takeSnapShot' : 'createGIF'
      });
      var code = escodegen.generate(esprima.parse(template), {
          format: {
              safeConcatenation: true
          }
      });

      gifshotCode.innerHTML = code;

      Prism.highlightElement(gifshotCode);

      if (targetElem && (targetElem.id === 'gifWidth' || targetElem.id === 'gifHeight')) {
          if (selectedOptions.gifHeight && selectedOptions.gifWidth) {
              gifshotImagePreview.innerHTML = '';
              placeholderDiv.style.height = selectedOptions.gifHeight + 'px';
              placeholderDiv.style.width = selectedOptions.gifWidth + 'px';
              placeholderDivDimensions.innerHTML = selectedOptions.gifWidth + ' x ' + selectedOptions.gifHeight;

              if (selectedOptions.gifWidth < 60 || selectedOptions.gifHeight < 20) {
                  placeholderDivDimensions.classList.add('hidden');
              } else {
                  placeholderDivDimensions.classList.remove('hidden');
              }

              placeholderDiv.classList.remove('hidden');
          } else {
              placeholderDiv.classList.add('hidden');
          }
      }
    };
    var bindEvents = function () {
        createGIFButton.addEventListener('click', function (e) {
            e.preventDefault();

            passedOptions = _.merge(_.clone(getSelectedOptions()), {
                progressCallback: function (captureProgress) {
                    gifshotImagePreview.innerHTML = '';
                    placeholderDiv.classList.add('hidden');
                    progressBar.classList.remove('hidden');
                    progressBar.value = captureProgress;
                }
            });

            var method = gifType.value === 'snapshot' ? 'takeSnapShot' : 'createGIF';

            gifshot[method](passedOptions, function(obj) {
                if (!obj.error) {
                    var image = obj.image;
                    var animatedImage = document.createElement('img');

                    animatedImage.src = image;

                    progressBar.classList.add('hidden');
                    progressBar.value = 0;

                    placeholderDiv.classList.add('hidden');
                    gifshotImagePreview.innerHTML = '';
                    gifshotImagePreview.appendChild(animatedImage);

                    if (downloadAttrSupported) {
                        saveGIFButton.setAttribute('href', image);
                        saveGIFButton.classList.remove('hidden');
                    }
                } else {
                    console.log('obj.error', obj.error);
                    console.log('obj.errorCode', obj.errorCode);
                    console.log('obj.errorMsg', obj.errorMsg);
                }
            });
        }, false);

        saveGIFButton.addEventListener('click', function (e) {
            e.preventDefault();

            window.open(saveGIFButton.getAttribute('href'));

        }, false);

        document.addEventListener('change', function (e) {
            updateCodeBlock({
                targetElem: e.target
            });
        });

        document.addEventListener('keyup', function (e) {
            updateCodeBlock({
                targetElem: e.target
            });
        });
    };

    bindEvents();
    updateCodeBlock({
        targetElem: gifWidth
    });
}(window, document));
