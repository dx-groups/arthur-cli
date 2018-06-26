
function _makeSimulatedPause(durationMs = 400) {
  return new Promise(resolve => setTimeout(resolve, durationMs))
}

module.exports = {}
