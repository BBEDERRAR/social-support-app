# Social Support Application

A modern, accessible, and multilingual web application for processing social support requests. Built with Next.js and React, it features a multi-step form with data persistence, internationalization, and AI assistance.

## Features

- **Multi-step Form**: A wizard-style form broken into three logical sections:

  - Personal Information
  - Family & Financial Information
  - Situation Description

- **Form State Management**:

  - Persistent form state using localStorage
  - Form validation with Zod schemas
  - Seamless data preservation between sessions and page refreshes

- **Data Validation**:

  - Comprehensive validation using Zod schemas
  - Format validation for specific fields (e.g., National ID format: 15 digits without hyphens)
  - Multilingual validation error messages

- **Internationalization**:

  - Full support for English and Arabic
  - Right-to-left (RTL) layout for Arabic
  - Language switching with cookie-based persistence

- **AI Assistance**:

  - OpenAI integration to help users complete complex form fields
  - Smart suggestions based on previously entered information
  - User-friendly interface for accepting AI suggestions

- **Accessibility**:
  - ARIA-compliant components
  - Visual progress indicators (stepper)
  - Responsive design for all device sizes

## Tech Stack

- **Framework**: Next.js 15
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4 with shadcn/ui components
- **Form Handling**:
  - react-hook-form for form state management
  - zod for schema validation
- **Internationalization**: next-intl for translations and localization
- **AI Integration**: OpenAI API for intelligent form assistance
- **State Persistence**: Custom localStorage hook for data persistence

## Form State Persistence Solution

The application implements a robust form state persistence solution using:

1. **Custom `useLocalStorage` Hook**:

   - Initializes state from localStorage when available
   - Falls back to default values when no saved data exists
   - Handles serialization/deserialization between the app and browser storage
   - Safely handles client/server rendering scenarios

2. **React Hook Form Integration**:

   - Initializes form with data from localStorage
   - Two-way synchronization between form and localStorage
   - Preserves user data between sessions and page refreshes

3. **Multi-step Form Wizard**:
   - Maintains state across multiple form steps
   - Validates each step individually before proceeding
   - Preserves progress if the user leaves and returns

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Create a `.env.local` file with the following variables:

```
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4o-mini  # or another OpenAI model
```
