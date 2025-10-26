// blogPost.test.tsx (Vitest/RTL)
import { render } from '@testing-library/react';
import { expect, it, test } from 'vitest';

// Assume BlogDetailPage correctly renders <title> and <meta> tags
import { Seo } from './Seo';
import { SeoProps } from '../types';
import { describe } from 'node:test';

// Mock the required data structure from your Sanity fetch
const mockProps: SeoProps = {
  title: "SEO Title!",
  description: "SEO Description!",
  twitterHandle: "Twitter? Handled.",
  image: 'test-my-seo.jpg', // Test for omission
  siteName: 'test-my-seo.jpg', // Test for omission
  url: 'test-my-seo.jpg', // Test for omission
};

describe('Seo component', () => {
  it(' is this working at all', () => {
    expect(true).toBe(true);
  });
  it('component hoists correct SEO tags, with default values where properties are omitted', () => {
    // Arrange: Render the component, causing the metadata to be hoisted into the <head> element by React 19.
    const {  } = render(<Seo {...mockProps} />);

    // Assert: Verify the tags
    expect(document.title).toBe(mockProps.title);
    const ogImage = document.head.querySelector('meta[property="og:image"]');
    expect(ogImage).toBeDefined();
    expect(ogImage?.getAttribute('content')).toBe(mockProps.image);
    const description = document.head.querySelector('meta[name="description"]');
    expect(description).toBeDefined();
    expect(description?.getAttribute('content')).toBe(mockProps.description);
  });
});
