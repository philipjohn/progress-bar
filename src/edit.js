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
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';
import { NumberControl, TextControl } from '@wordpress/components';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit(props) {

	const { setAttributes } = props
	const { progress } = props.attributes

	const blockProps = useBlockProps({
		className: 'pj-progress-bar'
	})

	const styleProgress = {
		width: `${progress}%`
	}

	console.log("progres", progress);

	return (
		<div {...blockProps}>
			<div
				className='pj-progress'
				style={ styleProgress }
			>
				<div className='pj-progress-strip'>
					<TextControl
						value={ progress }
						onChange={ (newProgress) => setAttributes({
							progress: JSON.stringify(Math.min(newProgress, 100))
						}) }
						className='pj-progress-level'
					/>
					%
				</div>
			</div>
		</div>
	);
}
