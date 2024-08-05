document.getElementById('macroCalculatorForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const weight = parseFloat(document.getElementById('weight').value);
    const weight_unit = document.getElementById('weight_unit').value;
    const height = parseFloat(document.getElementById('height').value);
    const height_unit = document.getElementById('height_unit').value;
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const activity_level = document.getElementById('activity_level').value;
    const goal = document.getElementById('goal').value;

    const macros = calculateMacros(weight, height, age, gender, activity_level, goal, weight_unit, height_unit);

    document.getElementById('calories').textContent = `Calories: ${macros.calories}`;
    document.getElementById('protein').textContent = `Protein: ${macros.protein} grams`;
    document.getElementById('protein_range').textContent = `Range: ${macros.protein_range[0]} - ${macros.protein_range[1]} grams`;
    document.getElementById('carbohydrates').textContent = `Carbohydrates: ${macros.carbohydrates} grams`;
    document.getElementById('carbohydrates_range').textContent = `Range: ${macros.carbohydrates_range[0]} - ${macros.carbohydrates_range[1]} grams`;
    document.getElementById('fats').textContent = `Fats: ${macros.fats} grams`;
    document.getElementById('fats_range').textContent = `Range: ${macros.fats_range[0]} - ${macros.fats_range[1]} grams`;

    document.getElementById('result').style.display = 'block';
});

function calculateMacros(weight, height, age, gender, activity_level, goal, weight_unit = 'kg', height_unit = 'cm') {
    if (weight_unit === 'lbs') {
        weight = weight * 0.453592;
    }

    if (height_unit === 'inches') {
        height = height * 2.54;
    }

    let bmr;
    if (gender === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    const activity_factors = {
        'sedentary': 1.2,
        'lightly_active': 1.375,
        'moderately_active': 1.55,
        'very_active': 1.725,
        'extra_active': 1.9
    };

    const maintenance_calories = bmr * activity_factors[activity_level];

    let calories;
    if (goal === 'maintain') {
        calories = maintenance_calories;
    } else if (goal === 'gain_slow') {
        calories = maintenance_calories + 250;
    } else if (goal === 'gain_fast') {
        calories = maintenance_calories + 500;
    } else if (goal === 'lose_slow') {
        calories = maintenance_calories - 250;
    } else if (goal === 'lose_fast') {
        calories = maintenance_calories - 500;
    }

    let protein, fats, carbohydrates;
    if (goal === 'maintain' || goal === 'gain_slow' || goal === 'gain_fast') {
        protein = 2.2 * weight;
        fats = 0.35 * calories / 9;
        carbohydrates = (calories - (protein * 4 + fats * 9)) / 4;
    } else {
        protein = 2.2 * weight;
        fats = 0.25 * calories / 9;
        carbohydrates = (calories - (protein * 4 + fats * 9)) / 4;
    }

    function calculateRange(value) {
        return [Math.round(value * 0.9), Math.round(value * 1.1)];
    }

    return {
        'calories': Math.round(calories),
        'protein': Math.round(protein),
        'protein_range': calculateRange(protein),
        'carbohydrates': Math.round(carbohydrates),
        'carbohydrates_range': calculateRange(carbohydrates),
        'fats': Math.round(fats),
        'fats_range': calculateRange(fats)
    };
}
