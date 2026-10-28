
import  pool  from "../lib/db.js";

async function importHealthLibrary() {
  let connection;

  try {
    // Change this path if your file is in a different folder.
    const dataModule = await import(
  "../app/health-library/healthLibraryData.json",
  { with: { type: "json" } }
);

    // Supports default export, named healthLibraryData export,
    // or separate named exports for categories, newsTicker and articles.
    const data =
      dataModule.default ??
      dataModule.healthLibraryData ?? {
        categories: dataModule.categories,
        newsTicker: dataModule.newsTicker,
        articles: dataModule.articles,
      };

    const articles = Array.isArray(data)
      ? data
      : data.articles;

    if (!Array.isArray(articles) || articles.length === 0) {
      throw new Error(
        "No articles found. Check the exports in healthLibraryData.js."
      );
    }

    const siteCategories = JSON.stringify(data.categories ?? []);
    const newsTicker = JSON.stringify(data.newsTicker ?? []);

    connection = await pool.getConnection();

    await connection.beginTransaction();

    const sql = `
      INSERT INTO \`health-care\` (
        id,
        slug,
        type,
        category,
        categories,
        title,
        excerpt,
        metaDescription,
        author,
        authorRole,
        date,
        readTime,
        partial,
        image,
        sourceUrl,
        tags,
        documents,
        content,
        siteCategories,
        newsTicker
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        slug = VALUES(slug),
        type = VALUES(type),
        category = VALUES(category),
        categories = VALUES(categories),
        title = VALUES(title),
        excerpt = VALUES(excerpt),
        metaDescription = VALUES(metaDescription),
        author = VALUES(author),
        authorRole = VALUES(authorRole),
        date = VALUES(date),
        readTime = VALUES(readTime),
        partial = VALUES(partial),
        image = VALUES(image),
        sourceUrl = VALUES(sourceUrl),
        tags = VALUES(tags),
        documents = VALUES(documents),
        content = VALUES(content),
        siteCategories = VALUES(siteCategories),
        newsTicker = VALUES(newsTicker)
    `;

    let imported = 0;

    for (const article of articles) {
      const values = [
        article.id,
        article.slug,
        article.type ?? "",
        article.category ?? "",
        JSON.stringify(article.categories ?? []),
        article.title ?? "",
        article.excerpt ?? "",
        article.metaDescription ?? null,
        article.author ?? "",
        article.authorRole ?? "",
        article.date ?? "",
        article.readTime ?? "",
        article.partial ? 1 : 0,
        article.image ?? "",
        article.sourceUrl ?? "",
        JSON.stringify(article.tags ?? []),
        JSON.stringify(article.documents ?? []),
        JSON.stringify(article.content ?? []),
        siteCategories,
        newsTicker,
      ];

      await connection.execute(sql, values);
      imported++;

      console.log(`Imported ${imported}/${articles.length}: ${article.slug}`);
    }

    await connection.commit();

    console.log("\nHealth Library import completed successfully!");
    console.log(`Total articles processed: ${imported}`);
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }

    console.error("Health Library import failed:", error.message);
    process.exitCode = 1;
  } finally {
    if (connection) {
      connection.release();
    }

    await pool.end();
  }
}

importHealthLibrary();