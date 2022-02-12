require('dotenv').config()
import mongodb from '../../sources/mongodb'
import { findPostBySlug } from './getPostBySlug'

describe("findPostBySlug", () => {
	mongodb();

	test("it should be defined", () => {
		expect(findPostBySlug).toBeDefined()
	})

	test("it should get a post", async () => {
		const blogId = '5a8576505cb529044c3efd0d';
		const slug = '/blog/how-to-update-bitnami-ghost';
		const out = await findPostBySlug(blogId, slug)
		expect(out).toBeDefined()
		expect(out).toHaveProperty('_id')
		expect(out).toHaveProperty('url')
		expect(out).toHaveProperty('firstVisit')
	})

	test("it should get a post with slash", async () => {
		const blogId = '5a8576505cb529044c3efd0d';
		const slug = '/blog/how-to-update-bitnami-ghost/';
		const out = await findPostBySlug(blogId, slug)
		expect(out).toBeDefined()
		expect(out).toHaveProperty('_id')
		expect(out).toHaveProperty('url')
		expect(out).toHaveProperty('firstVisit')
	})

	test("it should get a post with slash", async () => {
		const blogId = '61b1b19c6e7af34d77ca3c1f';
		const slug = '/meesho-adopts-boundaryless-workplace-model';
		const out = await findPostBySlug(blogId, slug)
		expect(out).toBeDefined()
		expect(out).toHaveProperty('_id')
		expect(out).toHaveProperty('url')
	})
})