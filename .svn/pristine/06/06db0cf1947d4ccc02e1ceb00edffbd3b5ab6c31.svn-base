@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\..\_chromedriver@2.35.0@chromedriver\bin\chromedriver" %*
) ELSE (
  @SETLOCAL
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node  "%~dp0\..\_chromedriver@2.35.0@chromedriver\bin\chromedriver" %*
)