# FitLog — Dark Gym Companion & Workout Tracker

FitLog is a modern, high-contrast, dark gym companion application built with Next.js App Router and React. Pick a lift, lock it into today's plan, track duration and calories, and mark sets as done.

---

## 🚀 Key Features

1. **Responsive Navbar with Live Badge Counters**
   - Brand logo and navigation links with active state indicator.
   - Live "Plan" counter badge (accent lime pill) and "Saved" counter badge (outline pill) updating in real-time.

2. **Hero Banner Section**
   - Bold Oswald display typography: *"TRAIN WITH INTENT. LOG EVERY SET."*
   - *"BROWSE WORKOUTS"* CTA button with smooth scroll directly to the library.
   - Right-side high-resolution 3D fitness illustration.

3. **Responsive 3x4 Workout Library Grid**
   - Displays all lifts in a clean grid (1 column mobile, 2 columns tablet, 3 columns desktop).
   - Each card displays exercise thumbnail, muscle group badges, equipment, duration, calories, and rating.

4. **Real-Time Search & Skeleton Loading**
   - Live search input filtering workouts instantly by exercise name, muscle groups, or equipment.
   - Animated skeleton placeholder cards shown during data fetching.
   - Clean empty state with search reset when no matches are found.

5. **Two-Column Workout Details Page (`/workouts/[id]`)**
   - Large workout illustration filling the left column.
   - Comprehensive Key Specs table: Equipment, Difficulty, Sets, Reps, Duration, Calories, and Rating.
   - Step-by-step ordered instructions list.

6. **Daily Plan Cap & Validation**
   - 5-lift cap enforcement for today's routine with warning toast notifications.
   - Duplicate prevention with visual state feedback (*"In today's plan"* / *"Saved for later"*).

7. **My Plan Page (`/my-plan`) with Live Metrics**
   - Dynamic summary cards calculating live totals:
     - **Exercises**: Total lifts count in bright lime.
     - **Minutes**: Total exercise time in minutes.
     - **Calories**: Total calories burned.
   - Tab toggle between **Today's Plan** and **Saved**.
   - Custom empty state (*"NOTHING HERE YET"*) when no lifts are present.

8. **Dynamic Sorting (Challenge Feature C1)**
   - Custom sort dropdown with chevron icon.
   - Re-sorts active list on the fly by **Duration**, **Calories**, or **Rating**.

9. **Mark as Done & Remove Actions (Challenge Feature C3)**
   - Lime *"Mark as Done"* button toggles completion with a strikethrough effect and toast feedback.
   - Remove (*X*) button cleanly removes workouts from the active plan or saved list.

10. **LocalStorage Persistence**
    - State automatically saves to `localStorage` and hydrates cleanly without hydration mismatches.

11. **Resilient API Architecture**
    - Automatic fallback mechanism: tries primary endpoint and falls back to backup endpoint seamlessly.

12. **Custom 404 Not Found Page**
    - Branded error page matching the dark gym theme with quick navigation back to workouts.

---

## 🛠️ Technologies Used

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 & DaisyUI
- **Fonts**: Google Fonts (`Oswald` & `Inter`)
- **State Management**: React Context API (`WorkoutContext`)
- **Storage**: Browser LocalStorage
- **Notifications**: React Hot Toast
- **Icons**: React Icons (Lucide `react-icons/lu`)

---

## 📡 API Endpoints

- **Primary API**: `https://api.abcz.workers.dev/api/fitlog`
  - Single Workout: `https://api.abcz.workers.dev/api/fitlog/:id`
- **Backup API**: `https://api.api-store.workers.dev/api/fitlog`
  - Single Workout: `https://api.api-store.workers.dev/api/fitlog/:id`

---

## 💻 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Prantik39/B14-A6-Fit-Log.git
cd fit-log
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for production
```bash
npm run build
npm run start
```
