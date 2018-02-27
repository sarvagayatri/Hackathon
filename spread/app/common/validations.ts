export function isValidEmail(email: string) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  export function isValidName(name: string) {
    var reg = /^[a-zA-Z0-9 ']{1,100}$/;
    return reg.test(name);
  }
  export function isValidStreet(name: string) {
    // var reg = /^[a-zA-Z ]*$/;
    var reg = /^[a-zA-Z0-9 ']*$/;
    return reg.test(name);
  }
  export function isValidState(name: string) {
    var reg = /^[a-zA-Z]*$/;
    return reg.test(name);
  }
  export function isValidLandmark(name: string) {
    var reg = /^[a-zA-Z ]*$/;
    return reg.test(name);
  }
  export function isValidMobileNumber(name: string) {
    var reg = /^\d{10}$/;
    return reg.test(name);
  }
  export function isValidCity(name: string) {
    // var reg = /^[a-zA-Z ]*$/;
    var reg = /^[a-zA-Z0-9 ']*$/;
    return reg.test(name);
  }
  export function isValidPincode(name: string) {
    var reg = /^\d{6}$/;
    return reg.test(name);
  }