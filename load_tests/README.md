# Load Tests
The load tests for the API are written in Python 3 using the [Locust](https://locust.io/) framework.

## Requirements
* [Python 3](https://www.python.org/)

## Quickstart
From the root directory:
* Start the API server - `cd api && npm install && npm start`
* Go into the "**load_tests**" directory - `cd load_tests`
* Create virtual environment - `python3 -m venv venv`
  * On some linux distributions, you may need to download venv, for example: `sudo apt install python3.8-venv`
* Activate the virtual environment:
  * On unix systems such as MacOS and Linux: `source venv/bin/activate`
  * On Windows: `call venv/scripts/activate.bat`
* Install the locust package: `pip3 install locust`

To start the web interface, after you have
activated the virtual environment, run the shell/bat file `run.sh`, and go to http://localhost:8089. The fields can be
edited for specific testing requirements.

You can stop the test by clicking on the "**stop**" button on the web interface.

> Note: The API needs to be running locally for the load tests to run.
