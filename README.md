![TouchStadia logo](/img/ts-128.png?raw=true "TouchStadia logo")
# TouchStadia
[![TouchStadia in Chrome Web Store](https://developer.chrome.com/webstore/images/ChromeWebStore_Badge_v2_206x58.png)](https://chrome.google.com/webstore/detail/touchstadia/kdkboloommjpbahkdlhengbghlhcejaj)

TouchStadia is a Chrome Extension and JavaScript snippet which adds on-screen joystick control to Stadia for touchscreen devices!

Articles: [The Verge](https://www.theverge.com/2020/2/24/21150914/google-stadia-touchstadia-android-phone-hack), [Android Central](https://www.androidcentral.com/add-touchscreen-controller-stadia-using-touchstadia), [9to5Google](https://9to5google.com/2020/02/24/indie-stadia-on-screen-controls/), [XDA Developers](https://www.xda-developers.com/touchstadia-use-on-screen-controls-google-stadia-chrome-android/), [Android Police](https://www.androidpolice.com/2020/02/24/touchstadia-hack-brings-stadia-the-touchscreen-controls-you-never-wanted/), [Android Headlines](https://www.androidheadlines.com/2020/02/this-tool-adds-touchscreen-controls-to-your-stadia-experience.html), [Stadia Source](https://stadiasource.com/article/375/TouchStadia-Adds-Mobile-Support)

## Demo
[![Demo video](https://img.youtube.com/vi/oUlDxbS5smY/0.jpg)](https://www.youtube.com/watch?v=oUlDxbS5smY)

## Usage
### Android
Chrome for Android does not support extensions, so we must load TouchStadia into the browser manually! Here's a [tutorial video](https://www.youtube.com/watch?v=vsdJNM9N4Dk) you can use to supplement the instructions below.
1. Open the [snippet URL](https://drakeluce.com/projects/TouchStadia/) on your phone in Chrome (this works on regular Chrome). I recommend going to the link every time as updates will only be available there.
2. Select all the text in the box, and copy it.
3. Open Stadia and make sure to select the "Desktop site" option so it launches properly.
4. Once Stadia is open, tap the address bar and type <kbd>javascript:</kbd>. Paste the text you copied immediately after the colon, without any spaces between. You must **type** <kbd>javascript:</kbd>, as Chrome will remove it if you try to paste it in.
5. Hit the ENTER key on your keyboard. Stadia should recognise that a joystick was connected.
6. Enjoy! You must repeat this procedure if you or your browser closes or refreshes Stadia.

### Desktop
Simply [install the extension](https://chrome.google.com/webstore/detail/touchstadia/kdkboloommjpbahkdlhengbghlhcejaj) and open or refresh Stadia! Click the extension icon to show configuration options.

To move buttons around, press <kbd>CTRL</kbd>+<kbd>;</kbd> in Stadia and layout mode will be activated (indicated by a magenta background.) Tap/click and drag buttons to change their positions during this time. Press <kbd>CTRL</kbd>+<kbd>;</kbd> again to disable layout mode. This hotkey will not work when Stadia is in-game. This is a [known issue](https://github.com/ihatecsv/TouchStadia/issues/9), so to ensure function please only use this shortcut outside of games for now. Layout mode is only supported on desktop currently.

Keep in mind that once you change the position of a button in layout mode, that button will no longer move relative to the window border when resizing your browser, so you must maintain the same browser window size for the layout to look consistent. If you create a layout, then shrink your browser, it's possible to lose buttons outside the visible area! To reset the layout, press the `Reset` button in the TouchStadia configuration.

## Testing
TouchStadia also has manifest permissions to run on [html5gamepad.com](https://html5gamepad.com), where you can test the input of the controller with visual feedback! This is useful if you'd rather not wait for a game to open!

## Pull requests
All pull requests are welcome! Please feel free to improve TouchStadia as you see fit, there's many improvements to be made!

## Credits
* Thanks to `/u/revnort` for creating the amazing vector images used for the on-screen buttons and sticks!
* Thanks to `/u/-sxp-` for creating the [controller mapping fix code snippet](https://www.reddit.com/r/Stadia/comments/f0zir0/its_almost_happening/fh209gm/) that inspired this extension!
