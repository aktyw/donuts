
# Donuts - Tasks and notes manager

Donuts is a simple and intuitive application that allows users to easily manage their tasks and notes. The application is heavily inspired by Todoist and Google Keep.

## Live 

[Check Donuts App Live](https://donuts-manager.netlify.app/)

## Technologies

TypeScript, Vue (Composition API, Pinia, Vue Router, VueUse, Vuelidate, VueDatePicker, VueDraggable), Vite, Firebase, Tailwind, DaisyUI, GSAP, Chart.js, ESLint, Prettier, and more.

## General

The list of functionalities is extensive. The application allows for advanced task, project, and note management. The application has over 200 components and approximately 15,000 lines of code.

Current version is 0.6.1


## Screenshots

![Tasks](./public/ss-01.png?raw=true)
![Stats](./public/ss-02.png?raw=true)
![Settings mobile](./public/ss-03.png?raw=true)
![Task view with connected note](./public/ss-04.png?raw=true)
![Menu](./public/ss-05.png?raw=true)
![Activity logs](./public/ss-06.png?raw=true)
![Dark mode](./public/ss-07.png?raw=true)
![Note tiles](./public/ss-08.png?raw=true)


## Features

The application allows for adding, deleting, editing, duplicating, prioritizing, selecting dates, and moving tasks between projects. It also enables linking notes to tasks and offers various other features. The application allows for an unlimited number of subtasks, which can work recursively. Tasks can be grouped into projects, which can be duplicated, deleted, and archived. Additionally, Donuts offers a considerable number of settings, such as changing email and password, setting daily and weekly goals, and advanced theme settings.

The note module provides an extensive editor. Notes can be saved as colored tiles and their positions can be freely changed using the "Drag and Drop" functionality.

The application is accessible and allows for keyboard navigation.

Furthermore, I have implemented a notification system, activity log tracking, quick tasks, statistics and achievements, a login panel, authorization support with proper error handling, local storage, rwd and many more features.
## Run Locally



Clone the project

```bash
  git clone https://github.com/aktyw/donuts.git
```

Go to the project directory

```bash
  cd donuts
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev-m
```


## Environment Variables

If you want to run this project, you will need to add the following environment variables from Firebase to your .env file

  `VITE_FIREBASE_API_KEY`
  `VITE_FIREBASE_AUTH_DOMAIN`
  `VITE_FIREBASE_PROJECT_ID`
  `VITE_FIREBASE_STORAGE_BUCKET`
  `VITE_FIREBASE_MESSAGING_SENDER_ID`
  `VITE_FIREBASE_APP_ID`
  `VITE_FIREBASE_MEASUREMENT_ID`

You can use .env.example for that.
## Roadmap

- Firestore support

- Tests

- Drag and drop for tasks

- Kanban view

- Focus timer

- Tags

