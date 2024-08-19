# Holo Mentor App

Holo Mentor web application. Build with `React.Js` with `Client-Server` architecture model.

### Prerequisite

Create `.env` file in the root of the project

```env
# the role is optional. To have proper logins, ignore this env variable
VITE_TEMP_ROLE=STUDENT
VITE_API_URL=http://localhost:8080/api/v1
```

## Naming Conventions

| Type      | Convention  | Example     |
| --------- | ----------- | ----------- |
| File      | Kebab Case  | my-file.tsx |
| Class     | Pascal Case | MyFile      |
| Functions | Camel Case  | myFunction  |
| Variable  | Camel Case  | myVariable  |

## Prerequisites

Make sure you have the following prerequisites installed:

-   Node.js version 18 or higher
-   Docker

# Branch Naming Conventions

All branch descriptors should be in lowercase and separated by hyphens.

## Main Branch

-   Convention: Named simply as "main".
-   Description: The main branch contains production-ready code and serves as the primary branch for release deployments.

## Development Branch (DEV)

-   Convention: Prefixed with "dev/" followed by a brief descriptor.
-   Description: The development branch, labeled with the "DEV" prefix, is where ongoing work and feature development take place. It serves as the basis for creating feature branches.

## Feature Branches

-   Convention: Prefixed with "feat/" followed by a brief descriptor.
-   Description: Feature branches are created for implementing new features or enhancements in the project. They are based on the development branch.

## Bug Fix Branches

-   Convention: Prefixed with "fix/" followed by a brief descriptor.
-   Description: Bug-fix branches are used to address specific issues or bugs in the project. They are based on the development branch.

## Version Branches

-   Convention: Prefixed with "vX/" followed by a brief descriptor.
-   Description: Version branches are used to manage different versions of the project. They include main, stagging, and development branches for each version, facilitating version-specific development and maintenance.

## Example Branches

-   Main: `main`
-   Development: `dev`
-   Feature Branch: `feat/new-feature`
-   Bug Fix Branch: `fix/issue-fix`
-   Version 1 Main: `v1/main`

## Usage

1. Clone the repository with the below code.

```bash
git clone https://github.com/senunn/holo-mentor-app.git
```

2. Install dependencies.

```bash
yarn install
```

3. Setup `.env` file (check `.env.sample`)

4. Start application

```bash
yarn dev

# on docker
yarn docker:up
```

5. Visit `http://localhost:3000`.

## Development

**Do Not Push to the `main` branch at once.**

1. Create a new branch for development

```bash
git checkout -b dev/{{yourname}}
```

2. Stage the files

```bash
git add .
```

3. Commit the files

```bash
git commit -m "{{message}}"
```

4. Push the update

```bash
git push origin dev/{{yourname}}
```

# Resources

### Icons

```http
https://heroicons.com/solid
```

### Components

**Hyper UI**

```http
https://www.hyperui.dev/
```

**Next UI**

```http
https://nextui.org/docs/components/avatar
```

### CSS

**Tailwind CSS**

```http
https://tailwindcss.com/docs/installation
```
