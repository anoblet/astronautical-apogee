module.exports = {
  ci: {
    collect: {
      url: [
        '/',
        '/services/design/',
        '/services/hosting/',
        '/portfolio/professional/',
        '/blog/',
        '/services/social/pricing/',
      ].map(path => `http://localhost:4321${path}`),
      numberOfRuns: 3,
    },
    upload: {
      target: 'temporary-public-storage',
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
      },
    },
  },
};
