import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';
import fs from 'node:fs/promises';
import path from 'path';

const db = sql('meals.db');

export async function getMeals() {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug) {
    return db.prepare('SELECT * FROM meals Where slug=?').get(slug);
}

export async function saveMeal(meal) {
    meal.slug = slugify(meal.title, { lower: true });
    meal.title = xss(meal.title);
    meal.summary = xss(meal.summary);
    meal.creator = xss(meal.creator);
    meal.instructions = xss(meal.instructions);

    if (meal.image && meal.image.file) {
        const extension = meal.image.file.name.split('.').pop();
        const fileName = `${meal.slug}.${extension}`;
        const filePath = path.join('public', 'images', fileName);
        try {
            const dirPath = path.dirname(filePath);
            await fs.mkdir(dirPath, { recursive: true }); 
            await fs.writeFile(filePath, meal.image.buffer);
            meal.image = `/images/${fileName}`; 
        } catch (error) {
            throw new Error(`Saving image failed! Error: ${error.message}`);
        }
    } else {
        meal.image = null; 
    }

    db.prepare(`
        INSERT INTO meals
            (title, summary, instructions, creator, creator_email, image, slug)
        VALUES (
            @title,
            @summary,         
            @instructions,
            @creator,
            @creator_email,
            @image,
            @slug
        )    
    `).run(meal);
}
