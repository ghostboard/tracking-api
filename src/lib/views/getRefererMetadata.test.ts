import getRefererMetadata from './getRefererMetadata'

describe("getRefererMetadata", () => {
    test("it should be defined", () => {
        expect(getRefererMetadata).toBeDefined()
    })
    test("it should return social for facebook", () => {
        const input = {
					blog: { url: 'https://ghostboard.io/blog', domain:'ghostboard.io'},
	        referer: 'https://www.facebook.com/whatever'
        }
				const output = getRefererMetadata(input);
				console.log('>> output', output.referer);
        expect(output).toBeDefined();
				expect(output.refererType).toEqual('social')
    })
})