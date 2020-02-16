![TouchStadia logo](/img/ts-128.png?raw=true "TouchStadia logo")
# TouchStadia
TouchStadia is a Chrome Extension which adds on-screen joystick control to Stadia for touchscreen devices!

## Demo
[![Demo video](https://img.youtube.com/vi/AmnuVkkQBu4/0.jpg)](https://www.youtube.com/watch?v=AmnuVkkQBu4)

## Installation
TouchStadia will be available on the Chrome Web Store (pending review!) You can also download this repository and load it as an unpacked extension.

### Loading as an unpacked extension
1. Click the green "Clone or download" button near the top of this page, then click "Download ZIP".
2. Extract the contents of this ZIP file into a folder named "TouchStadia" somewhere on your PC.
3. Type `chrome://extensions` into the Chrome address bar (omnibox) and hit ENTER.
4. Activate "Developer mode" in the top right, and click "Load unpacked".
5. Navigate to the "TouchStadia" folder created earlier, and select that folder!

Keep in mind that if you install the extension this way, you will not get updates for TouchStadia. You will need to repeat this process to update your extension. It is preferred that you use the Chrome Web Store version.

## Known issues
* Starting games (aside from the top jumbotron game) requires disabling TouchStadia from the options, launching the game, then re-enabling TouchStadia. ([#5](https://github.com/ihatecsv/TouchStadia/issues/5))
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
