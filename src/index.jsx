import 'core-js/stable';
import 'regenerator-runtime/runtime';

import {
  APP_INIT_ERROR,
  APP_READY,
  subscribe,
  initialize,
  mergeConfig,
} from '@edx/frontend-platform';
import { ErrorPage } from '@edx/frontend-platform/react';
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './components/app/App';

import messages from './i18n';

import './index.scss';

const rootNode = createRoot(document.getElementById('root'));
subscribe(APP_READY, () => {
  rootNode.render(<StrictMode><App /></StrictMode>);
});

subscribe(APP_INIT_ERROR, (error) => {
  rootNode.render(
    <StrictMode>
      <ErrorPage message={error.message} />
    </StrictMode>,
  );
});

initialize({
  handlers: {
    config: () => {
      mergeConfig({
        ALGOLIA_APP_ID: process.env.ALGOLIA_APP_ID || null,
        ALGOLIA_SEARCH_API_KEY: process.env.ALGOLIA_SEARCH_API_KEY || null,
        ALGOLIA_INDEX_NAME: process.env.ALGOLIA_INDEX_NAME || null,
        HUBSPOT_MARKETING_URL: process.env.HUBSPOT_MARKETING_URL || null,
        EDX_FOR_SUBSCRIPTION_TITLE: process.env.EDX_FOR_SUBSCRIPTION_TITLE || null,
        EDX_ENTERPRISE_ALACARTE_TITLE:
          process.env.EDX_ENTERPRISE_ALACARTE_TITLE || null,
        FEATURE_CARD_VIEW_ENABLED:
          process.env.FEATURE_CARD_VIEW_ENABLED || false,
        FEATURE_PROGRAM_TYPE_FACET:
          process.env.FEATURE_PROGRAM_TYPE_FACET || false,
      });
    },
    auth: () => {},
  },
  messages,
});
