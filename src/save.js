/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps, getColorClassName } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @param {Object} props Props passed to the component.
 *
 * @return {WPElement} Element to render.
 */
export default function save(props) {
	const {
		progress,
		barColour,
		customBarColour,
		barBackgroundColour,
		customBarBackgroundColour,
		borderColour,
		customBorderColour,
		textColour,
		customTextColour,
	} = props.attributes;

	let divClass = 'pj-progress';
	const divStyles = {
		width: `${progress}%`,
	};

	if (barColour !== undefined) {
		divClass += ' ' + getColorClassName('background-color', barColour);
	}
	if (customBarColour !== undefined) {
		divStyles.backgroundColor = customBarColour;
	}

	if (textColour !== undefined) {
		divClass += ' ' + getColorClassName('color', textColour);
	}
	if (customTextColour !== undefined) {
		divStyles.color = customTextColour;
	}

	let rootClass = 'pj-progress-bar';
	const rootStyles = {};

	if (borderColour !== undefined) {
		rootClass += ' ' + getColorClassName('border-color', borderColour);
	}
	if (customBorderColour !== undefined) {
		rootStyles.borderColor = customBorderColour;
	}

	if (barBackgroundColour !== undefined) {
		rootClass +=
			' ' + getColorClassName('background-color', barBackgroundColour);
	}
	if (customBarBackgroundColour !== undefined) {
		rootStyles.backgroundColor = customBarBackgroundColour;
	}

	return (
		<div
			{...useBlockProps.save({
				className: rootClass,
				style: rootStyles,
			})}
		>
			<div className={divClass} style={divStyles}>
				<div className="pj-progress-strip">
					<span className="pj-progress-level">{progress}</span>%
				</div>
			</div>
		</div>
	);
}
