import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import App from './App'

vi.mock('./pages/homepage/homepage', () => ({
	default: () => <div>Home page</div>
}))

vi.stubGlobal('matchMedia', () => ({
	matches: false,
	addEventListener: vi.fn(),
	removeEventListener: vi.fn()
}))

describe('App', () => {
	it('renders the main navigation links', () => {
		render(<App />)

		expect(screen.getByRole('link', { name: /home/i })).toBeTruthy()
		expect(screen.getByRole('link', { name: /watchlist/i })).toBeTruthy()
	})
})
