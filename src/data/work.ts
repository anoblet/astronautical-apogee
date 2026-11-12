import cxl from '@assets/cxl.com_.webp';
import graduation from '@assets/graduationsource.com_.webp';
import avanti from '@assets/avantisystemsusa.com_.webp';

// These contributions come from the existing professional portfolio. Add outcomes
// or metrics only when they can be substantiated; client sites can change later.
export const work = [
  {
    id: 'cxl',
    name: 'CXL',
    category: 'Online learning',
    image: cxl,
    url: 'https://cxl.com/',
    description:
      'Online courses, subscriptions, and a responsive learning experience for B2B marketers.',
    context:
      'CXL brings on-demand and live courses together with subscription access. Course discovery, account access, and commerce need to support the learning experience.',
    role: 'I helped build the learning platform, working on dynamic content, authentication, subscription commerce, and a responsive interface.',
    contributions: [
      'Dynamic course content and learning interfaces',
      'User authentication and subscription e-commerce',
      'Responsive presentation for on-demand and live courses',
    ],
    technologies: [
      'HTML',
      'CSS',
      'JavaScript',
      'Web Components',
      'Lit',
      'WordPress',
      'WooCommerce',
    ],
    focus:
      'Bringing content, accounts, and subscription purchasing into one usable experience. The work connects interface development with the systems that control access to courses.',
  },
  {
    id: 'graduation-source',
    name: 'Graduation Source',
    category: 'E-commerce',
    image: graduation,
    url: 'https://graduationsource.com/',
    description:
      'Product discovery, student ordering, and payment flows for graduation supplies.',
    context:
      'Graduation Source sells graduation products through an e-commerce platform. Customers need to browse a catalog, manage accounts, and complete orders, including through student ordering portals.',
    role: 'I built and maintained platform features covering product catalogs, order management, accounts, student portals, and payment integrations.',
    contributions: [
      'Product catalog and account features',
      'Order management and student ordering portals',
      'Payment gateway integration and responsive shopping',
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'Magento'],
    focus:
      'Supporting the full ordering path rather than treating product pages, accounts, and payments as unrelated screens. Maintenance and integration work are part of that experience.',
  },
  {
    id: 'avanti-systems',
    name: 'Avanti Systems USA',
    category: 'Product discovery',
    image: avanti,
    url: 'https://avantisystemsusa.com/',
    description:
      'A product-focused website for architects, designers, and contractors exploring glass wall systems.',
    context:
      'Avanti Systems USA offers commercial glass wall systems. Its website needs to help professional audiences explore product lines, find specifications, and make an inquiry.',
    role: 'I worked on the web presence, product presentation, navigation, galleries, specifications, inquiry forms, and content management.',
    contributions: [
      'Product navigation and information architecture',
      'Galleries, detailed specifications, and inquiry forms',
      'Responsive layouts and editable project and blog content',
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'WordPress'],
    focus:
      'Organizing technical product information around how architects, designers, and contractors explore options. Content structure and inquiry paths support the visual presentation.',
  },
];
