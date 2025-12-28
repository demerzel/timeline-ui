# Timeline UI Component

A lightweight, vanilla JavaScript component for displaying and navigating time-based content with multiple zoom levels. Perfect for creating interactive timelines of events, photos, posts, and other chronological data.

## Features

- **Zero Dependencies**: Pure vanilla JavaScript, no frameworks required
- **Multiple Zoom Levels**: Seamlessly switch between months, years, and decades views
- **Windowed Viewing**: Efficiently handles large datasets by showing a limited viewport
- **Smooth Navigation**: Scroll through time using mouse wheel, keyboard, or UI controls
- **Responsive Design**: Works beautifully on desktop and mobile devices
- **Type System**: Built-in support for different content types (events, photos, posts)
- **Customizable**: Extensive options and callbacks for integration
- **Accessible**: Keyboard navigation and semantic HTML
- **Dark Mode**: Automatic dark mode support based on system preferences

## Demo

Open `demo/index.html` in your browser to see the timeline in action with sample data.

## Quick Start

### 1. Include the Files

```html
<link rel="stylesheet" href="src/timeline.css">
<script src="src/timeline.js"></script>
```

### 2. Create a Container

```html
<div id="timeline" style="height: 600px;"></div>
```

### 3. Initialize the Timeline

```javascript
const timeline = new Timeline('#timeline', {
  zoomLevel: 'years',
  windowSize: 10
});

// Add your data
timeline.setItems([
  {
    id: 1,
    date: new Date('2024-01-15'),
    type: 'event',
    title: 'Product Launch',
    content: 'We launched our amazing new product!'
  },
  {
    id: 2,
    date: new Date('2023-06-20'),
    type: 'photo',
    title: 'Team Photo',
    content: 'Annual company retreat',
    image: 'https://example.com/photo.jpg'
  }
]);
```

## API Reference

### Constructor

```javascript
new Timeline(container, options)
```

**Parameters:**

- `container` (string | HTMLElement): CSS selector or DOM element
- `options` (object): Configuration options

**Options:**

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `zoomLevel` | string | `'years'` | Initial zoom level: `'months'`, `'years'`, or `'decades'` |
| `windowSize` | number | `10` | Number of items to display at once |
| `itemHeight` | number | `120` | Height of each timeline item in pixels |
| `padding` | number | `20` | Padding around timeline content |
| `onItemClick` | function | `null` | Callback when an item is clicked: `(item) => {}` |
| `onZoomChange` | function | `null` | Callback when zoom level changes: `(level) => {}` |
| `onScroll` | function | `null` | Callback when timeline scrolls: `(offset, startDate, endDate) => {}` |

### Methods

#### setItems(items)

Set the timeline items. Items are automatically sorted by date (most recent first).

```javascript
timeline.setItems([
  {
    id: 1,
    date: new Date('2024-01-15'),
    type: 'event',
    title: 'Event Title',
    content: 'Event description',
    image: 'optional-image-url.jpg' // optional
  }
]);
```

**Item Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string/number | Yes | Unique identifier |
| `date` | Date/string | Yes | Item date (will be converted to Date object) |
| `type` | string | No | Item type: `'event'`, `'photo'`, `'post'`, or custom |
| `title` | string | Yes | Item title |
| `content` | string | No | Item description/content |
| `image` | string | No | Image URL (displays as thumbnail) |

#### addItem(item)

Add a single item to the timeline. The timeline will automatically re-sort.

```javascript
timeline.addItem({
  id: 3,
  date: new Date(),
  type: 'post',
  title: 'New Post',
  content: 'Just added!'
});
```

#### setZoom(level)

Change the zoom level.

```javascript
timeline.setZoom('months');  // 'months', 'years', or 'decades'
```

#### scroll(delta)

Scroll by a number of items.

```javascript
timeline.scroll(1);   // Scroll down one item
timeline.scroll(-2);  // Scroll up two items
```

#### scrollPrevious()

Navigate to the previous time period based on current zoom level.

```javascript
timeline.scrollPrevious();
```

#### scrollNext()

Navigate to the next time period based on current zoom level.

```javascript
timeline.scrollNext();
```

#### scrollToDate(date)

Scroll to show items around a specific date.

```javascript
timeline.scrollToDate(new Date('2020-01-01'));
```

#### getVisibleItems()

Get the items currently visible in the viewport.

```javascript
const visibleItems = timeline.getVisibleItems();
```

#### destroy()

Clean up the timeline and remove all event listeners.

```javascript
timeline.destroy();
```

## Zoom Levels

The timeline supports three zoom levels, each with different time granularity:

### Months

- Shows individual months
- Label format: "Jan 2024", "Feb 2024"
- Best for viewing recent or detailed history

### Years

- Shows individual years
- Label format: "2024", "2023"
- Best for medium-term timelines (5-20 years)

### Decades

- Shows 10-year periods
- Label format: "2020s", "2010s"
- Best for long-term historical data

## Keyboard Navigation

- `↑` / `↓` - Scroll up/down one item
- `←` / `→` - Navigate to previous/next time period

## Styling

The component uses CSS custom properties for easy theming:

```css
:root {
  --timeline-primary: #4a90e2;
  --timeline-secondary: #f5f7fa;
  --timeline-border: #e0e4e8;
  --timeline-text: #2c3e50;
  --timeline-text-muted: #7f8c8d;
  --timeline-event: #4a90e2;
  --timeline-photo: #e74c3c;
  --timeline-post: #27ae60;
}
```

## Advanced Usage

### Custom Event Handlers

```javascript
const timeline = new Timeline('#timeline', {
  onItemClick: (item) => {
    console.log('Clicked item:', item);
    // Open modal, navigate, etc.
  },
  onZoomChange: (level) => {
    console.log('Zoom changed to:', level);
    // Update analytics, save preference, etc.
  },
  onScroll: (offset, startDate, endDate) => {
    console.log('Viewing items from', startDate, 'to', endDate);
    // Load more data, update UI, etc.
  }
});
```

### Dynamic Data Loading

```javascript
// Load initial data
timeline.setItems(initialItems);

// Add items as they're created
function onNewPost(post) {
  timeline.addItem({
    id: post.id,
    date: post.createdAt,
    type: 'post',
    title: post.title,
    content: post.excerpt
  });
}
```

### Custom Item Types

You can use custom types with custom styling:

```javascript
timeline.addItem({
  id: 1,
  date: new Date(),
  type: 'milestone',  // Custom type
  title: 'Major Milestone',
  content: 'Something important happened'
});
```

Add custom CSS for your type:

```css
.timeline-item-milestone .timeline-item-marker {
  border-color: #9b59b6;
}

.timeline-item-milestone .timeline-item-type {
  background: #9b59b6;
}
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

The component uses windowed rendering to efficiently handle large datasets:

- Only visible items are rendered in the DOM
- Smooth scrolling with virtual viewport
- Handles 1000+ items without performance issues
- Memory efficient through item reuse

## License

MIT License - feel free to use in personal and commercial projects.

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## Roadmap

Potential future enhancements:

- [ ] Touch gestures for mobile (pinch to zoom)
- [ ] Infinite scrolling / lazy loading
- [ ] Search and filter functionality
- [ ] Export timeline as image/PDF
- [ ] Animation options
- [ ] Multiple timeline tracks
- [ ] Custom date formats and localization

## Examples

See the `demo/` directory for a complete working example with:

- Sample data generation
- All zoom levels
- Custom callbacks
- Dynamic item addition
- Responsive layout

## Support

For issues, questions, or suggestions, please open an issue on GitHub.
