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
var rotationalPatterns = [
    'parabolaUp',
    'parabolaDown',
    'linearPositive',
    'linearNegative',
    'cubedPositive',
    'cubedNegative',
    'random',
    'uniform',
  ]
var orbitalRotationConfig = {pattern:{preset:''}},
    alternate = [true, false]
// TODO: Add info button about animation; modals with atomic info
function getRandomInt(min, max) { // to randomly assign rotational pattern and alternating bool
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var glow = function($el) {
  $el.addClass('box-glow')
  setTimeout(function() {
    $el.removeClass('box-glow')
  }, 500)
}

var speed = 180, // how fast the atoms come into existence
    myAtoms = []
// Check for mobile
isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

if (!isMobile) {
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
          $('.wiki-url').attr('href', newAtom.wikiUrl)
          $('.wiki-summary').text(newAtom.wikiSummary)
        })
        myAtoms.push(newAtom)
      }, i * speed);
    }(i));
  }
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
} else { // mobile
  var randInt = function() {
    var min = 1
    var max = 118
    return Math.round(Math.random() * (max - min) + min)
  }
  atomConfig.nucleusRadius = 80
  atomConfig.electronRadius = 5
  atomConfig.symbolOffset = 30
  $('#periodic-container').append("<div class='col-sm-12'><h2 class='subdued'> (Tap the atom to generate a new one) </h2></div>")
  $('#periodic-container')
  .append(`<div class=\'col-sm-12 element-container\' id='bohr-container-1'></div>`);
  atomConfig.numElectrons = 1
  atomConfig.idNumber = 1
  atomConfig.containerId = `#bohr-container-1`
  var orbitalPattern = rotationalPatterns[getRandomInt(0,7)],
      alternating = alternate[getRandomInt(0,1)]
  orbitalRotationConfig.pattern.preset = orbitalPattern
  orbitalRotationConfig.pattern.alternating = alternating
  alternating = alternate[getRandomInt(0,1)]
  orbitalRotationConfig.pattern.clockwise = alternating
  var newAtom = new Atom(atomConfig)
  $('#periodic-container').append(`<div class='col-sm-12'><h1 class=\'element-name\'></h1></div>`);
  $('.element-name').text(newAtom.elementName)
  $('#periodic-container').append(`<div class=\'col-sm-12\'><h2 class='atomic-details'></h2></div>`);
  $('.atomic-details').text(newAtom.wikiSummary)
  var $atom = $(`#atom-1`)
  $('#periodic-container').click(function() {
    orbitalPattern = rotationalPatterns[getRandomInt(0,7)]
    orbitalRotationConfig.pattern.preset = orbitalPattern
    alternating = alternate[getRandomInt(0,1)]
    orbitalRotationConfig.pattern.alternating = alternating
    alternating = alternate[getRandomInt(0,1)]
    orbitalRotationConfig.pattern.clockwise = alternating

    newAtom.setNumElectrons(randInt());
    $('.element-name').animate({'opacity': 0}, 500, function() {
      $(this).text(newAtom.elementName)
    }).animate({'opacity': 1}, 500)
    $('.atomic-details').animate({'opacity': 0}, 500, function() {
      $(this).text(newAtom.wikiSummary)
    }).animate({'opacity': 1}, 500)
    setTimeout(function() {
      newAtom.rotateOrbitals(orbitalRotationConfig)
    }, 1500)
  })
}
