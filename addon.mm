#include "napi.h"

#include <AVFoundation/AVFoundation.h>

API_AVAILABLE(macos(10.14))
Napi::String GetAuthorizationStatus(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  if (info.Length() != 1 || !info[0].IsBoolean()) {
    Napi::Error::New(info.Env(), "Missing isVideo argument")
        .ThrowAsJavaScriptException();
    return Napi::String();
  }

  bool is_video = info[0].As<Napi::Boolean>().Value();

  AVMediaType media_type = is_video ? AVMediaTypeVideo : AVMediaTypeAudio;
  AVAuthorizationStatus status =
      [AVCaptureDevice authorizationStatusForMediaType:media_type];

  switch (status) {
    case AVAuthorizationStatusRestricted:
      return Napi::String::New(env, "restricted");
    case AVAuthorizationStatusDenied:
      return Napi::String::New(env, "denied");
    case AVAuthorizationStatusAuthorized:
      return Napi::String::New(env, "authorized");
    case AVAuthorizationStatusNotDetermined:
    default:
      return Napi::String::New(env, "notDetermined");
  }
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  if (@available(macos 10.14, *)) {
    exports.Set(Napi::String::New(env, "getAuthorizationStatus"),
                Napi::Function::New(env, GetAuthorizationStatus));
  }
  return exports;
}

NODE_API_MODULE(mac - av - permissions, Init)
