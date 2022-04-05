import MyApp from '../pages/_app'

test('properly loads homepage', () => {
	const { getByText } = render(<MyApp />)
	const linkElement = getByText(/Home/i)
	expect(linkElement).toBeInTheDocument()
})
