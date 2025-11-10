#!/bin/bash

# SmileCare - AI Dental Health Platform Setup Script
# This script initializes the project with all dependencies and configuration

set -e

echo "🦷 SmileCare - Setup Initialization"
echo "======================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_step() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Check Node.js
echo "Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 16+ from https://nodejs.org/"
    exit 1
fi
print_step "Node.js found: $(node --version)"

# Check Python
echo "Checking Python installation..."
if ! command -v python3 &> /dev/null; then
    print_error "Python 3 is not installed. Please install Python 3.8+ from https://python.org/"
    exit 1
fi
print_step "Python found: $(python3 --version)"

# Install Node dependencies
echo ""
echo "Installing Node.js dependencies..."
npm install || pnpm install
print_step "Node dependencies installed"

# Setup ML Service
echo ""
echo "Setting up ML Service..."

if [ ! -d "ml_service/venv" ]; then
    print_step "Creating Python virtual environment..."
    cd ml_service
    python3 -m venv venv
    
    # Activate virtual environment
    if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" ]]; then
        source venv/Scripts/activate
    else
        source venv/bin/activate
    fi
    
    print_step "Installing Python dependencies..."
    pip install --upgrade pip
    pip install -r requirements.txt
    
    cd ..
else
    print_step "Python virtual environment already exists"
fi

# Create environment files
echo ""
echo "Setting up environment configuration..."

if [ ! -f ".env" ]; then
    print_step "Creating .env file..."
    cat > .env << EOF
KAGGLE_USERNAME=your_kaggle_username
KAGGLE_KEY=your_kaggle_api_key
ML_SERVICE_URL=http://localhost:5000
NODE_ENV=development
PING_MESSAGE=pong
EOF
    print_warning "Created .env - Please update with your Kaggle credentials"
else
    print_step ".env file already exists"
fi

if [ ! -f "ml_service/.env" ]; then
    print_step "Creating ml_service/.env file..."
    cat > ml_service/.env << EOF
KAGGLE_USERNAME=your_kaggle_username
KAGGLE_KEY=your_kaggle_api_key
FLASK_ENV=development
FLASK_PORT=5000
MODEL_PATH=./models/teeth_disease_model.h5
ACCURACY_THRESHOLD=0.75
EOF
    print_warning "Created ml_service/.env - Please update with your Kaggle credentials"
else
    print_step "ml_service/.env file already exists"
fi

# Create necessary directories
echo ""
echo "Creating necessary directories..."
mkdir -p ml_service/models
mkdir -p ml_service/data
mkdir -p logs
print_step "Directories created"

# Summary
echo ""
echo "======================================"
echo -e "${GREEN}✓ Setup Complete!${NC}"
echo "======================================"
echo ""
echo "Next steps:"
echo ""
echo "1. Update Kaggle credentials in .env files:"
echo "   - .env (root directory)"
echo "   - ml_service/.env"
echo ""
echo "2. Start ML Service (in one terminal):"
echo "   cd ml_service"
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" ]]; then
    echo "   venv\\Scripts\\activate"
else
    echo "   source venv/bin/activate"
fi
echo "   python app.py"
echo ""
echo "3. Start Application (in another terminal):"
echo "   npm run dev"
echo ""
echo "4. Open browser:"
echo "   http://localhost:5173"
echo ""
echo "For detailed instructions, see QUICK_START.md"
echo ""
