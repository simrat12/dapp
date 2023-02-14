import React, { FunctionComponent } from 'react';
import { IconType } from 'react-icons/lib';

type FreelancerSocialProps = {
    label: string,
    key: string,
    icon: JSX.Element,
    link: string,
}

type FreelancerState = {
    is_edit: boolean;
}

export const FreelancerSocial = (props: FreelancerSocialProps): JSX.Element => {

    let media_icon: JSX.Element;
    if (props.link == "") {
        media_icon = <span>"+"</span>
    } else {
        
        media_icon = 
        <a href={props.link} target="_blank" rel="noopener"><span>{props.icon}</span></a>
    }

    return (
        <div
            className="social-link"
            key={props.key}
        >
            <p>{props.label}</p>
            <button className="social-btn">
                    {media_icon}
            </button>
        </div>
    );
};

export default alert;