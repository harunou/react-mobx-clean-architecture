import { render } from '@testing-library/react';
import Feature from './feature';

describe(`${Feature.name}`, () => {
    it('renders component with feature text', () => {
        const helloWorld = 'Hello world!';
        const { getByText } = render(<Feature text={helloWorld} />);
        expect(getByText(helloWorld)).toBeInTheDocument();
    });
});
