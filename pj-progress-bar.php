<?php
/**
 * Plugin Name:       PJ's Progress Bar
 * Description:       Simple progress bar block.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Philip John
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       pj-progress-bar
 *
 * @package           pj-progress-bar
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/writing-your-first-block-type/
 */
function pj_progress_bar_block_init()
{
	register_block_type( __DIR__ );
}
add_action('init', 'pj_progress_bar_block_init');

/**
 * Enqueue block styles
 */
function pj_progress_bar_editor_scripts()
{
	wp_enqueue_script(
		'pj-progress-bar',
		plugin_dir_url(__FILE__) . '/assets/js/block-styles.js',
		array('wp-blocks', 'wp-dom'),
		wp_get_theme()->get('Version'),
		true
	);
}
add_action('enqueue_block_editor_assets', 'pj_progress_bar_editor_scripts');