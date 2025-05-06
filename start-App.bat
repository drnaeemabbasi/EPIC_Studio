@echo off

:: Check if npm is installed
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo npm is not installed. Installing npm...
    :: Optionally, install npm here (if it's not installed)
    :: You can use a package manager like Chocolatey to install it
    :: choco install nodejs-lts
    pause
    exit /b
)

:: Navigate to frontend and check if npm packages are installed, then start the frontend server
cd /d "%~dp0front-end"
if not exist "node_modules" (
    echo Frontend dependencies not found. Running npm install...
    npm install
    start cmd /k "npm start"

    :: Navigate to backend and check if npm packages are installed, then start the backend server
    cd /d "%~dp0backend"
    if not exist "node_modules" (
        echo Backend dependencies not found. Running npm install...
        npm install
    )
    
    start cmd /k "npm run dev"

)


start cmd /k "npm start"

:: Navigate to backend and check if npm packages are installed, then start the backend server
cd /d "%~dp0backend"
if not exist "node_modules" (
    echo Backend dependencies not found. Running npm install...
    npm install
)
start cmd /k "npm run dev"

pause
