/**
 * @license Copyright (c) 2014-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor.js';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment.js';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold.js';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials.js';
import FontBackgroundColor from '@ckeditor/ckeditor5-font/src/fontbackgroundcolor.js';
import FontColor from '@ckeditor/ckeditor5-font/src/fontcolor.js';
import FontFamily from '@ckeditor/ckeditor5-font/src/fontfamily.js';
import FontSize from '@ckeditor/ckeditor5-font/src/fontsize.js';
import Heading from '@ckeditor/ckeditor5-heading/src/heading.js';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic.js';
import Link from '@ckeditor/ckeditor5-link/src/link.js';
import List from '@ckeditor/ckeditor5-list/src/list.js';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph.js';
import RemoveFormat from '@ckeditor/ckeditor5-remove-format/src/removeformat.js';
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough.js';
import Subscript from '@ckeditor/ckeditor5-basic-styles/src/subscript.js';
import Superscript from '@ckeditor/ckeditor5-basic-styles/src/superscript.js';
import Table from '@ckeditor/ckeditor5-table/src/table.js';
import TableCaption from '@ckeditor/ckeditor5-table/src/tablecaption.js';
import TableCellProperties from '@ckeditor/ckeditor5-table/src/tablecellproperties';
import TableProperties from '@ckeditor/ckeditor5-table/src/tableproperties';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar.js';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline.js';

class Editor extends ClassicEditor { }

// Plugins to include in the build.
Editor.builtinPlugins = [
	Alignment,
	Bold,
	Essentials,
	FontBackgroundColor,
	FontColor,
	FontFamily,
	FontSize,
	Heading,
	Italic,
	Link,
	List,
	Paragraph,
	RemoveFormat,
	Strikethrough,
	Subscript,
	Superscript,
	Table,
	TableCaption,
	TableCellProperties,
	TableProperties,
	TableToolbar,
	Underline
];

// Editor configuration.
Editor.defaultConfig = {
	toolbar: {
		items: [
			'heading',
			'|',
			'bold',
			'italic',
			'underline',
			'strikethrough',
			'removeFormat',
			'alignment',
			'|',
			'fontColor',
			'fontFamily',
			'fontSize',
			'fontBackgroundColor',
			'|',
			'subscript',
			'superscript',
			'|',
			'bulletedList',
			'numberedList',
			'|',
			'link',
			'insertTable'
		],
		// shouldNotGroupWhenFull: true
	},
	language: 'en',
	table: {
		contentToolbar: [
			'tableColumn',
			'tableRow',
			'mergeTableCells',
			'tableCellProperties',
			'tableProperties'
		]
	},
	fontSize: {
		options: [
			'default',
			{
				title: '8',
				model: '8pt'
			},
			{
				title: '9',
				model: '9pt'
			},
			{
				title: '10',
				model: '10pt'
			},
			{
				title: '11',
				model: '11pt'
			},
			{
				title: '12',
				model: '12pt'
			},
			{
				title: '14',
				model: '14pt'
			},
			{
				title: '16',
				model: '16pt'
			},
			{
				title: '18',
				model: '18pt'
			},
			{
				title: '20',
				model: '20pt'
			},
			{
				title: '22',
				model: '22pt'
			},
			{
				title: '24',
				model: '24pt'
			},
			{
				title: '26',
				model: '26pt'
			},
			{
				title: '28',
				model: '28pt'
			},
			{
				title: '36',
				model: '36pt'
			},
		]
	},
	fontFamily: {
		supportAllValues: true
	},
};

export default Editor;
