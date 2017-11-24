import React from 'react';

const SLFab = () => {
    return (
        <div className="cornerFab">
            <div className="fixed-action-btn wow bounceInRight">
                <a href="#create_modal"
                   className="btn-floating btn-large tooltipped waves-effect waves-light red accent-2 modal-trigger"
                   data-position="left" data-delay="100" data-tooltip="Add Shopping List">
                    <i className="material-icons">add</i>
                </a>
            </div>
        </div>
    );
};

export default SLFab;
