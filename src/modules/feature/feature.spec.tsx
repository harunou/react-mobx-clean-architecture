import renderer from 'react-test-renderer';
import Feature from './feature';

describe(`${Feature.name}`, () => {
    it('renders component with feature text', () => {
        const halloWorld = 'Hallo world';

        renderer.create(<Feature text={halloWorld}/>);
    });
});
