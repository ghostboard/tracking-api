require('dotenv').config()
import mongodb from '../../sources/mongodb'
import db from '../../sources/postgres'
import { findPostBySlug } from './getPostBySlug'

describe("findPostBySlug", () => {

	test("it should be defined", () => {
		expect(findPostBySlug).toBeDefined()
	})

	test("it should get a post", async () => {
		const blogId = '5a8576505cb529044c3efd0d';
		const slug = '/blog/how-to-update-bitnami-ghost';
		const out = await findPostBySlug(blogId, slug)
		console.log('>> out1', out)
		expect(out).toBeDefined()
		expect(out).toHaveProperty('id')
		expect(out).toHaveProperty('url')
		expect(out).toHaveProperty('firstVisit')
	})

	test("it should get a post with slash", async () => {
		const blogId = '5a8576505cb529044c3efd0d';
		const slug = '/blog/how-to-update-bitnami-ghost/';
		const out = await findPostBySlug(blogId, slug)
		expect(out).toBeDefined()
		expect(out).toHaveProperty('id')
		expect(out).toHaveProperty('url')
		expect(out).toHaveProperty('firstVisit')
	})

	test("it should get a post with slash", async () => {
		const blogId = '61b1b19c6e7af34d77ca3c1f';
		const slug = '/meesho-adopts-boundaryless-workplace-model';
		const out = await findPostBySlug(blogId, slug)
		expect(out).toBeDefined()
		expect(out).toHaveProperty('id')
		expect(out).toHaveProperty('url')
	})

	test("it should get a post with slash", async () => {
		const blogId = '5e742d849f453d4bdc2c762f';
		const slug = '/1969-chevrolet-camaro-beats';
		const out = await findPostBySlug(blogId, slug)
		expect(out).toBeDefined()
		expect(out).toHaveProperty('id')
		expect(out).toHaveProperty('url')
	})

	test("it should get a post with slash", async () => {
		const blogId = '5f60c8914dfb34476a1c3b26';
		const slug = '/reading-bus-operator-show-patriotism-for-the-queens-jubilee';
		const out = await findPostBySlug(blogId, slug)
		expect(out).toBeDefined()
		expect(out).toHaveProperty('id')
		expect(out).toHaveProperty('url')
	})

	test("it should get a post with slash", async () => {
		const blogId = '5e742d849f453d4bdc2c762f';
		const slug = '/dodge-charger-stolen-during-test-drive';
		const out = await findPostBySlug(blogId, slug)
		console.log('>> out', out);
		expect(out).toBeDefined()
		expect(out).toHaveProperty('id')
		expect(out).toHaveProperty('url')
	})
})