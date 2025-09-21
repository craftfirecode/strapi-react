# Angular CraftFire CMS

Eine Angular 20 Implementierung des React CraftFire CMS mit Signal-Konzept und modernen Angular-Features.

## Features

- ✅ Angular 20 mit Signals
- ✅ Moderne Template-Syntax mit @if, @switch, @for
- ✅ Strapi CMS Integration
- ✅ Responsive Navigation
- ✅ Builder-Komponente für dynamische Inhalte
- ✅ TypeScript Support
- ✅ Server-Side Rendering (SSR)

## Projektstruktur

```
ng/
├── src/
│   ├── app/
│   │   ├── components/ui/
│   │   │   ├── builder/          # Zentrale Builder-Komponente
│   │   │   ├── button/           # Button-Komponente
│   │   │   ├── content/          # Content-Komponente für WYSIWYG
│   │   │   └── navigation/       # Navigation-Komponente
│   │   ├── lib/
│   │   │   ├── helper.ts         # Helper-Funktionen
│   │   │   └── utils.ts          # CSS-Utilities
│   │   ├── page/                 # Haupt-Page-Komponente
│   │   ├── services/
│   │   │   └── strapi-api.service.ts  # Strapi API Service
│   │   ├── app.config.ts         # App-Konfiguration
│   │   └── app.routes.ts         # Routing-Konfiguration
│   ├── environments/             # Environment-Konfigurationen
│   └── styles.scss              # Globale Styles
```

## Installation und Setup

### 1. Dependencies installieren

```bash
cd ng
npm install
```

### 2. Environment-Konfiguration

Bearbeite `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  strapiApiUrl: 'http://localhost:1337',  // Deine Strapi-URL
  strapiApiKey: 'your-strapi-api-key-here'  // Dein Strapi API-Key
};
```

### 3. Strapi-Verbindung

Die App verbindet sich automatisch mit deiner Strapi-Instanz. Stelle sicher, dass:

- Strapi läuft und erreichbar ist
- Der API-Key korrekt konfiguriert ist
- Die benötigten Content-Types existieren:
  - `pages`
  - `posts` 
  - `blogs`
  - `navigation`

### 4. Development Server starten

```bash
npm run start
```

Die App ist dann unter `http://localhost:4200` erreichbar.

## Unterstützte CMS-Komponenten

### Aktuell implementiert:
- ✅ `cms.content` - WYSIWYG Content
- ✅ `cms.button` - Call-to-Action Buttons

### Geplant für Erweiterung:
- `cms.image` - Bilder
- `cms.space` - Abstandshalter
- `cms.post-list` - Blog-Post Listen
- `cms.content-image` - Content mit Bild
- `cms.table` - Tabellen
- `cms.accordion` - Akkordeon-Elemente

## Angular 20 Features

### Signals
```typescript
// State Management mit Signals
data = signal<any>(null);
loading = signal(true);

// Computed Values
hasValidData = computed(() => {
  const currentData = this.data();
  return currentData && Array.isArray(currentData.zone);
});
```

### Moderne Template-Syntax
```html
@if (hasValidData()) {
  @for (component of data().zone; track component.id) {
    @switch (component.__component) {
      @case ('cms.content') {
        <app-content [data]="component"></app-content>
      }
      @case ('cms.button') {
        <app-button>{{ component.value }}</app-button>
      }
    }
  }
} @else {
  <div>404 – Seite nicht gefunden</div>
}
```

## API-Integration

Der `StrapiApiService` bietet folgende Methoden:

- `getPageData(url)` - Lädt Seitendaten
- `getPostData(url)` - Lädt Post-Daten  
- `getBlogData(url)` - Lädt Blog-Daten
- `getSettingsData()` - Lädt Navigation
- `getPageByHref(url)` - Sucht Seite nach URL

## Deployment

### Build für Produktion

```bash
npm run build
```

### SSR Build

```bash
npm run build
npm run serve:ssr:ng
```

## Navigation

Die Navigation unterstützt:
- Desktop-Navigation mit Dropdown-Menüs
- Mobile-Navigation mit Touch-Unterstützung
- Aktive Link-Hervorhebung
- Icon-Support (erweiterbar)

## Styling

- Tailwind CSS für Utility-First Styling
- CSS Custom Properties für Theming
- Responsive Design
- Accessibility-Features

## Nächste Schritte

1. Erweitere die Builder-Komponente um weitere CMS-Komponenten
2. Implementiere Icon-Library (z.B. Lucide Angular)
3. Füge Animationen hinzu
4. Optimiere Performance
5. Erweitere SEO-Features
