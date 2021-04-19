import { noop } from '@testing-tools';
import { FC } from 'react';

const Counter: FC = () => {
    const count = 0;
    return (
        <div>
            <button onClick={noop}>+</button>
            <span>{count}</span>
            <button onClick={noop}>-</button>
        </div>
    );
};

export default Counter;
