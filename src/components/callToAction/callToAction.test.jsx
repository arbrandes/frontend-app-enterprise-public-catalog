import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CallToAction from './callToAction';

const text = 'Some nice copy';
const props = {
  title: 'ACTION NEEDED',
  buttonLink: 'http://buyme.com',
  buttonText: 'Buy Now',
};

describe('callToAction', () => {
  it('renders the text passed to it', () => {
    render(<CallToAction {...props}><p>{text}</p></CallToAction>);
    // getByText will error if title is not in the document.
    screen.getByText(props.title);
    screen.getByText(text);
  });
  it('renders a button with a link', () => {
    render(<CallToAction {...props}><p>{text}</p></CallToAction>);
    const button = screen.getByText(props.buttonText);
    expect(button).toHaveAttribute('href', props.buttonLink);
  });
});
