@echo off
title EPIC Studio Launcher
echo ============================================
echo           EPIC Studio - Launching...
echo ============================================
echo.

:: Set the app root to wherever this batch file lives
cd /d "%~dp0"

:: ---- Node.js Detection ----
:: First check if npm is available system-wide
where npm >nul 2>nul
if %errorlevel% equ 0 (
    echo [OK] Node.js found in system PATH.
    goto :dependencies
)

:: Check if we already have a local portable copy
if exist "%~dp0node\npm.cmd" (
    echo [OK] Using local portable Node.js.
    set "PATH=%~dp0node;%PATH%"
    goto :dependencies
)

:: ---- Auto-Install Portable Node.js ----
echo Node.js not found. Downloading portable version...
echo This is a one-time setup and may take a few minutes.
echo.

set "NODE_VERSION=v20.18.1"
set "NODE_ARCH=win-x64"
set "NODE_ZIP=node-%NODE_VERSION%-%NODE_ARCH%.zip"
set "NODE_URL=https://nodejs.org/dist/%NODE_VERSION%/%NODE_ZIP%"
set "NODE_DIR=node-%NODE_VERSION%-%NODE_ARCH%"

:: Download using PowerShell
echo [1/3] Downloading Node.js %NODE_VERSION%...
powershell -Command "try { [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri '%NODE_URL%' -OutFile '%NODE_ZIP%' -UseBasicParsing } catch { Write-Host 'DOWNLOAD FAILED:' $_.Exception.Message; exit 1 }"
if %errorlevel% neq 0 (
    echo.
    echo ERROR: Failed to download Node.js.
    echo Please check your internet connection and try again,
    echo or install Node.js manually from https://nodejs.org
    pause
    exit /b
)

:: Extract using PowerShell
echo [2/3] Extracting Node.js...
powershell -Command "try { Expand-Archive -Path '%NODE_ZIP%' -DestinationPath '.' -Force } catch { Write-Host 'EXTRACTION FAILED:' $_.Exception.Message; exit 1 }"
if %errorlevel% neq 0 (
    echo ERROR: Failed to extract Node.js.
    pause
    exit /b
)

:: Rename to a clean folder name and clean up
echo [3/3] Configuring...
if exist "node" rmdir /s /q "node"
rename "%NODE_DIR%" "node"
del /q "%NODE_ZIP%" 2>nul

:: Add to session PATH
set "PATH=%~dp0node;%PATH%"

:: Verify it worked
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: Node.js installation failed.
    echo Please install Node.js manually from https://nodejs.org
    pause
    exit /b
)
echo [OK] Node.js installed successfully.
echo.

:: ---- Install Dependencies ----
:dependencies

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

:: ---- Launch ----
echo.
echo Starting EPIC Studio...
cd /d "%~dp0"
start "" ".\node_modules\electron\dist\electron.exe" .
exit