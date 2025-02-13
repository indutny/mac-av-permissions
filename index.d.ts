/**
 * If `true` - macOS permission query not supported on this system
 */
export const isSupported: boolean;

/**
 * See: https://developer.apple.com/documentation/avfoundation/avauthorizationstatus
 */
export type AuthorizationStatus =
  | 'notDetermined'
  | 'restricted'
  | 'denied'
  | 'authorized';

export function getVideoAuthorizationStatus(): AuthorizationStatus;
export function getAudioAuthorizationStatus(): AuthorizationStatus;
