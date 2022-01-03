/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import {
	InspectorControls,
	PanelColorSettings,
	useBlockProps,
} from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';
import { TextControl } from '@wordpress/components';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @param  {Object} props Props passed to the component.
 *
 * @return {WPElement} Element to render.
 */
export default function Edit(props) {
	const {
		setAttributes,
		barColour,
		setBarColour,
		borderColour,
		setBorderColour,
		textColour,
		setTextColour,
		barBackgroundColour,
		setBarBackgroundColour,
	} = props;
	const { progress } = props.attributes;

	let divClass = 'pj-progress';
	const divStyles = {
		width: `${progress}%`,
	};

	if (barColour !== undefined) {
		if (barColour.class !== undefined) {
			divClass += ' ' + barColour.class;
		} else {
			divStyles.backgroundColor = barColour.color;
		}
	}

	if (textColour !== undefined) {
		if (textColour.class !== undefined) {
			divClass += ' ' + textColour.class;
		} else {
			divStyles.color = textColour.color;
		}
	}

	let rootClass = 'pj-progress-bar';
	const rootStyles = {};

	if (borderColour !== undefined) {
		if (borderColour.class !== undefined) {
			rootClass += ' ' + borderColour.class;
		} else {
			rootStyles.borderColor = borderColour.color;
		}
	}

	if (barBackgroundColour !== undefined) {
		if (barBackgroundColour.class !== undefined) {
			rootClass += ' ' + barBackgroundColour.class;
		} else {
			rootStyles.backgroundColor = barBackgroundColour.color;
		}
	}

	const blockProps = useBlockProps({
		className: rootClass,
		style: rootStyles,
	});

	return (
		<div {...blockProps}>
			<div className={divClass} style={divStyles}>
				<div className="pj-progress-strip">
					<TextControl
						value={progress}
						onChange={(newProgress) =>
							setAttributes({
								progress: JSON.stringify(
									Math.min(newProgress, 100)
								),
							})
						}
						className="pj-progress-level"
					/>
					%
				</div>
			</div>
			<InspectorControls>
				<PanelColorSettings
					title={__('Colour settings', 'pj-progress-bar')}
					colorSettings={[
						{
							value: barColour.color,
							onChange: setBarColour,
							label: __('Bar colour', 'pj-progress-bar'),
						},
						{
							value: barBackgroundColour.color,
							onChange: setBarBackgroundColour,
							label: __(
								'Bar background colour',
								'pj-progress-bar'
							),
						},
						{
							value: borderColour.color,
							onChange: setBorderColour,
							label: __('Border colour', 'pj-progress-bar'),
						},
						{
							value: textColour.color,
							onChange: setTextColour,
							label: __('Text colour', 'pj-progress-bar'),
						},
					]}
				/>
			</InspectorControls>
		</div>
	);
}
