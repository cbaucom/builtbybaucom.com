import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { format } from 'date-fns';

type ContentType = 'blog' | 'project';

interface FrontMatter {
	cover_image?: string;
	date: string;
	description: string;
	section: string;
	tags: string[];
	title: string;
}

export interface Post extends FrontMatter {
	content: string;
	slug: string;
	readingTime: string;
}

const root = process.cwd();

const VALID_EXTENSIONS = ['.md', '.mdx'];

export function getFiles(type: ContentType): (string | { year: string; file: string })[] {
	const contentDir = path.join(root, 'src', 'content', type);

	if (type === 'blog') {
		// For blog, we need to look in year subdirectories
		const yearDirs = fs.readdirSync(contentDir);
		return yearDirs.flatMap(year => {
			const yearPath = path.join(contentDir, year);
			// Skip if not a directory
			if (!fs.statSync(yearPath).isDirectory()) return [];

			return fs.readdirSync(yearPath)
				.filter(file => VALID_EXTENSIONS.some(ext => file.endsWith(ext)))
				.map(file => ({
					year,
					file,
				}));
		});
	}

	// For projects, just get files directly
	return fs.readdirSync(contentDir)
		.filter(file => VALID_EXTENSIONS.some(ext => file.endsWith(ext)));
}

export function getAllPosts(type: ContentType): Post[] {
	const files = getFiles(type);

	return files.map((fileInfo) => {
		if (type === 'blog') {
			const { file, year } = fileInfo as { year: string; file: string };
			const slug = file.replace(/\.(md|mdx)$/, '');
			const source = fs.readFileSync(
				path.join(root, 'src', 'content', type, year, file),
				'utf8'
			);
			const { content, data } = matter(source);
			const readingStats = readingTime(content);

			return {
				...(data as FrontMatter),
				content,
				slug,
				readingTime: readingStats.text,
			};
		} else {
			const file = fileInfo as string;
			const slug = file.replace(/\.(md|mdx)$/, '');
			const source = fs.readFileSync(
				path.join(root, 'src', 'content', type, file),
				'utf8'
			);
			const { content, data } = matter(source);
			const readingStats = readingTime(content);

			return {
				...(data as FrontMatter),
				content,
				slug,
				readingTime: readingStats.text,
			};
		}
	}).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPost(type: ContentType, slug: string, year?: string): Post | null {
	try {
		let filePath: string | undefined;

		if (type === 'blog' && year) {
			// Try both extensions for blog posts
			filePath = VALID_EXTENSIONS
				.map(ext => path.join(root, 'src', 'content', type, year, `${slug}${ext}`))
				.find(path => fs.existsSync(path));
		} else {
			// Try both extensions for project files
			filePath = VALID_EXTENSIONS
				.map(ext => path.join(root, 'src', 'content', type, `${slug}${ext}`))
				.find(path => fs.existsSync(path));
		}

		if (!filePath) {
			return null;
		}

		const source = fs.readFileSync(filePath, 'utf8');
		const { content, data } = matter(source);
		const readingStats = readingTime(content);

		return {
			...(data as FrontMatter),
			content,
			slug,
			readingTime: readingStats.text,
		};
	} catch (error) {
		return null;
	}
}

export function getPaginatedPosts(type: ContentType, page: number, limit: number = 6) {
	const posts = getAllPosts(type);
	const totalPages = Math.max(1, Math.ceil(posts.length / limit));
	const start = (page - 1) * limit;
	const end = start + limit;

	console.log({
		type,
		page,
		totalPosts: posts.length,
		totalPages,
		start,
		end,
		postsSlice: posts.slice(start, end).length
	});

	return {
		posts: posts.slice(start, end),
		currentPage: page,
		totalPages,
	};
}

export function getBlogPostByYearAndSlug(year: string, slug: string): Post | null {
	try {
		// First, try to find the post in the year directory
		const yearPath = path.join(root, 'src', 'content', 'blog', year);

		// Check if year directory exists
		if (!fs.existsSync(yearPath)) {
			return null;
		}

		// Try both .md and .mdx extensions
		const filePath = VALID_EXTENSIONS
			.map(ext => path.join(yearPath, `${slug}${ext}`))
			.find(path => fs.existsSync(path));

		if (!filePath) {
			// Try looking for index.md[x] in a subdirectory
			const indexPath = VALID_EXTENSIONS
				.map(ext => path.join(yearPath, slug, `index${ext}`))
				.find(path => fs.existsSync(path));

			if (!indexPath) {
				return null;
			}

			const source = fs.readFileSync(indexPath, 'utf8');
			const { content, data } = matter(source);
			const readingStats = readingTime(content);

			return {
				...(data as FrontMatter),
				content,
				slug,
				readingTime: readingStats.text,
			};
		}

		const source = fs.readFileSync(filePath, 'utf8');
		const { content, data } = matter(source);
		const readingStats = readingTime(content);

		return {
			...(data as FrontMatter),
			content,
			slug,
			readingTime: readingStats.text,
		};
	} catch (error) {
		console.error('Error getting blog post:', error);
		return null;
	}
}

interface AdjacentPost {
	title: string;
	slug: string;
	date: string;
}

export function getAdjacentPosts(type: ContentType, currentSlug: string, year?: string): {
	previous: AdjacentPost | null;
	next: AdjacentPost | null;
} {
	const posts = getAllPosts(type);
	const currentIndex = posts.findIndex(post => post.slug === currentSlug);

	if (currentIndex === -1) {
		return { previous: null, next: null };
	}

	const previous = posts[currentIndex + 1] || null;
	const next = posts[currentIndex - 1] || null;

	return {
		previous: previous ? {
			title: previous.title,
			slug: previous.slug,
			date: previous.date,
		} : null,
		next: next ? {
			title: next.title,
			slug: next.slug,
			date: next.date,
		} : null,
	};
}

