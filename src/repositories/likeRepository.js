import db from "../database/postgres.js";

async function postLike(userId, postId){    
    return db.query('INSERT INTO likes ("userId","postId") VALUES ($1, $2) RETURNING id', [userId, postId]
    );
}

async function deleteLike(userId, postId){
    return db.query(`
        DELETE FROM likes
        WHERE "userId" = ($1) AND "postId" = ($2);`,
        [userId, postId]);
}

export {
    postLike,
    deleteLike   
};