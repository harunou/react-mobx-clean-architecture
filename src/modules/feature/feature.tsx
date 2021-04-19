import { FC } from 'react';

export interface FeatureProps {
    text: string;
}

const Feature: FC<FeatureProps> = ({ text }) => {
    return <h1>{text}</h1>;
};

export default Feature;
