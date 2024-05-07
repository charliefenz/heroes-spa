# HeroesApp

The Heroes Management App is a single-page application (SPA) built with Angular version 17.3.6 for managing heroes. It allows users to view, create, edit, and delete heroes. The app features lazy loading for improved performance and utilizes a mock API to mimic CRUD operations on hero data.

## Features

- **Lazy Loading**: Modules are loaded dynamically on demand, reducing initial load time and improving performance.
- **Routing**: Uses router module to display filter .
- **Filtering and Listing Heroes**: Users can filter and view a list of heroes.
- **Creating and Editing Heroes**: Users can create new heroes or edit existing ones using a form interface.
- **Viewing Hero Details**: Detailed information about each hero, including their image and superpowers, can be viewed.
- **Notification System**: Provides real-time feedback to users through notifications for various actions.
- **Mock API**: Mimics CRUD operations on hero data, allowing for seamless interaction without the need for a backend server.

## Routing

- **/heroes**: Filtering landing
- **/heroes/new-hero**: Hero landing for creating a new hero
- **/heroes/hero/${id}**: Hero landing

## Shared Components

Taking advantage of V17 feature of standaole componentes this repository will contain shared components that can be used throughout the app, such as loaders, pop ups and notifications.

- **confirmation-pop-up**: Component for displaying an accept/decline pop up.
- **loader**: Component for displaying a loading spinner or indicator.
- **nba**: Component for notifications to users.

## Modules

### Heroes Module

Handles features related to heroes, including filtering, listing, creating, editing, and viewing hero details.

#### Components

- **heroes-filter-container**: Component responsible for grouping the rest of filtering components. Includes **heroes-filter**, **heroes-list** and a button for creating heroes.
  - **heroes-filter**: Component responsible for filtering heroes based on heroes names.
  - **heroes-list**: Component for listing heroes.
    - **heroes-item**: Component for displaying a single hero within a list of heroes.
      - **heroes-actions**: Component containing actions such as edit, delete, or view more details for a hero displayed in a list of heroes.
- **hero-container**: Component container of heroes-form.
  - **hero-form**: Component for creating or editing a hero using a form interface.

#### Services

- **heroes.service.ts**: Service responsible for handling interactions with the mock API, including CRUD operations on hero data.

## Mock API Service

Although some Hero API exist (i.e. [Super Hero API](https://superheroapi.com/)), not one could be found that provides functionality to perform PUT, POST, or DELETE requests. That is why mocking an API through a service has been thought to be the correct approach for this project.

This service provides functionality to mimic CRUD operations on hero data, allowing the simulation of seamless interaction without actual interaction with a backend server. It stores a private object to mock a JSON file that holds the responses of a Hero API. Then, it constructs the observables with random timeouts that can be consumed anytime by the front-end app.

## Directory Structure

```
src/
├── app/
|   ├── shared/
|   │   ├── components/
|   │   │   ├── confirmation-pop-up/
|   │   │   ├── loader/
|   │   │   └── nba/
|   ├── modules/
|   │   ├── heroes/
|   │   │   ├── components/
|   │   │   │   ├── heroes-actions/
|   │   │   │   ├── heroes-creation/
|   │   │   │   ├── hero-container/
|   │   │   │   ├── heroes-filter/
|   │   │   │   ├── heroes-filter-container/
|   │   │   │   ├── hero-form/
|   │   │   │   ├── heroes-item/
|   │   │   │   └── heroes-list/
|   │   │   ├── services/
|   │   │   │   └── heroes.service.ts
|   │   │   ├── heroes.module.ts
|   ├── assets/
|   │   ├── images/
|   │   ├── icons/
|   ├── models/
│   │   ├── hero.ts
│   │   └── response.ts
|   ├── mock-API/
|   |   └── mock-API.service.ts
```

## Installation and Usage

1. Clone the repository: `git clone https://github.com/your/repository.git`
2. Install dependencies: `npm install`
3. Run the development server: `ng serve`

## Testing

- **Unit Testing**: Unit tests for components, services, and logic using Jasmine and Karma.

## Contributing

Contributions are welcome! Feel free to submit bug reports, feature requests, or pull requests to help improve the app.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Upcoming Features

- Pagination support
- Integration tests