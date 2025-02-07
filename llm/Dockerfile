FROM ubuntu:22.04

# Install dependencies
RUN apt-get update && apt-get install -y \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install Ollama
RUN curl -fsSL https://ollama.com/install.sh | sh

# Expose the Ollama API port
EXPOSE 11434

# Set environment variables for better performance
ENV OLLAMA_HOST=0.0.0.0
ENV OLLAMA_MODELS=/models

# Create a directory for models
RUN mkdir -p /models

# Copy Modelfile and initialization script
COPY Modelfile /models/Modelfile
COPY init.sh /init.sh
RUN chmod +x /init.sh

# Set the default command to our init script
CMD ["/init.sh"]
