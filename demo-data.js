/**
 * Rich demo data generator for Timeline UI
 * Creates realistic timeline data with good coverage across all zoom levels
 */

function generateRichDemoData() {
  const items = [];
  let id = 1;

  // Extended content libraries for more variety
  const eventTemplates = {
    company: [
      { title: 'Company Founded', content: 'The beginning of our journey and vision.' },
      { title: 'Series A Funding', content: 'Raised $5M to accelerate growth and expand team.' },
      { title: 'Series B Funding', content: 'Secured $15M for international expansion.' },
      { title: 'Series C Funding', content: 'Raised $50M to scale operations globally.' },
      { title: 'IPO Announcement', content: 'Going public to fuel next phase of growth.' },
      { title: 'Strategic Acquisition', content: 'Acquired complementary company to expand capabilities.' },
      { title: 'New Office Opening', content: 'Opened state-of-the-art facility in new market.' },
      { title: 'Reached Profitability', content: 'First profitable quarter marks major milestone.' }
    ],
    product: [
      { title: 'Product Launch', content: 'Introduced revolutionary new product to market.' },
      { title: 'Version 2.0 Release', content: 'Major update with highly requested features.' },
      { title: 'Mobile App Launch', content: 'Bringing our platform to iOS and Android.' },
      { title: 'API Platform Released', content: 'Opening our platform to developers worldwide.' },
      { title: 'Enterprise Edition', content: 'Launched enterprise-grade offering for large orgs.' },
      { title: 'AI Features Added', content: 'Integrated machine learning for smarter experiences.' },
      { title: '1M Users Milestone', content: 'Celebrated one million active users globally.' },
      { title: '10M Users Milestone', content: 'Hit ten million users across all platforms.' }
    ],
    partnership: [
      { title: 'Major Partnership Announced', content: 'Formed strategic alliance with industry leader.' },
      { title: 'Distribution Agreement', content: 'Partnered to expand reach in new markets.' },
      { title: 'Technology Partnership', content: 'Collaboration to integrate cutting-edge tech.' },
      { title: 'Academic Partnership', content: 'Working with universities on research initiatives.' }
    ],
    awards: [
      { title: 'Best Product Award', content: 'Recognized as best in category by industry analysts.' },
      { title: 'Innovation Award', content: 'Honored for groundbreaking technological innovation.' },
      { title: 'Sustainability Award', content: 'Recognized for environmental leadership.' },
      { title: 'Best Workplace Award', content: 'Named one of the best places to work.' },
      { title: 'Customer Choice Award', content: 'Voted #1 by our customers in annual survey.' }
    ],
    team: [
      { title: 'Team Retreat', content: 'Company-wide gathering for planning and team building.' },
      { title: 'Hackathon Event', content: '48-hour innovation sprint producing new ideas.' },
      { title: 'New CEO Appointed', content: 'Leadership transition to drive next growth phase.' },
      { title: 'Engineering Team Doubles', content: 'Major hiring push to accelerate development.' },
      { title: 'Remote Work Announced', content: 'Adopted flexible remote-first policy.' }
    ]
  };

  const photoTemplates = [
    { title: 'Team Photo', content: 'Our amazing team at the annual gathering.' },
    { title: 'Office Tour', content: 'A look inside our collaborative workspace.' },
    { title: 'Product Demo', content: 'Showcasing latest features to customers.' },
    { title: 'Conference Booth', content: 'Meeting customers and partners at industry event.' },
    { title: 'Team Building Event', content: 'Fun activities strengthening team bonds.' },
    { title: 'Celebration Party', content: 'Commemorating a major achievement together.' },
    { title: 'Workshop Session', content: 'Learning and growing together as a team.' },
    { title: 'Customer Visit', content: 'Meeting with key customers to gather feedback.' },
    { title: 'Behind the Scenes', content: 'Candid moments from daily work life.' },
    { title: 'Product Photoshoot', content: 'Professional photography of latest offerings.' },
    { title: 'Team Lunch', content: 'Casual moments sharing a meal together.' },
    { title: 'Award Ceremony', content: 'Proud moment receiving industry recognition.' }
  ];

  const postTemplates = [
    { title: 'Quarterly Update', content: 'Sharing our progress and key metrics with stakeholders.' },
    { title: 'Industry Insights', content: 'Analysis of emerging trends in our market.' },
    { title: 'Product Announcement', content: 'Exciting news about upcoming features and improvements.' },
    { title: 'Customer Testimonial', content: 'Success story from a valued customer.' },
    { title: 'Feature Highlight', content: 'Deep dive into a powerful capability.' },
    { title: 'Tech Blog Post', content: 'Technical insights from our engineering team.' },
    { title: 'Company Culture', content: 'What makes our workplace special and unique.' },
    { title: 'Lessons Learned', content: 'Reflections on challenges and how we overcame them.' },
    { title: 'Roadmap Update', content: 'Preview of what we are building next.' },
    { title: 'Success Metrics', content: 'Data-driven update on our performance.' },
    { title: 'Best Practices', content: 'Sharing knowledge with the community.' },
    { title: 'Case Study', content: 'In-depth look at customer implementation.' },
    { title: 'Market Analysis', content: 'Research on industry dynamics and opportunities.' },
    { title: 'Tutorial Series', content: 'Educational content for users and developers.' }
  ];

  // Helper to get random item from array
  const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

  // Helper to create date
  const makeDate = (year, month, day) => new Date(year, month, day);

  // Phase 1: Early Years (1990-1999) - Sparse, company founding era
  // 2-4 items per year
  for (let year = 1990; year <= 1999; year++) {
    const itemCount = Math.floor(Math.random() * 3) + 2;
    for (let i = 0; i < itemCount; i++) {
      const month = Math.floor(Math.random() * 12);
      const day = Math.floor(Math.random() * 28) + 1;

      let item;
      if (year === 1990 && i === 0) {
        item = { ...eventTemplates.company[0], type: 'event' }; // Founded
      } else {
        const template = random([
          ...eventTemplates.company,
          ...eventTemplates.product,
          ...eventTemplates.team
        ]);
        item = { ...template, type: 'event' };
      }

      items.push({
        id: id++,
        date: makeDate(year, month, day),
        type: item.type,
        title: item.title,
        content: item.content,
        image: null
      });
    }
  }

  // Phase 2: Growth Years (2000-2009) - Moderate activity, building phase
  // 5-10 items per year, mix of events, posts, and photos
  for (let year = 2000; year <= 2009; year++) {
    const itemCount = Math.floor(Math.random() * 6) + 5;
    for (let i = 0; i < itemCount; i++) {
      const month = Math.floor(Math.random() * 12);
      const day = Math.floor(Math.random() * 28) + 1;
      const typeChoice = Math.random();

      let item, type;
      if (typeChoice < 0.4) {
        type = 'event';
        const category = random(['company', 'product', 'partnership', 'team']);
        item = random(eventTemplates[category]);
      } else if (typeChoice < 0.7) {
        type = 'post';
        item = random(postTemplates);
      } else {
        type = 'photo';
        item = random(photoTemplates);
      }

      items.push({
        id: id++,
        date: makeDate(year, month, day),
        type: type,
        title: item.title,
        content: item.content,
        image: type === 'photo' ? `https://picsum.photos/seed/${id}/600/400` : null
      });
    }
  }

  // Phase 3: Expansion Years (2010-2019) - High activity, major growth
  // 15-25 items per year, all types
  for (let year = 2010; year <= 2019; year++) {
    const itemCount = Math.floor(Math.random() * 11) + 15;
    for (let i = 0; i < itemCount; i++) {
      const month = Math.floor(Math.random() * 12);
      const day = Math.floor(Math.random() * 28) + 1;
      const typeChoice = Math.random();

      let item, type;
      if (typeChoice < 0.35) {
        type = 'event';
        const categories = ['company', 'product', 'partnership', 'awards', 'team'];
        const category = random(categories);
        item = random(eventTemplates[category]);
      } else if (typeChoice < 0.65) {
        type = 'post';
        item = random(postTemplates);
      } else {
        type = 'photo';
        item = random(photoTemplates);
      }

      items.push({
        id: id++,
        date: makeDate(year, month, day),
        type: type,
        title: item.title,
        content: item.content,
        image: type === 'photo' ? `https://picsum.photos/seed/${id}/600/400` : null
      });
    }
  }

  // Phase 4: Recent Years (2020-2024) - Very high activity, mature company
  // 25-40 items per year, lots of posts and photos
  // Add some clustering (multiple items in same month for realistic patterns)
  for (let year = 2020; year <= 2024; year++) {
    const itemCount = Math.floor(Math.random() * 16) + 25;

    // Create some "hot" months with lots of activity
    const hotMonths = [
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 12)
    ];

    for (let i = 0; i < itemCount; i++) {
      // 40% chance of landing in a hot month
      let month;
      if (Math.random() < 0.4) {
        month = random(hotMonths);
      } else {
        month = Math.floor(Math.random() * 12);
      }

      const day = Math.floor(Math.random() * 28) + 1;
      const typeChoice = Math.random();

      let item, type;
      if (typeChoice < 0.25) {
        type = 'event';
        const categories = ['company', 'product', 'partnership', 'awards', 'team'];
        const category = random(categories);
        item = random(eventTemplates[category]);
      } else if (typeChoice < 0.6) {
        type = 'post';
        item = random(postTemplates);
      } else {
        type = 'photo';
        item = random(photoTemplates);
      }

      items.push({
        id: id++,
        date: makeDate(year, month, day),
        type: type,
        title: item.title,
        content: item.content,
        image: type === 'photo' ? `https://picsum.photos/seed/${id}/600/400` : null
      });
    }
  }

  // Add a few future items for 2025 (showing it works with future dates)
  for (let i = 0; i < 5; i++) {
    const month = Math.floor(Math.random() * 6); // First half of 2025
    const day = Math.floor(Math.random() * 28) + 1;
    const item = random(postTemplates);

    items.push({
      id: id++,
      date: makeDate(2025, month, day),
      type: 'post',
      title: `[Planned] ${item.title}`,
      content: item.content,
      image: null
    });
  }

  return items;
}
