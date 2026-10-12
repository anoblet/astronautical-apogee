import { getCollection } from 'astro:content';

export async function getLaurenPosts() {
  // This collection is intentionally empty until Lauren publishes a post.
  const files = import.meta.glob('../lauren/**/*.md');
  return Object.keys(files).length ? getCollection('lauren') : [];
}
