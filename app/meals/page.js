import classes from './page.module.css'
import Link from 'next/link';
import MealGrid from '@/components/meals/meal-grid';
import { getMeals } from '@/lib/meals';
import { Suspense } from 'react';
export default async function MealsPage() {

    async function Meals() {
    const meals = await getMeals();
   return <MealGrid meals={meals}></MealGrid>
    }
    
    return (
        <>
            <header className={classes.header}>
                <h1>
                    Delicious meals, created {''}
                    <span className={classes.highlight}>by you</span>
                </h1>
                <p>
                    Choose your favorite recipe and cook it yourself. It is easy and fun
                </p>
                <p className={classes.cta}>
                    <Link href="/meals/share">Share Your Favorite Recipe</Link>
                </p>
            </header>
            <main>
                <Suspense fallback={ <p className={classes.loading}>Fetching meals...</p>}>
                <Meals/>
                </Suspense>
           
            </main>
        </>
    )
}