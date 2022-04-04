import React, { memo, useRef } from 'react';
import JoditEditor from 'jodit-react';

import './RichTextEditor.scss';

const config = {
    buttons: ['bold', 'italic', 'link', 'unlink', 'underline', 'source'],
    style: {
        background: '#24262d',
        color: '#9e9e9e',
    },
};

const RichTextEditor = ({ initialValue, getValue }) => {
    const editor = useRef(null);

    return (
        <JoditEditor
            ref={editor}
            value={initialValue}
            config={config}
            tabIndex={1}
            onBlur={(newContent) => getValue(newContent)}
            // onChange={(newContent) => getValue(newContent)}
        />
    );
};

export default memo(RichTextEditor);
