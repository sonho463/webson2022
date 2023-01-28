import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import {
	classicThemeIcon,
	darkThemeIcon,
	earthThemeIcon,
	blueThemeIcon,
	orangeThemeIcon,
} from './icons';

const themes = [
	{
		name: 'default',
		icon: classicThemeIcon,
		label: '英会話＋fitness',
	},
	{
		name: 'dark',
		icon: darkThemeIcon,
		label: '架空の建設会社',
	},
	{
		name: 'earth',
		icon: earthThemeIcon,
		label: '英会話スクール',
	},
	// {
	// 	name: 'ocean',
	// 	icon: blueThemeIcon,
	// 	label: 'BlueLeadPartners様',
	// },
];

@customElement('theme-switcher')
export class ThemeSwitcher extends LitElement {
	static styles = [
		css`
			:host {
				display: block;
			}
			button {
				display: inline-flex;
				outline: none;
				border: none;
				background-color: transparent;
				border: 2px solid transparent;
				border-radius: 20rem;
				padding: 1px;
				cursor: pointer;
				transition: border var(--theme-transition);
			}
			button[active] {
				border: 2px solid var(--theme-primary);
				box-shadow: 0 0 12px 1px var(--theme-primary);
			}
			button:hover {
				border: 2px solid var(--theme-primary);
			}
			.theme-switcher__container {
				margin: -1rem 0 2rem;
				display: grid;
				grid-template-columns: repeat(4, 1fr);
			}
			.theme-select__container {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
			}
			.theme-select__container p {
				font-size: var(--font-size-sm);
			}
		`,
	];

	// set the _doc element
	private _doc = document.firstElementChild;

	@property({ type: String })
	theme: string | null = null;

	private _getCurrentTheme() {
		// check for a local storage theme first
		const localStorageTheme = localStorage.getItem('theme');
		if (localStorageTheme !== null) {
			this._setTheme(localStorageTheme);
		} else {
			this._setTheme('default');
		}
	}

	firstUpdated() {
		this._getCurrentTheme();
	}

	private _setTheme(theme) {
		this._doc.setAttribute('data-theme', theme);

		const _heroImage = document.querySelector(
			'#home-hero-image'
		) as HTMLImageElement;
		if (theme === 'default') {
			_heroImage.src = '/assets/images/home/eng_mockup.png';
		}
		if (theme === 'dark') {
			_heroImage.src = '/assets/images/home/const-company_mockuper.png';
		}
		if (theme === 'earth') {
			_heroImage.src = '/assets/images/home/eng-sch_mockup.png';
		}
		if (theme === 'ocean') {
			_heroImage.src = '/assets/images/home/blue-leaf_mockup.png';
		}
		if (theme === 'sand') {
			_heroImage.src = '/assets/images/home/sand-hero.jpg';
		}
		localStorage.setItem('theme', theme);
		this.theme = theme;
	}

	render() {
		const themeButtons = html`${themes.map(theme => {
			return html`
				<div class="theme-select__container">
					<button
						@click=${() => this._setTheme(theme.name)}
						?active=${this.theme === theme.name}
						title=${`Enable ${theme.label} Theme`}
					>
						${theme.icon}
					</button>
					<p>${theme.label}</p>
				</div>
			`;
		})}`;

		return html`
			<div>
				<h2 class="theme-switcher__title">これまでの制作実績</h2>
				<div class="theme-switcher__container">${themeButtons}</div>
			</div>
		`;
	}
}
