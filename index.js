exports.isSupported = false;
exports.getVideoAuthorizationStatus = () => 'notDetermined';
exports.getAudioAuthorizationStatus = () => 'notDetermined';

try {
  const { getAuthorizationStatus } = require('bindings')('mac-av-permissions');

  if (getAuthorizationStatus) {
    exports.getVideoAuthorizationStatus = () => getAuthorizationStatus(true);
    exports.getAudioAuthorizationStatus = () => getAuthorizationStatus(false);
    exports.isSupported = true;
  }
} catch {
  // Windows, Linux
}
