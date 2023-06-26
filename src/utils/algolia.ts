import Article from '@models/article.model';
import algoliasearch from 'algoliasearch';

const client = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_API_KEY
);
const indexName = client.initIndex('articles');

export const saveToAlgolia = async () => {
  try {
    const articles = await Article.findAll();
    const objects = articles.map((article) => ({
      objectID: article.id.toString(),
      name: article.name,
      price: article.price,
      imageUrl: article.imageUrl,
    }));

    await indexName.clearObjects();
    await indexName.saveObjects(objects);
  } catch (error) {
    console.log(error);
  }
};
