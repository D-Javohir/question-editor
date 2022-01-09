
import { Editor } from '@tinymce/tinymce-react';
import tinymce from 'tinymce/tinymce';
import 'tinymce/themes/silver';
import 'tinymce/icons/default';
import 'tinymce/skins/ui/oxide/skin.min.css';

// importing the plugin js.
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/link';
import 'tinymce/plugins/image';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/hr';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/spellchecker';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/wordcount';
import 'tinymce/plugins/code';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/media';
import 'tinymce/plugins/nonbreaking';
import 'tinymce/plugins/table';
import 'tinymce/plugins/template';
import 'tinymce/plugins/help';
import 'tinymce/plugins/paste';

import 'tinymce/plugins/code'
// import 'tinymce/plugins/codesample';
// import 'tinymce/plugins/preview';


import contentCss from 'tinymce/skins/content/default/content.min.css';
import contentUiCss from 'tinymce/skins/ui/oxide/content.min.css';

export default function TinyEditorComponent(props) {
    const handleEditorChange = (content) => {
        // console.log(content);
        props.setText(content);
    }
    return (<>
        <Editor
            value={props.value ? props.value : ''}
            onEditorChange={handleEditorChange}
            init={{
                external_plugins: { tiny_mce_wiris: '/js/wiris.js' },
                // external_plugins: { tiny_mce_wiris: 'http://localhost:3000/project/npm-tinymce5/node_modules/@wiris/mathtype-tinymce5/plugin.min.js' },
                skin: false,
                content_css: false,
                height: 450,
                content_style: [contentCss, contentUiCss].join('\n'),
                menubar: 'edit view insert format tools help',
                paste_as_text: true,
                plugins: ' paste codesample advlist autolink link image lists charmap hr anchor spellchecker searchreplace wordcount code fullscreen insertdatetime media nonbreaking table template help',
                toolbar: [
                    {
                        name: 'history', items: ['undo', 'redo']
                    },
                    {
                        name: 'fontselect', items: ['fontselect',]
                    },
                    {
                        name: 'fontsizeselect', items: ['fontsizeselect',],
                        className: 'asdfdsagf'
                    },
                    // {
                    // name: 'formatselect', items: [   'formatselect' ]
                    // },
                    {
                        name: 'formatting', items: ['bold', 'italic', 'underline', 'strikethrough']
                    },
                    {
                        name: 'indentation', items: ['outdent', 'indent']
                    },
                    {
                        name: 'alignment', items: ['alignleft', 'aligncenter', 'alignright', 'alignjustify']
                    },
                    {
                        name: 'list', items: ['numlist', 'bullist', 'checklist']
                    },
                    {
                        name: 'table', items: ['table']
                    },
                    {
                        name: 'colors', items: ['forecolor', 'backcolor', 'casechange', 'permanentpen', 'formatpainter', 'removeformat']
                    },
                    {
                        name: 'math', items: ['subscript', 'superscript']
                    },
                    {
                        name: 'viris-math', items: ['tiny_mce_wiris_formulaEditor'],
                    },
                    {
                        name: 'viris-chem', items: ['tiny_mce_wiris_formulaEditorChemistry'],
                    },
                    {
                        name: 'chars', items: ['charmap']
                    },
                    {
                        name: 'file', items: ['image', 'link',  /*'codesample'*/]
                    },
                    {
                        name: 'full', items: ['fullscreen',  /*'preview'*/ 'code']
                    }
                ],
                toolbar_mode: 'wrap',
            }}
        />

        <style jsx={true}>{`
        .wrs_tickContainer{
            display: none !important;
        }
       `}</style>

    </>);
}
