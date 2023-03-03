import Image from 'next/image'

const getRecipeDetails = async (id) => {
    const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    return res.json();
}

export default async function page({ params }) {
    const recipeDetails = await getRecipeDetails(params.id)
    const details = recipeDetails.meals[0]
    const ingredients = Object.keys(details)
    .filter((key) => key.indexOf("Ingredient") > 0)
    .map((ingKey) => details[ingKey])
    .filter(Boolean) // removes falsy values from an array
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
        <div>
            <Image 
                src={details.strMealThumb} 
                width={500} 
                height={500} 
                alt='Recipe Image' 
                className="w-full"
            />
        </div>
        <div className="p-5 ">
            <h1>Recipe Name: <span className="font-bold text-2xl">{details.strMeal}</span></h1>
            <div className="tags">
                <p>Ingredients List:</p>
                {ingredients.map((ing, idx) => (
                    <span 
                        className="bg-blue-500 text-white py-1 px-2 rounded inline-block mr-2 mb-2"
                        key={idx}>{ing}
                    </span>
                ))}
            </div>
            { details.strYoutube && (
                <div className="mt-3">
                    <p>Video Link:</p>
                    <a 
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-500"
                        href={details.strYoutube}
                    >
                        How to make {details.strMeal}
                    </a>
                </div>
            )}
        </div>
    </div>
  )
}

