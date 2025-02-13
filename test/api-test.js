const assert = require('node:assert');

const {
  isSupported,
  getVideoAuthorizationStatus,
  getAudioAuthorizationStatus,
} = require('../');

describe('mac-av-permissions', () => {
  if (process.platform !== 'darwin') {
    it('it should not be supported', () => {
      assert.strictEqual(isSupported, false);
      assert.strictEqual(getAudioAuthorizationStatus(), 'notDetermined');
      assert.strictEqual(getVideoAuthorizationStatus(), 'notDetermined');
    });
    return;
  }

  it('it should be supported', () => {
    assert.strictEqual(isSupported, true);
    assert.strictEqual(typeof getAudioAuthorizationStatus(), 'string');
    assert.strictEqual(typeof getVideoAuthorizationStatus(), 'string');
  });
});
