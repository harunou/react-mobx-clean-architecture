import { FC } from "react"

export interface FeatureProps {
    text: string;
}

const Feature: FC<FeatureProps>  =({text}) => {
    return <div>Text is: {text}</div>
}

export default Feature
