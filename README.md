# Inventory Tracking App

This is an inventory tracking application built using Node. All of the backend code can be found in the `src` directory and the frontend code in the `static` directory.
The list of various endpoints can be found in the [endpoints.md](./endpoints.md) file.

The live site deployed on heroku can be found here - https://rj-inventory-tracker.herokuapp.com/

## How to Run Locally

Install [docker](https://docs.docker.com/engine/install/) and [docker-compose](https://docs.docker.com/compose/install/) for your particular OS.

Clone this repository and while in the root directory run the following command:

    $ docker-compose up -d

The app should be up on `http://localhost:80/`

## Tech Stack
- **Backend**: Node, Express
- **Database**: MongoDB
- **Frontend**: Vanilla HTML, CSS and Javascript

**Note**: Since this is a majorly backend focussed application, code for the frontend is a bit "hacky"
