export {isAndroid, isIOS} from './platform';
export {
  isValidEmail, isValidCity, isValidLandmark, isValidMobileNumber,
  isValidName, isValidPincode, isValidState, isValidStreet
} from './validations';


export var loaderOptions = {
  message: 'Uploading...',
  progress: 0.65,
  android: {
    indeterminate: true,
    cancelable: false,
    max: 100,
    progressNumberFormat: "%1d/%2d",
    progressPercentFormat: 0.53,
    progressStyle: 1,
    secondaryProgress: 1
  }
};

export var animationObject = {
  animated: true,
  transition: {
    name: "slide",
    duration: 380,
    curve: "easeIn"
  }
};
export var clearHistoryAnimation = {
  clearHistory: true,
  animationObject
}
