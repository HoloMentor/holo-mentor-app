# Holo Mentor App

Holo Mentor web application. Build with `React.Js` with `Client-Server` architecture model.

## Naming Conventions

| Type     	| Convention  	| Example     	|
|----------	|-------------	|-------------	|
| File     	| Kebab Case  	| my-file.tsx 	|
| Class    	| Pascal Case 	| MyFile      	|
| Functions | Camel Case 	  | myFunction    |
| Variable 	| Camel Case  	| myVariable 	  |

## Prerequisites

Make sure you have the following prerequisites installed:

- Node.js version 18 or higher
- Docker

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
https://fonts.google.com/icons?selected=Material+Icons
```
