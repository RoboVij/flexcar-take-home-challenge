# Frontend Take-Home Challenge - Vehicle Inventory

This repo is a complete React + TypeScript + Vite frontend implementing the take-home challenge.

## Tech

- React 18 + TypeScript + Vite
- React Testing Library / Jest

## What was built

- ZIP code search (client-side, hardcoded vehicle inventory)
- Vehicle cards with Make, Model, Trim, Year, Color, Mileage, Price, Image
- Filters for Make and Color
- Sorting by Price High, Price Low, and Model (A-Z)
- Responsive UI and theme color **#E8FF00**
- Error handling for invalid/missing ZIP codes and empty results
- Unit tests (Jest + React Testing Library)

## Notes / Design decisions

- On initial page load, all vehicles are shown even without a ZIP.
- ZIP validation accepts 5-digit US ZIPs only.
- The inventory is a hardcoded list of 20 vehicles in `src/data/vehicles.ts` as requested. For a large list, pagination/ infinite scrolling/ windowing/ list virtualisation could be implemented. But for the scope of this task, it's not done.
- Images are being fetched from online sources. They don't always match the vehicle or color. Could be considered as placeholders. When images don't work, a fallback placeholder image is shown.
- Design of filters, sorting, vehicle list is similar to the reference website provided in the PDF file (filters as side panel, not on top).
- Filter item (make, color) count doesn't update after filtering. It only shows the count based on ZIP results. Similar to how it's implemented in the reference website.
- No network calls are made.
- Theme color has been used limitedly, since its not contrasty enough.
- Only basic unit tests are addded.

## Setup / Run

1. Clone the project:

```bash
git clone https://github.com/RoboVij/flexcar-take-home-challenge.git
```

2. Install dependencies:

```bash
npm install
```

3. Run the app locally:

```bash
npm run dev
```

4. Run tests:

```bash
npm test
```

The original assignment PDF `Frontend_Take_Home_Challenge_V5.pdf` is included in the root of this project.
