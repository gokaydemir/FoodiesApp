'use server'

import { saveMeal } from "./meals"

export async function shareMeal(formData) {
    const imageFile = formData.get("image");
    const bufferImage = imageFile ? Buffer.from(await imageFile.arrayBuffer()) : null;

    const meal = {
        title: formData.get("title"),
        creator: formData.get("name"),
        creator_email: formData.get("email"),
        summary: formData.get("summary"),
        instructions: formData.get("instructions"),
        image: { file: imageFile, buffer: bufferImage },
    };

    await saveMeal(meal);
}
