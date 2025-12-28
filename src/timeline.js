/**
 * Timeline UI Component
 * A vanilla JavaScript component for displaying and navigating time-based content
 * with support for multiple zoom levels (months, years, decades)
 */

class Timeline {
  constructor(container, options = {}) {
    this.container = typeof container === 'string'
      ? document.querySelector(container)
      : container;

    if (!this.container) {
      throw new Error('Timeline container not found');
    }

    // Configuration
    this.options = {
      zoomLevel: 'years', // 'months', 'years', 'decades'
      windowSize: 10, // Number of items to show at once
      itemHeight: 120, // Height of each timeline item in pixels
      padding: 20,
      onItemClick: null,
      onZoomChange: null,
      onScroll: null,
      ...options
    };

    // Zoom level configurations
    this.zoomLevels = {
      months: {
        label: 'Months',
        msPerUnit: 30 * 24 * 60 * 60 * 1000, // ~30 days
        formatLabel: (date) => date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' }),
        getUnitStart: (date) => new Date(date.getFullYear(), date.getMonth(), 1),
        getNextUnit: (date) => new Date(date.getFullYear(), date.getMonth() + 1, 1),
        getPrevUnit: (date) => new Date(date.getFullYear(), date.getMonth() - 1, 1)
      },
      years: {
        label: 'Years',
        msPerUnit: 365.25 * 24 * 60 * 60 * 1000,
        formatLabel: (date) => date.getFullYear().toString(),
        getUnitStart: (date) => new Date(date.getFullYear(), 0, 1),
        getNextUnit: (date) => new Date(date.getFullYear() + 1, 0, 1),
        getPrevUnit: (date) => new Date(date.getFullYear() - 1, 0, 1)
      },
      decades: {
        label: 'Decades',
        msPerUnit: 10 * 365.25 * 24 * 60 * 60 * 1000,
        formatLabel: (date) => {
          const decade = Math.floor(date.getFullYear() / 10) * 10;
          return `${decade}s`;
        },
        getUnitStart: (date) => {
          const decade = Math.floor(date.getFullYear() / 10) * 10;
          return new Date(decade, 0, 1);
        },
        getNextUnit: (date) => {
          const decade = Math.floor(date.getFullYear() / 10) * 10;
          return new Date(decade + 10, 0, 1);
        },
        getPrevUnit: (date) => {
          const decade = Math.floor(date.getFullYear() / 10) * 10;
          return new Date(decade - 10, 0, 1);
        }
      }
    };

    // State
    this.items = [];
    this.sortedItems = [];
    this.currentOffset = 0; // Current scroll position (in items)
    this.currentZoom = this.options.zoomLevel;
    this.viewportStart = null; // Start date of current viewport
    this.viewportEnd = null; // End date of current viewport

    // Initialize
    this.init();
  }

  init() {
    this.createStructure();
    this.attachEventListeners();
    this.render();
  }

  createStructure() {
    this.container.classList.add('timeline-container');
    this.container.innerHTML = `
      <div class="timeline-header">
        <div class="timeline-controls">
          <div class="timeline-zoom-controls">
            <button class="timeline-btn zoom-btn" data-zoom="months">Months</button>
            <button class="timeline-btn zoom-btn" data-zoom="years">Years</button>
            <button class="timeline-btn zoom-btn" data-zoom="decades">Decades</button>
          </div>
          <div class="timeline-nav-controls">
            <button class="timeline-btn nav-btn" data-action="prev">← Previous</button>
            <span class="timeline-range-label"></span>
            <button class="timeline-btn nav-btn" data-action="next">Next →</button>
          </div>
        </div>
      </div>
      <div class="timeline-viewport">
        <div class="timeline-content"></div>
      </div>
      <div class="timeline-scrollbar">
        <div class="timeline-scrollbar-track">
          <div class="timeline-scrollbar-thumb"></div>
        </div>
      </div>
    `;

    // Cache DOM references
    this.viewportEl = this.container.querySelector('.timeline-viewport');
    this.contentEl = this.container.querySelector('.timeline-content');
    this.rangeLabel = this.container.querySelector('.timeline-range-label');
    this.scrollbarThumb = this.container.querySelector('.timeline-scrollbar-thumb');

    // Highlight active zoom button
    this.updateZoomButtons();
  }

  attachEventListeners() {
    // Zoom controls
    this.container.querySelectorAll('.zoom-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const zoom = e.target.dataset.zoom;
        this.setZoom(zoom);
      });
    });

    // Navigation controls
    this.container.querySelectorAll('.nav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const action = e.target.dataset.action;
        if (action === 'prev') {
          this.scrollPrevious();
        } else if (action === 'next') {
          this.scrollNext();
        }
      });
    });

    // Viewport scrolling (wheel event)
    this.viewportEl.addEventListener('wheel', (e) => {
      e.preventDefault();
      const delta = Math.sign(e.deltaY);
      this.scroll(delta);
    });

    // Scrollbar dragging
    let isDragging = false;
    let startY = 0;
    let startOffset = 0;

    this.scrollbarThumb.addEventListener('mousedown', (e) => {
      isDragging = true;
      startY = e.clientY;
      startOffset = this.currentOffset;
      e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;

      const deltaY = e.clientY - startY;
      const scrollbarHeight = this.container.querySelector('.timeline-scrollbar-track').offsetHeight;
      const thumbHeight = this.scrollbarThumb.offsetHeight;
      const maxScroll = this.sortedItems.length - this.options.windowSize;

      if (maxScroll > 0) {
        const scrollPercentage = deltaY / (scrollbarHeight - thumbHeight);
        const newOffset = Math.round(startOffset + (scrollPercentage * maxScroll));
        this.currentOffset = Math.max(0, Math.min(maxScroll, newOffset));
        this.render();
      }
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!this.container.contains(document.activeElement) &&
          document.activeElement !== document.body) {
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        this.scroll(1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        this.scroll(-1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        this.scrollPrevious();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        this.scrollNext();
      }
    });
  }

  /**
   * Set timeline items
   * @param {Array} items - Array of timeline items with {id, date, type, title, content, image}
   */
  setItems(items) {
    this.items = items.map(item => ({
      ...item,
      date: item.date instanceof Date ? item.date : new Date(item.date)
    }));

    // Sort items by date (most recent first)
    this.sortedItems = [...this.items].sort((a, b) => b.date - a.date);

    this.currentOffset = 0;
    this.updateViewportDates();
    this.render();
  }

  /**
   * Add a single item to the timeline
   */
  addItem(item) {
    const newItem = {
      ...item,
      date: item.date instanceof Date ? item.date : new Date(item.date)
    };

    this.items.push(newItem);
    this.sortedItems = [...this.items].sort((a, b) => b.date - a.date);
    this.updateViewportDates();
    this.render();
  }

  /**
   * Set zoom level
   */
  setZoom(level) {
    if (!this.zoomLevels[level]) {
      console.error(`Invalid zoom level: ${level}`);
      return;
    }

    this.currentZoom = level;
    this.currentOffset = 0; // Reset scroll position when changing zoom
    this.updateZoomButtons();
    this.updateViewportDates();
    this.render();

    if (this.options.onZoomChange) {
      this.options.onZoomChange(level);
    }
  }

  updateZoomButtons() {
    this.container.querySelectorAll('.zoom-btn').forEach(btn => {
      if (btn.dataset.zoom === this.currentZoom) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  /**
   * Scroll by a number of items
   */
  scroll(delta) {
    const maxOffset = Math.max(0, this.sortedItems.length - this.options.windowSize);
    this.currentOffset = Math.max(0, Math.min(maxOffset, this.currentOffset + delta));
    this.updateViewportDates();
    this.render();

    if (this.options.onScroll) {
      this.options.onScroll(this.currentOffset, this.viewportStart, this.viewportEnd);
    }
  }

  /**
   * Scroll to previous time unit based on zoom level
   */
  scrollPrevious() {
    const zoom = this.zoomLevels[this.currentZoom];
    if (!this.viewportStart) return;

    const targetDate = zoom.getPrevUnit(this.viewportStart);
    this.scrollToDate(targetDate);
  }

  /**
   * Scroll to next time unit based on zoom level
   */
  scrollNext() {
    const zoom = this.zoomLevels[this.currentZoom];
    if (!this.viewportEnd) return;

    const targetDate = zoom.getNextUnit(this.viewportEnd);
    this.scrollToDate(targetDate);
  }

  /**
   * Scroll to show items around a specific date
   */
  scrollToDate(targetDate) {
    // Find the first item that is at or before the target date
    const index = this.sortedItems.findIndex(item => item.date <= targetDate);

    if (index !== -1) {
      const maxOffset = Math.max(0, this.sortedItems.length - this.options.windowSize);
      this.currentOffset = Math.max(0, Math.min(maxOffset, index));
      this.updateViewportDates();
      this.render();
    }
  }

  /**
   * Update viewport start and end dates based on current window
   */
  updateViewportDates() {
    const visibleItems = this.getVisibleItems();

    if (visibleItems.length > 0) {
      this.viewportStart = visibleItems[0].date;
      this.viewportEnd = visibleItems[visibleItems.length - 1].date;
    } else {
      this.viewportStart = null;
      this.viewportEnd = null;
    }
  }

  /**
   * Get items currently visible in the viewport
   */
  getVisibleItems() {
    return this.sortedItems.slice(
      this.currentOffset,
      this.currentOffset + this.options.windowSize
    );
  }

  /**
   * Render the timeline
   */
  render() {
    this.renderContent();
    this.renderRangeLabel();
    this.renderScrollbar();
  }

  renderContent() {
    const visibleItems = this.getVisibleItems();

    this.contentEl.innerHTML = '';

    if (visibleItems.length === 0) {
      this.contentEl.innerHTML = '<div class="timeline-empty">No items to display</div>';
      return;
    }

    visibleItems.forEach((item, index) => {
      const itemEl = this.createItemElement(item, index);
      this.contentEl.appendChild(itemEl);
    });
  }

  createItemElement(item, index) {
    const zoom = this.zoomLevels[this.currentZoom];
    const itemEl = document.createElement('div');
    itemEl.className = `timeline-item timeline-item-${item.type || 'default'}`;
    itemEl.dataset.itemId = item.id;

    const dateStr = zoom.formatLabel(item.date);
    const fullDateStr = item.date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    itemEl.innerHTML = `
      <div class="timeline-item-marker"></div>
      <div class="timeline-item-content">
        <div class="timeline-item-header">
          <span class="timeline-item-date" title="${fullDateStr}">${dateStr}</span>
          <span class="timeline-item-type">${item.type || 'event'}</span>
        </div>
        <h3 class="timeline-item-title">${this.escapeHtml(item.title)}</h3>
        ${item.image ? `<img class="timeline-item-image" src="${item.image}" alt="${this.escapeHtml(item.title)}" />` : ''}
        ${item.content ? `<p class="timeline-item-text">${this.escapeHtml(item.content)}</p>` : ''}
      </div>
    `;

    // Click handler
    itemEl.addEventListener('click', () => {
      if (this.options.onItemClick) {
        this.options.onItemClick(item);
      }
    });

    return itemEl;
  }

  renderRangeLabel() {
    if (!this.viewportStart || !this.viewportEnd) {
      this.rangeLabel.textContent = 'No items';
      return;
    }

    const zoom = this.zoomLevels[this.currentZoom];
    const startLabel = zoom.formatLabel(this.viewportStart);
    const endLabel = zoom.formatLabel(this.viewportEnd);

    if (startLabel === endLabel) {
      this.rangeLabel.textContent = startLabel;
    } else {
      this.rangeLabel.textContent = `${endLabel} - ${startLabel}`;
    }
  }

  renderScrollbar() {
    if (this.sortedItems.length <= this.options.windowSize) {
      this.scrollbarThumb.style.display = 'none';
      return;
    }

    this.scrollbarThumb.style.display = 'block';

    const totalItems = this.sortedItems.length;
    const visibleItems = this.options.windowSize;
    const thumbHeight = Math.max(20, (visibleItems / totalItems) * 100);
    const maxScroll = totalItems - visibleItems;
    const thumbPosition = (this.currentOffset / maxScroll) * (100 - thumbHeight);

    this.scrollbarThumb.style.height = `${thumbHeight}%`;
    this.scrollbarThumb.style.top = `${thumbPosition}%`;
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * Destroy the timeline and clean up
   */
  destroy() {
    this.container.innerHTML = '';
    this.container.classList.remove('timeline-container');
  }
}

// Export for use in modules or direct browser usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Timeline;
}
