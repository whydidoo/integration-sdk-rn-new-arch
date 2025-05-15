plugins {
  alias(libs.plugins.android.application)
  alias(libs.plugins.kotlin.android)
}

android {
  namespace = "com.exness.myapplication"
  compileSdk = 35

  defaultConfig {
    applicationId = "com.exness.myapplication"
    minSdk = 24
    targetSdk = 35
    versionCode = 1
    versionName = "1.0"

    testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
  }

  buildTypes {
    release {
      isMinifyEnabled = false
      proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro")
    }
  }

  packagingOptions {
    pickFirst("lib/arm64-v8a/libreactnative.so")
    pickFirst("lib/armeabi-v7a/libreactnative.so")
    pickFirst("lib/x86_64/libreactnative.so")
    pickFirst("lib/x86/libreactnative.so")

    pickFirst("lib/arm64-v8a/libc++_shared.so")
    pickFirst("lib/armeabi-v7a/libc++_shared.so")
    pickFirst("lib/x86_64/libc++_shared.so")
    pickFirst("lib/x86/libc++_shared.so")

    pickFirst("lib/arm64-v8a/libjsi.so")
    pickFirst("lib/armeabi-v7a/libjsi.so")
    pickFirst("lib/x86_64/libjsi.so")
    pickFirst("lib/x86/libjsi.so")

    pickFirst("lib/arm64-v8a/libfbjni.so")
    pickFirst("lib/armeabi-v7a/libfbjni.so")
    pickFirst("lib/x86_64/libfbjni.so")
    pickFirst("lib/x86/libfbjni.so")

    pickFirst("lib/arm64-v8a/libappmodules.so")
    pickFirst("lib/armeabi-v7a/libappmodules.so")
    pickFirst("lib/x86_64/libappmodules.so")
    pickFirst("lib/x86/libappmodules.so")

    pickFirst("lib/arm64-v8a/libjsctooling.so")
    pickFirst("lib/armeabi-v7a/libjsctooling.so")
    pickFirst("lib/x86_64/libjsctooling.so")
    pickFirst("lib/x86/libjsctooling.so")
  }

  compileOptions {
    sourceCompatibility = JavaVersion.VERSION_17
    targetCompatibility = JavaVersion.VERSION_17
  }
  kotlinOptions {
    jvmTarget = "17"
  }
  buildFeatures {
    viewBinding = true
  }
}

dependencies {
  implementation(fileTree(mapOf("dir" to "libs", "include" to listOf("*.aar"))))
  implementation(libs.androidx.core.ktx)
  implementation(libs.androidx.appcompat)
  implementation(libs.material)
  implementation(libs.androidx.constraintlayout)
  implementation(libs.androidx.navigation.fragment.ktx)
  implementation(libs.androidx.navigation.ui.ktx)
  testImplementation(libs.junit)
  androidTestImplementation(libs.androidx.junit)
  androidTestImplementation(libs.androidx.espresso.core)
  implementation("com.facebook.react:react-android:0.79.2")
  implementation("com.facebook.react:hermes-android:0.79.2")
  implementation("com.google.android.material:material:1.10.0")
}