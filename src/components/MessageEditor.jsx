import {useRef} from 'react';
import JoditEditor from 'jodit-react';

// eslint-disable-next-line react/prop-types
const MessageEditor = ({value, onChange}) => {
    const editor = useRef(null);

    const config = {
        buttons: [
            'bold',
            'italic',
            'underline', '|',
            'ul',
            'ol', '|',
            'outdent', 'indent',  '|',
            'font',
            'fontsize', '|',
            'brush',
            'paragraph', '|',
            'image',
            'link', '|',
            'align',
            'hr',
            'eraser',
            'source', '|',
            'undo', 'redo'
        ],
        toolbarAdaptive: false, // Вимикаємо автоматичне розташування кнопок
        showCharsCounter: false, // Вимикаємо лічильник символів (якщо не потрібно)
        showXPathInStatusbar: false, // Вимикаємо відображення шляху (якщо не потрібно)
        hotkeys: {
            redo: 'ctrl+z',
            undo: 'ctrl+y,ctrl+shift+z',
            indent: 'ctrl+]',
            outdent: 'ctrl+[',
            bold: 'ctrl+b',
            italic: 'ctrl+i',
            removeFormat: 'ctrl+shift+m',
            insertOrderedList: 'ctrl+shift+7',
            insertUnorderedList: 'ctrl+shift+8',
            openSearchDialog: 'ctrl+f',
            openReplaceDialog: 'ctrl+r',
        },
        askBeforePasteHTML: false,
        enter: 'BR'
    };

    return (
        <JoditEditor
            ref={editor}
            value={value}
            config={config}
            onBlur={onChange}
        />
    );
};

export default MessageEditor;