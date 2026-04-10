@echo off
title EPIC Studio - Development Mode
echo ============================================
echo     EPIC Studio - Development Mode
echo ============================================
echo.
echo This launches the live-reload dev servers.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:5000
echo.
echo Press Ctrl+C to stop both servers.
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

:: Install frontend dependencies if needed
cd /d "%~dp0front-end"
if not exist "node_modules" (
    echo Installing frontend dependencies...
    call npm install >nul 2>nul
)

:: Install backend dependencies if needed
cd /d "%~dp0backend"
if not exist "node_modules" (
    echo Installing backend dependencies...
    call npm install >nul 2>nul
)

:: Start both dev servers in the current window using the root dev script
cd /d "%~dp0"
call npm run dev

if %errorlevel% neq 0 (
    echo The dev servers exited with errors.
    pause
)
