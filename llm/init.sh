#!/bin/bash

echo "Starting Ollama..."
# Start Ollama in the background
ollama serve &
OLLAMA_PID=$!

# Check if Ollama process is running
if ps -p $OLLAMA_PID > /dev/null; then
    echo "Ollama process started with PID: $OLLAMA_PID"
else
    echo "Failed to start Ollama"
    exit 1
fi

# Wait for Ollama to start
echo "Waiting for Ollama API to become available..."
ATTEMPTS=0
MAX_ATTEMPTS=30  # 1 minute timeout
until curl -s -f http://localhost:11434/api/tags >/dev/null 2>&1; do
    ATTEMPTS=$((ATTEMPTS + 1))
    if [ $ATTEMPTS -ge $MAX_ATTEMPTS ]; then
        echo "Timeout waiting for Ollama API"
        exit 1
    fi
    echo "Attempt $ATTEMPTS: Waiting for Ollama API..."
    sleep 2
done
echo "Ollama API is running"

# Pull the Phi model
echo "Pulling Phi model..."
curl -X POST http://localhost:11434/api/pull \
    -H "Content-Type: application/json" \
    -d '{"name": "phi"}'

# Keep the container running and monitor Ollama process
while true; do
    if ! ps -p $OLLAMA_PID > /dev/null; then
        echo "Ollama process died"
        exit 1
    fi
    sleep 10
done
