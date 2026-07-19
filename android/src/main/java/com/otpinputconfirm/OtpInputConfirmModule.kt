package com.otpinputconfirm

import com.facebook.react.bridge.ReactApplicationContext

class OtpInputConfirmModule(reactContext: ReactApplicationContext) :
  NativeOtpInputConfirmSpec(reactContext) {

  override fun multiply(a: Double, b: Double): Double {
    return a * b
  }

  companion object {
    const val NAME = NativeOtpInputConfirmSpec.NAME
  }
}
