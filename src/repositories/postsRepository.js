import db from "../database/postgres.js";

function getPosts() {
    const query = (`SELECT posts.id, 
                users.id AS "userId",
                users."userName", 
                users."pictureUrl" AS "userImage", 
                posts.content AS "postDescription", 
                posts.url AS "postUrl", 
                COUNT(likes."postId") AS "likesCount",
                COUNT(comments."postId") AS "commentsCount"
                FROM posts 
                JOIN users 
                ON users.id = posts."userId"
                LEFT JOIN likes
                ON likes."postId" = posts.id
                LEFT JOIN comments
                ON comments."postId" = posts.id
                GROUP BY posts.id,
                users.id,
                users."userName", 
                users."pictureUrl", 
                posts.content, 
                posts.url, 
                posts."createdAt"
                ORDER BY posts."createdAt" DESC
                LIMIT 10;`)
    return db.query(query);
}

function getPostsLikesList(postId) {
    const query = (`SELECT likes."postId", users."userName"
                    FROM likes
                    JOIN users
                    ON users.id = likes."userId"
                    ORDER BY likes."postId" ASC;`)
    return db.query(query);
}

function getPostById(postId) {
    const query = 'SELECT "userId" FROM posts WHERE id = $1;';
    return db.query(query, [postId]);
}

export { getPosts, getPostsLikesList, getPostById }