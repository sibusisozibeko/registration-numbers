function RegiStration(Regnum) {
  var regentered = Regnum || {}
  var regplate = "";

  function Regadd(regNumber) {

    for (var i = 0; i < regNumber.length; i++) {
      if (regentered[regNumber] === undefined && regNumber.startsWith("CA") ||
        regNumber.startsWith("CK") || regNumber.startsWith("CY")) {
        regentered[regNumber] = 0;
        return true;
      }
      return false;
    }

  }

  function filtering(radio) {
    var townreg = Object.keys(storing);
    if (radio === 'all') {
      return townreg;
    }
    
    let fil = townreg.filter(current => current.startsWith(radio))

    return fil;
  }

  function regCount() {
    return Object.keys(regentered);
  }

  function regMap() {
    return regentered;
  }

  function clearButton() {
    return regentered = {};
  }


  return {
    Regadd,
    regMap,
    regCount,
    clearButton,
    filtering
  }

}
