var atomConfig = {  //All atoms share this base-config
  nucleusRadius: 20,
  electronRadius: 2,
  symbolOffset: 7,
  animationTime: 600,
  orbitalColor: 'rgba(24, 255, 255, 0.3)',
  orbitalWidth: 0.5,
  nucleusColor: 'rgba(3, 169, 244, 0.2)',
  electronColor: 'rgba(24, 255, 255, 0.6)'
}
var speed = 80, // how fast the atoms come into existence
    myAtoms = []

for (var i=1; i <= 118; i++) { // iterate over all existing atoms
  (function(i) {
    setTimeout(function() {
      $('#periodic-container')
      .append(`<div class=\'col-md-3 element-container\' id='bohr-container-${i}'></div>`);
      atomConfig.numElectrons = i
      atomConfig.idNumber = i
      atomConfig.containerId = `#bohr-container-${i}`
      // $(`#bohr-container-${i}`).append(`<div class='tooltip' id='tooltip-id-${i}'>`)
      myAtoms.push(new Atom(atomConfig))
      // $(`#tooltip-id-${i}`).append(`<span class="tooltiptext" id='tooltip-text-${i}'>`)
      // $(`#tooltip-text-${i}`).text(myAtoms[myAtoms.length -1].wikiSummary)
    }, i * speed);
  }(i));
}
function getRandomInt(min, max) { // to randomly assign rotational pattern and alternating bool
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var rotationalPatterns = [
    'parabolaUp',
    'parabolaDown',
    'linearPositive',
    'linearNegative',
    'cubedPositive',
    'cubedNegative',
    'random',
    'uniform',
  ],
  orbitalRotationConfig = {pattern:{preset:''}},
  alternate = [true, false]
// begin rotations after all have come into existene
setTimeout(function() {
  myAtoms.reverse();
  for (var j=0; j <= 117; j++) {
    (function(j) {
      setTimeout(function() {
        var orbitalPattern = rotationalPatterns[getRandomInt(0,7)],
            alternating = alternate[getRandomInt(0,1)]
        orbitalRotationConfig.pattern.preset = orbitalPattern
        orbitalRotationConfig.pattern.alternating = alternating
        alternating = alternate[getRandomInt(0,1)]
        orbitalRotationConfig.pattern.clockwise = alternating
        myAtoms[j].rotateOrbitals(orbitalRotationConfig)
      }, j * 200)
    }(j));
  }
}, speed * 118)
