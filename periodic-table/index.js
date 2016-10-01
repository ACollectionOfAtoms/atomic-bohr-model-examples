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

var glow = function($el) {
  $el.addClass('box-glow')
  setTimeout(function() {
    $el.removeClass('box-glow')
  }, 500)
}

var speed = 180, // how fast the atoms come into existence
    myAtoms = []

for (var i=1; i <= 118; i++) { // iterate over all existing atoms
  (function(i) {
    setTimeout(function() {
      $('#periodic-container')
      .append(`<div class=\'col-md-3 element-container\' id='bohr-container-${i}'></div>`);
      atomConfig.numElectrons = i
      atomConfig.idNumber = i
      atomConfig.containerId = `#bohr-container-${i}`
      var $container = $(`#bohr-container-${i}`)
      var newAtom = new Atom(atomConfig)
      var $atom = $(`#atom-${i}`)
      $atom.addClass('clickable-atom')
      newAtom.infoFunc = $atom.click(function() {
        $atom.attr('data-toggle', 'modal')
        $atom.attr('data-target', '.bs-example-modal-lg')
        $('.modal-title').text(newAtom.elementName)
        $('.wiki-url').text(newAtom.wikiUrl)
        $('.wiki-summary').text(newAtom.wikiSummary)
      })
      myAtoms.push(newAtom)
    }, i * speed);
  }(i));
}
// TODO: Add info button about animation; modals with atomic info
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
// begin rotations after all have come into existence
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
        var $container = $(`#bohr-container-${118 - j}`)
        glow($container)
        myAtoms[j].rotateOrbitals(orbitalRotationConfig)
        myAtoms[j].rotationPattern = orbitalRotationConfig // Store rotation pattern to show in UI
      }, j * 200)
    }(j));
  }
}, speed * 130 )
