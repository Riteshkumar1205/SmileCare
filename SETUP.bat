@echo off
REM SmileCare - AI Dental Health Platform Setup Script for Windows

echo.
echo ====================================
echo  SmileCare - Setup Initialization
echo ====================================
echo.

REM Check Node.js
echo Checking Node.js installation...
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Error: Node.js is not installed. Please install Node.js 16+ from https://nodejs.org/
    exit /b 1
)
for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo OK: Node.js found: %NODE_VERSION%

REM Check Python
echo Checking Python installation...
where python >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Error: Python 3 is not installed. Please install Python 3.8+ from https://python.org/
    exit /b 1
)
for /f "tokens=*" %%i in ('python --version') do set PYTHON_VERSION=%%i
echo OK: Python found: %PYTHON_VERSION%

REM Install Node dependencies
echo.
echo Installing Node.js dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo Error installing Node dependencies
    exit /b 1
)
echo OK: Node dependencies installed

REM Setup ML Service
echo.
echo Setting up ML Service...

if not exist "ml_service\venv" (
    echo Creating Python virtual environment...
    cd ml_service
    python -m venv venv
    
    echo Activating virtual environment...
    call venv\Scripts\activate.bat
    
    echo Installing Python dependencies...
    python -m pip install --upgrade pip
    pip install -r requirements.txt
    
    cd ..
) else (
    echo OK: Python virtual environment already exists
)

REM Create environment files
echo.
echo Setting up environment configuration...

if not exist ".env" (
    echo Creating .env file...
    (
        echo KAGGLE_USERNAME=your_kaggle_username
        echo KAGGLE_KEY=your_kaggle_api_key
        echo ML_SERVICE_URL=http://localhost:5000
        echo NODE_ENV=development
        echo PING_MESSAGE=pong
    ) > .env
    echo WARNING: Created .env - Please update with your Kaggle credentials
) else (
    echo OK: .env file already exists
)

if not exist "ml_service\.env" (
    echo Creating ml_service\.env file...
    (
        echo KAGGLE_USERNAME=your_kaggle_username
        echo KAGGLE_KEY=your_kaggle_api_key
        echo FLASK_ENV=development
        echo FLASK_PORT=5000
        echo MODEL_PATH=.\models\teeth_disease_model.h5
        echo ACCURACY_THRESHOLD=0.75
    ) > ml_service\.env
    echo WARNING: Created ml_service\.env - Please update with your Kaggle credentials
) else (
    echo OK: ml_service\.env file already exists
)

REM Create necessary directories
echo.
echo Creating necessary directories...
if not exist "ml_service\models" mkdir ml_service\models
if not exist "ml_service\data" mkdir ml_service\data
if not exist "logs" mkdir logs
echo OK: Directories created

REM Summary
echo.
echo ======================================
echo  Setup Complete!
echo ======================================
echo.
echo Next steps:
echo.
echo 1. Update Kaggle credentials in .env files:
echo    - .env (root directory^)
echo    - ml_service\.env
echo.
echo 2. Start ML Service (in one terminal^):
echo    cd ml_service
echo    venv\Scripts\activate
echo    python app.py
echo.
echo 3. Start Application (in another terminal^):
echo    npm run dev
echo.
echo 4. Open browser:
echo    http://localhost:5173
echo.
echo For detailed instructions, see QUICK_START.md
echo.
pause
