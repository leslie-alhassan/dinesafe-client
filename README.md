# Project Title

DineSafe

## Overview

"DineSafe is Toronto Public Health’s food safety program that inspects all establishments serving and preparing food.
Each inspection results in a pass, a conditional pass or a closed notice." - City of Toronto Open Data.

My project aims to provide a feasible and intuitive way for others to access and interact with this data.

### Features

- Explore nearby establishments
- Search for establishment by name, address or status
- Leave comments on page
- Get live location of establishment on map
- Submit complaints to Toronto Public Health
- Recent searches for signed-in users

## Implementation

### Tech Stack

React.js, Node.js, Express.js, Knex.js, MySQL, Vite, Sass

### APIs

Google Maps API,
Toronto Open Data

### Data

- #### Establishments Table

  - Name, Address, Lat, Lng, Current Status

- #### Inspection Details Table

  - Establishment Id, Inspection Date, Infraction Details, Severity, Inspection Status, Action, Outcome

- #### Users Table

  - Username, Email, Password, Bio

- #### Comments Table

  - EstablishmentId, UserId, Username, Comment

### Auth

Client side/Server side authentication using JWT

## Roadmap

- ### SPRINT ONE

  - Complete all features
  - Deploy app

- ### SPRINT TWO

  - Implement OAuth
  - Additional establishment details like hours of operation, menu, and images of establishment and food they sell
  - Allow users to leave reviews, "like/dislike" other user reviews
  - Get directions to establishments

- ### SPRINT THREE

  - Allow user's to communicate through threads

## Nice-to-haves

- OAuth authentication
- Additional establishment details like hours of operation, menu, and images of establishment and food they sell
- Allow users to leave reviews, "like/dislike" other user reviews
