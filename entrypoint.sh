#!/bin/sh

if [ -d "node_modules" ]; then
  echo "Node modules already installed"
else
  echo "Installing node modules"
  npm install
fi

npm run dev