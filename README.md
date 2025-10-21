# Noctra React Native Starter Template

Noctra React Native Starter Template is an Expo-based project that includes everything you need to quickly start building your app with TypeScript, Supabase, Zustand for state management, and NativeWind for utility-first styling.
This template is designed to give you a head start by providing a pre-configured setup for all these technologies, making it easy to scale and build production-ready applications.

## Features

- Expo: Simplifies development with a faster build system and easy deployment to iOS and Android.
- TypeScript: Strongly typed JavaScript for better code quality and developer experience.
- Supabase: Backend-as-a-Service solution for authentication, real-time databases, and file storage.
- Zustand: Simple, fast, and scalable state management solution for React and React Native.
- NativeWind: A utility-first CSS framework for React Native, inspired by TailwindCSS, that allows you to quickly style components.


## Prerequisites

Before you start, ensure you have the following installed:

- Node.js (v14 or later)
- npm or bun (npm comes with Node.js)
- Supabase account (for backend services like authentication and database)
- Android Studio / Xcode (for running on Android or iOS simulators)

To check if you have the required tools installed, you can run:
```
node -v
npm -v / bun -v
```

## Installation
1. Clone the Repository
```
git clone https://github.com/noctra-cc/noctra-rn-starter.git
cd noctra-rn-starter
```

2. Install Dependencies

Install the project dependencies using either npm or bun.

3. Set Up Supabase

- Sign up for a free account at Supabase
- Create a new project in the Supabase dashboard.
- Get the API URL and anon key from the project settings.
- Create a .env file in the root of your project and add the following keys:
- 
```
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-supabase-anon-key
```

Note: The Supabase configuration is set up in the project under src/services/supabase.ts. Make sure the .env file is added to your .gitignore file to prevent sharing sensitive credentials.


## Running the App

Once you’ve set up the project, you can run it on your device or emulator.

```
bun start
```
or
```
npm run start
```

From there, you can scan the QR code with the Expo Go app on your mobile device or run it on an emulator.


## Folder Structure

Here's an overview of the project structure:

```
src/
├── app/                 # App entry and routing (Expo Router)
├── core/                # Global/shared app logic
│   ├── assets/          # Fonts, images, icons, etc.
│   ├── components/      # Reusable shared UI components
│   ├── config/          # Global config (e.g., theming, constants)
│   ├── lib/             # Shared utilities (e.g., formatting)
│   ├── stores/          # Global Zustand stores (shared across features)
│   └── translations/    # i18n support
├── features/            # Feature-based app modules
│   └── [feature]/       
│       ├── guards/      # Route guards (e.g., useAuthGuard)
│       ├── hooks/       # Auth-specific logic (e.g., useAuth)
│       ├── components/  # Auth-specific components
│       └── store/       # Localized Zustand store (if needed)
├── services/            # External service layer (e.g., Supabase)
│   └── auth/            # Supabase auth abstraction
```
✅ Services are decoupled from features, allowing you to swap or replace them (e.g., replace Supabase with Firebase) with minimal changes across the app.


### Using Zustand for State Management

We use Zustand for global state management. To create and use a store, you can refer to src/store/useStore.ts.

Example:
```
import create from 'zustand';

type Store = {
  user: any;
  setUser: (user: any) => void;
};

export const useStore = create<Store>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
```

To use the store in a component:

```
import { useStore } from '../store/useStore';

const UserProfile = () => {
  const { user, setUser } = useStore();

  return (
    <View>
      <Text>{user?.name || 'No user'}</Text>
    </View>
  );
};
```

### Using NativeWind for Styling

NativeWind allows you to use utility-first CSS classes directly within your TSX components, making it easier to style your app without writing long custom styles.

Example:

```
import { Text, View } from 'react-native';

const ExampleComponent = () => {
  return (
    <View className="flex-1 justify-center items-center bg-blue-500">
      <Text className="text-white text-lg">Welcome to Noctra!</Text>
    </View>
  );
};
```

For more information on NativeWind, refer to the NativeWind Docs


## Customization

### Theme

Customize the global theme by modifying src/config/colors.ts. You can adjust colors, fonts, and other design elements to match your app's branding.

### Supabase Integration

The src/services/supabase.ts file contains the initial setup for connecting with Supabase. You can extend it to add authentication, real-time subscriptions, and database queries as needed.

### Components

The starter template includes some basic reusable components located in the src/core/components/ directory. You can add your own components or modify the existing ones.
