![TouchStadia logo](/img/ts-128.png?raw=true "TouchStadia logo")
# TouchStadia
[![TouchStadia in Chrome Web Store](https://developer.chrome.com/webstore/images/ChromeWebStore_Badge_v2_206x58.png)](https://chrome.google.com/webstore/detail/touchstadia/kdkboloommjpbahkdlhengbghlhcejaj)

TouchStadia is a Chrome Extension which adds on-screen joystick control to Stadia for touchscreen devices!

## Demo
[![Demo video](https://img.youtube.com/vi/AmnuVkkQBu4/0.jpg)](https://www.youtube.com/watch?v=AmnuVkkQBu4)

## Known issues
* General latency issues. Optimizations are being worked on!

## Testing
TouchStadia also has manifest permissions to run on [html5gamepad.com](https://html5gamepad.com), where you can test the input of the controller with visual feedback! This is useful if you'd rather not wait for a game to open!

## Regarding mobile devices
As of right now, [sigmaxipi/chromium-for-stadia](https://github.com/sigmaxipi/chromium-for-stadia) is the only way to play Stadia on Android, aside from the native application. Unfortunately, Chrome/Chromium for Android does not support extensions. I'm looking into a way to integrate TouchStadia into a custom build of Chromium so it can be used on mobile devices. There may also be other ways to accomplish this. If you have leads on how to go about doing this, please feel free to comment in [this issue!](https://github.com/ihatecsv/TouchStadia/issues/2)

## Pull requests
All pull requests are welcome! Please feel free to improve TouchStadia as you see fit, there's many improvements to be made!

## Credits
* Thanks to `/u/revnort` for creating the amazing vector images used for the on-screen buttons and sticks!
* Thanks to `/u/-sxp-` for creating the [controller mapping fix code snippet](https://www.reddit.com/r/Stadia/comments/f0zir0/its_almost_happening/fh209gm/) that inspired this extension!
