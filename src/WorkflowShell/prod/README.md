# Prod Script

This prod command is a wrapper script which handles command line arguments and passes them to an AppleScript, which does the real work. Currently, there are two scripts: 

  - `gettoken` requires your RSA PIN and interacts with the SecurID program to generate a token code.
  - `prodssh` requires a gateway IP (default is regular sphere), a node IP (default is the record util node), your production password, and a token code generated with your token and RSA PIN.

# Important usage notes
Don't push any buttons or interact with your computer while these scripts are running. They interact with the GUI and you may interrupt them. The best result in such a situation would be that the script executes fine. The worst is probably that you somehow end up locked out of your production account and have to call to get it unlocked.

The `prodssh` command REQUIRES iTerm2 v2.9 or later. Go here and make sure you get the beta: https://www.iterm2.com/downloads.html  

As with most macro/GUI script type things, these AppleScripts are pretty fragile. The `gettoken` script may not work at all for you. For instance, some people's SecurID application prompts for a password when the application starts up. Some people's minimizes immediately after generating or after copying the token code. In its current state, the `gettoken` script just isn't complex enough to handle those situations, so you may be better off generating your token codes manually. When it works though, the return value of the command line script is a valid token code which will also be on your clipboard. Pay attention to SecurID. Before proceeding, make sure the token code hasn't rolled over and won't roll over soon. 

Example usage:
```
wsh gettoken 123456
```

The `prodssh` script is a little more robust, but also may fail. I believe I have written it in such a way that it will not fail to login more than once. If it sees something strange or encounters a situation it cannot respond to, it will either hang, or exit with an error. If it appears to hang or stop producing output, switch back to the original tab and use cmd+c to cancel the running process and continue your login manually. Otherwise, you may have an invalid login attempt added to your account. 

Example usage:
```
wsh prodssh -p "passwd123" -t 44579912
# Without defaults: 
wsh prodssh -g some.other.jumpgate.net -n 192.167.1.1 -p "passwd123" -t 44579912
```

# How the AppleScripts work
The AppleScript in `GetToken.scpt` is pretty straightforward. It kills SecurID if it's open, reopens it, enters your PIN into the field, presses enter, then tabs over to the "copy" button and presses spacebar. It saves the contents of the clipboard to a variable, then returns that. If your SecurID behaves weirdly (prompts for a password, unexpectedly minimizes) this script may not fully work. 

The AppleScript in `ProdSSHWithClipboard.scpt` uses the AppleScript library/API available in iTerm2 to do a few things. It first opens up a new tab and sends text to tell the tab to connect to the desired 2-factor authentication gateway. After that, it starts polling the terminal contents by copying all of the text to the clip board and searching through it for various strings/prompts. When prompted, it enters password, token, SSHes into the util node, and enters the password again. 