
function _makeSimulatedPause(duration = 400) {
  return new Promise(resolve => setTimeout(resolve, duration))
}

module.exports = {}
