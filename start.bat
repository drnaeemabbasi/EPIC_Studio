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
    npm install >nul 2>nul

    :: Start the frontend server (hidden)
    start /min cmd /c "npm start"

    :: Navigate to backend and check if npm packages are installed, then start the backend server
    cd /d "%~dp0backend"
    if not exist "node_modules" (
        echo Backend dependencies not found. Running npm install...
        npm install >nul 2>nul
    )


    :: Start the backend server (hidden)
    start /min cmd /c "npm run dev"
)

:: Start the frontend server (hidden)
start /min cmd /c "npm start"

:: Navigate to backend and check if npm packages are installed, then start the backend server
cd /d "%~dp0backend"
if not exist "node_modules" (
    echo Backend dependencies not found. Running npm install...
    npm install >nul 2>nul
)

:: Start the backend server (hidden)
start /min cmd /c "npm run dev"

:: Optional pause to avoid auto-closing (remove if not needed)
pause


@REM wh
@REM QUIT
@REM IMPORT FROM \\apps\sbt\proseries\custom\bulkinvoicing\templates\arsw10_formd.frx TYPE XL8 SHEET ""
@REM CLOSE ALL
@REM REPORT FORM \\apps\sbt\proseries\custom\bulkinvoicing\templates\arsw10_formd.frx


