@ECHO off
TITLE Bastion BOT
CLS
COLOR 0F
ECHO.

SET cwd=%~dp0

ECHO [Bastion]: Checking System...
IF EXIST bastion.js (
  ECHO [Bastion]: System Checked. O7. Booting up...
  node bastion.js
) ELSE (
  TITLE [ERROR] System Check Failed
  ECHO [Bastion]: System check failed. Check if you Bastion BOT installed correctly.
  GOTO :EXIT
)
ECHO.

EXIT /B 0

:EXIT
ECHO.
ECHO [Bastion]: Press any key to exit.
PAUSE >nul 2>&1
CD /D "%cwd%"
TITLE Windows Command Prompt (CMD)
COLOR
