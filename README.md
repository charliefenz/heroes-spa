# HeroesApp

The Heroes Management App is a single-page application (SPA) built with Angular version 17.3.6 for managing heroes. It allows users to view, create, edit, and delete heroes. The app features lazy loading for improved performance and utilizes a mock API to mimic CRUD operations on hero data.

## Versions

### V1.1 (current version)
- Minor refactors in several parts of the code
- Fixes bugs
- [shared-comps](#shared-components) V1.1
  - Features the addition of a new component to control 404 messages due to wrong routing.
- [Heroes-Module](#heroes-module) V1.3.2
  - Features layouts adjustments in heroes-list view
  - Features implementation of unsubscribe methods for observable disposal
  - Features compliance on display requirements for hero title in hero container view and in hero list view
- [mock-API](#mock-api-service) V1.0.1
  - Minor refactors in parts of the code

### V1.0
- [shared-comps](#shared-components) V1.0
  - Features the implementation of final layout adjustments.
- [Heroes-Module](#heroes-module) V1.3
  - Features the layout for all the module.
  - Features the extraction of the image in form module into a component in charge of handling its selection 

### V0.6
- [shared-comps](#shared-components) V0.3
  - Features the implementation of angular material into shared components.
- [Heroes-Module](#heroes-module) V1.2
  - Features the integration of the updated shared components into heroes-module. 

### V0.5
- Features angular material setup for other modules and components to use
- [Heroes-Module](#heroes-module) V1.1
  - Integration with shared components to use NBAs, Loaders and embedded-notifications

### V0.4
- [shared-comps](#shared-components) V0.2
  - Features basic layout and behavior for NBA, Loader, and embedded-notification components

### V0.3
- [Heroes-Module](#heroes-module) V1.0
  - Features delete hero integration and filter heroes integration

### V0.2
- [Heroes-Module](#heroes-module) V0.3
  - Features a mobile-first boilerplate UI with basic [route](#routing) configuration
  - Features the development of all components projected to be used by the module
  - Features the development of the service used to communicate with the API
  - Features the integration for creating, editing, and displaying a single hero, as well as displaying the list of heroes  
- [shared-comps](#shared-components) V0.1
  - Features initial behavior for an actionable-pop-up

### V0.1
- [mock-API](#mock-api-service) V1.0
  - Features CRUD operations that should be performed by a hypothetical Heroes API service

## Features

- **Lazy Loading**: Modules are loaded dynamically on demand, reducing initial load time and improving performance.
- **Routing**: Uses router module to display filter .
- **Filtering and Listing Heroes**: Users can filter and view a list of heroes.
- **Creating and Editing Heroes**: Users can create new heroes or edit existing ones using a form interface.
- **Viewing Hero Details**: Detailed information about each hero, including their image and superpowers, can be viewed.
- **Notification System**: Provides real-time feedback to users through notifications for various actions.
- **Mock API**: Mimics CRUD operations on hero data, allowing for seamless interaction without the need for a backend server.
- **Angular Material**: Import of Angular Material Module for UI.
- **SASS**: Use of SASS to ease style sheets organization.

## Routing

- **/heroes**: Filtering landing
- **/heroes/new-hero**: Hero landing for creating a new hero
- **/heroes/hero/${id}**: Hero landing

## Shared Components

Taking advantage of V17 feature of standaole componentes this repository will contain shared components that can be used throughout the app, such as loaders, pop ups and notifications.

- **actionable-pop-up**: Component for displaying an accept/decline pop up.
- **embedded-notification**: Component for displaying notifications within a component.
- **loader**: Component for displaying a loading spinner or indicator.
- **nba**: Component for displaying detached notifications to users.
- **not-found-page**: Component for displaying a not found page.

## Modules

### Heroes Module

Handles features related to heroes, including filtering, listing, creating, editing, and viewing hero details.

#### Components

- **heroes-filter-container**: Component responsible for grouping the rest of filtering components. Includes **heroes-filter**, **heroes-list** and a button for creating heroes.
  - **heroes-filter**: Component responsible for filtering heroes based on heroes names.
  - **heroes-list**: Component for listing heroes.
    - **heroes-item**: Component for displaying a single hero within a list of heroes.
      - **heroes-actions**: Component containing actions such as delete or view more details for a hero displayed in a list of heroes.
- **hero-container**: Component container of heroes-form.
  - **hero-form**: Component for creating or editing a hero using a form interface.
    - **image-input-dialog**: Component for generating the dialog to input the image.

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
|   │   │   ├── actionable-pop-up/
|   │   │   ├── embedded-notification/
|   │   │   ├── loader/
|   │   │   ├── nba/
|   │   │   └── not-found-page/
|   │   ├── styles/
|   │   │   └── variables.scss
|   ├── modules/
|   │   ├── heroes/
|   │   │   ├── components/
|   │   │   │   ├── hero-container/
|   │   │   │   ├── hero-form/
|   │   │   │   ├── heroes-actions/
|   │   │   │   ├── heroes-filter/
|   │   │   │   ├── heroes-filter-container/
|   │   │   │   ├── heroes-item/
|   │   │   │   ├── heroes-list/
|   │   │   │   └── image-input-dialog/
|   │   │   ├── services/
|   │   │   │   └── heroes.service.ts
|   │   │   ├── heroes.module.ts
|   ├── models/
│   │   ├── hero.ts
│   │   ├── nbaInput.ts
│   │   └── response.ts
|   ├── mock-API/
|   |   └── mock-API.service.ts
```

## Installation and Usage

1. Clone the repository: `git clone https://github.com/your/repository.git`
2. Install dependencies: `npm install`
3. Run the development server: `ng serve`

## Testing

### Unit tests: 
Unit tests for components, services, and logic using Jasmine and Karma.

**Disclaimer**
So far, until [V1.1](#v11-current-version), only full unit tests have been incorporated to mock-api-service since is the only part of the application that seeks to mimic outsider behavior. Thus it was considered to be the more critical part to test-out.
Rest of components have their tests listed and they will be implemented in further releases.

To launch, run ``ng test --include=**/mock-API/**spec**``

## Contributing

Contributions are welcome! Feel free to submit bug reports, feature requests, or pull requests to help improve the app.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Upcoming Features

- Pagination support
- Complete unit tests for rest of components
- Integration tests
- Notifications module with notifications service to handle notifications queue