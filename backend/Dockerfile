# Use an official Python runtime as a parent image
FROM python:3.10.16

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV FLASK_APP=app.py
# Need this to fix annoying bug https://github.com/explosion/cython-blis/issues/117
ENV BLIS_ARCH=generic

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file and install dependencies
COPY requirements.txt .
COPY run.py .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 8779

# Run the Flask app
CMD ["python", "run.py"]

