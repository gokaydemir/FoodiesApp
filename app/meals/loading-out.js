import classes from './loading.module.css'

export default function MealsPageLoading() {
    return (
        <p className={classes.loading}>Fetching meals...</p>
    );
}