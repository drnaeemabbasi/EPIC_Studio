@echo off
title EPIC Studio Launcher
echo ============================================
echo           EPIC Studio - Launching...
echo ============================================
echo.

:: Check if npm is installed
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: npm is not installed.
    echo Please install Node.js from https://nodejs.org
    pause
    exit /b
)

:: Install root dependencies (Electron) if needed
cd /d "%~dp0"
if not exist "node_modules" (
    echo [1/4] Installing Electron...
    call npm install >nul 2>nul
)

:: Install frontend dependencies if needed
cd /d "%~dp0front-end"
if not exist "node_modules" (
    echo [2/4] Installing frontend dependencies...
    call npm install >nul 2>nul
)

:: Build the frontend if no build exists
if not exist "build" (
    echo [3/4] Building frontend... (this may take a minute)
    call npx react-scripts build >nul 2>nul
)

:: Install backend dependencies if needed
cd /d "%~dp0backend"
if not exist "node_modules" (
    echo [4/4] Installing backend dependencies...
    call npm install >nul 2>nul
)

:: Launch Electron directly using its EXE to avoid "Open With" dialogs
echo.
echo Starting EPIC Studio...
cd /d "%~dp0"
start "" ".\node_modules\electron\dist\electron.exe" .
exit
