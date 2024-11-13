# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Prerequisites To get started, you’ll need to install the following prerequisites.

**1. Install Node.js and npm** Node.js is required for React Native projects as it includes `npm` (Node Package Manager), which is used to install packages. Download Node.js from [Node.js](https://nodejs.org/) and download the latest stable version. This will install both `node` and `npm`. After installation, verify them with:
```bash
node -v   # Check Node.js version
npm -v    # Check npm version
```

**2. Install Expo CLI** Expo CLI is a command-line tool for running and managing React Native projects built with Expo. Install Expo CLI globally with:
```bash
npm install -g expo-cli
```
Verify installation
```bash
expo --version
```
**3. Clone the Repository Clone the project repository to your local machine**
```bash
git clone [url-link](https://github.com/man-of-mind/ML-digit-prediction-app.git)
cd zuks
```

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Troubleshooting
Packages Used The following packages are used in the project. Install them using the commands below if they aren’t already included.
```bash
npm install react-native-canvas
npm install axios
```
If you face any error with react-native-canvas, install using expo, this will install any other missing dependencies
```bash
expo install react-native-canvas
```
**Lastly**, if you face any error while installing or running the project, especially no Macbook, run all commands with `sudo`

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
