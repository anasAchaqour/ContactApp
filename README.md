# Contacts App

This is a simple CRUD application for managing contacts built using Spring Boot and React with Axios for API requests. The application supports basic CRUD operations and allows you to manage contacts, including adding, updating, and deleting contacts. Each contact can have a photo associated with it.

## Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Backend: Spring Boot](#backend-spring-boot)
- [Frontend: React](#frontend-react)
- [How to Run](#how-to-run)
- [License](#license)

## Overview

This application is designed to help you manage contacts in a simple and efficient manner. The application includes the following features:

- Add, update, and delete contacts
- Upload photos for contacts

## Project Structure

The project consists of two main folders:

- **contactapi:** This folder contains the backend code using Spring Boot.
- **contactapp:** This folder contains the frontend code using React.

## Backend: Spring Boot

The backend is implemented using Spring Boot and contains the following components:

- **Entity:** The `Contact` entity represents a contact with the following fields: `id`, `name`, `email`, `title`, `phone`, `address`, `status`, and `photoUrl`.
- **Service:** The `ContactService` class handles CRUD operations for contacts and file upload for photos.
- **Repository:** The `ContactRepo` repository is used for database operations on the `Contact` entity.
- **Constants:** The `Constant` class contains constants used in the application, such as `PHOTO_DIRECTORY`.

### Endpoints

The backend API exposes the following endpoints:

- `GET /contacts`: Get a paginated list of contacts.
- `GET /contacts/{id}`: Get a specific contact by ID.
- `POST /contacts`: Create a new contact.
- `PUT /contacts/{id}`: Update a specific contact by ID.
- `PUT /contacts/{id}/photo`: Upload a photo for a specific contact by ID.
- `DELETE /contacts/{id}`: Delete a specific contact by ID.

## Frontend: React

The frontend is implemented using React and Axios for making API requests. The code contains the following functions:

- **`saveContact(contact)`:** Save a new contact.
- **`getContacts(page = 0, size = 10)`:** Get a paginated list of contacts.
- **`getContact(id)`:** Get a specific contact by ID.
- **`udpateContact(contact)`:** Update a specific contact.
- **`udpatePhoto(formData)`:** Update the photo for a specific contact.
- **`deleteContact(id)`:** Delete a specific contact.

## How to Run

1. **Backend**: Navigate to the `contactapi` folder and start the Spring Boot application using your preferred IDE or by running the following command:

    ```shell
    ./mvnw spring-boot:run
    ```

    Make sure the server is running on port `8080` (default).

2. **Frontend**: Navigate to the `contactapp` folder and start the React application
